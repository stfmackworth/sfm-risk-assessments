import { useState, useEffect, useCallback } from 'react';
import { loadAll, saveAssessment, saveStaff, saveSettings, DEFAULT_STAFF, DEFAULT_SETTINGS } from '../utils/storage';
import { getRiskLevel } from '../data/riskData';

// All existing preset templates imported inline (same data as before)
import { ALL_TEMPLATES } from '../data/templates';

export function useRiskAssessments() {
  const [assessments, setAssessments] = useState([]);
  const [staff, setStaff]             = useState(DEFAULT_STAFF);
  const [settings, setSettings]       = useState(DEFAULT_SETTINGS);
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState(null);

  useEffect(() => {
    loadAll().then(data => {
      setStaff(data.staff || DEFAULT_STAFF);
      setSettings(data.settings || DEFAULT_SETTINGS);
      if (data.assessments) {
        setAssessments(data.assessments);
      } else {
        // First run — seed with all templates
        const seeded = ALL_TEMPLATES.map(t => ({
          ...t,
          status: 'active',
          version: 1,
          assessedBy: t.assessedBy || '',
          assessedDate: t.assessedDate || '',
          reviewDate: t.reviewDate || '',
          pccNoted: '',
          vicarSignoff: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
        setAssessments(seeded);
        // Persist seed
        const ls = {};
        ls.assessments = seeded;
        try { localStorage.setItem('sfm_ra_v2', JSON.stringify(ls)); } catch (_) {}
      }
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  const persistRA = useCallback(async (ra, updatedList) => {
    setSaving(true);
    setAssessments(updatedList);
    try {
      await saveAssessment(ra, updatedList);
    } catch (e) { setError(e.message); }
    setSaving(false);
  }, []);

  const upsertRA = useCallback(async (ra) => {
    const updated = { ...ra, updatedAt: new Date().toISOString() };
    const exists = assessments.find(a => a.id === updated.id);
    const next = exists
      ? assessments.map(a => a.id === updated.id ? updated : a)
      : [...assessments, updated];
    await persistRA(updated, next);
    return updated;
  }, [assessments, persistRA]);

  const deleteRA = useCallback(async (id) => {
    const next = assessments.filter(a => a.id !== id);
    setSaving(true);
    setAssessments(next);
    try {
      await saveAssessment(null, next);
    } catch (e) { setError(e.message); }
    setSaving(false);
  }, [assessments]);

  const duplicateRA = useCallback(async (ra) => {
    const copy = {
      ...ra,
      id: 'ra_' + Date.now(),
      ref: ra.ref + '-copy',
      name: ra.name + ' (copy)',
      status: 'draft',
      assessedBy: '', assessedDate: '', reviewDate: '',
      pccNoted: '', vicarSignoff: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await upsertRA(copy);
    return copy;
  }, [upsertRA]);

  const updateStaff = useCallback(async (newStaff) => {
    setStaff(newStaff);
    try { await saveStaff(newStaff); } catch (e) { setError(e.message); }
  }, []);

  const updateSettings = useCallback(async (newSettings) => {
    setSettings(newSettings);
    try { await saveSettings(newSettings); } catch (e) { setError(e.message); }
  }, []);

  // Dashboard stats
  const stats = {
    total: assessments.length,
    active: assessments.filter(a => a.status === 'active').length,
    draft: assessments.filter(a => a.status === 'draft').length,
    overdue: assessments.filter(a => a.status === 'active' && isOverdue(a.reviewDate)).length,
    dueSoon: assessments.filter(a => a.status === 'active' && isDueSoon(a.reviewDate)).length,
    highCritical: assessments.filter(a =>
      (a.hazards || []).some(h => ['High','Critical'].includes(getRiskLevel(h.likelihood, h.severity).label))
    ).length,
    byCategory: groupBy(assessments, 'category'),
  };

  return {
    assessments, staff, settings, loading, saving, error,
    upsertRA, deleteRA, duplicateRA, updateStaff, updateSettings,
    stats,
  };
}

function isOverdue(reviewDate) {
  if (!reviewDate) return false;
  return new Date(reviewDate) < new Date();
}

function isDueSoon(reviewDate) {
  if (!reviewDate) return false;
  const diff = new Date(reviewDate) - new Date();
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
}

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key] || 'Other';
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
}
