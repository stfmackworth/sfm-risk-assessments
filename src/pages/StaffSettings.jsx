import { useState } from 'react';

const css = {
  input: { width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 13, color: '#0f172a', background: '#fff', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' },
  label: { display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' },
  btn: (bg, color) => ({ background: bg, color, border: 'none', borderRadius: 6, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }),
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={css.label}>{label}</label>
      {children}
    </div>
  );
}

export default function StaffSettings({ staff, settings, onSaveStaff, onSaveSettings, saving }) {
  const [localStaff, setLocalStaff]       = useState(staff);
  const [localSettings, setLocalSettings] = useState(settings);
  const [tab, setTab]   = useState('staff');
  const [saved, setSaved] = useState(false);

  const updateStaffMember = (idx, field, value) => {
    const updated = [...localStaff];
    updated[idx] = { ...updated[idx], [field]: value };
    setLocalStaff(updated);
  };

  const addStaffMember = () => {
    setLocalStaff([...localStaff, { key: 'custom_' + Date.now(), label: 'New Role', name: '', email: '', phone: '' }]);
  };

  const removeStaffMember = (idx) => {
    setLocalStaff(localStaff.filter((_, i) => i !== idx));
  };

  const updateSetting = (key, value) => {
    setLocalSettings({ ...localSettings, [key]: value });
  };

  const handleSave = async () => {
    if (tab === 'staff') await onSaveStaff(localStaff);
    else await onSaveSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0f172a' }}>Staff & Settings</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {saved && <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>✓ Saved</span>}
          {saving && <span style={{ fontSize: 13, color: '#64748b' }}>Saving…</span>}
          <button onClick={handleSave} style={css.btn('#0f172a', '#fff')}>Save changes</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '2px solid #e2e8f0', paddingBottom: 0 }}>
        {[['staff', 'Staff Directory'], ['settings', 'Church Settings'], ['compliance', 'Compliance Info']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            background: 'transparent', border: 'none', borderBottom: tab === key ? '2px solid #0f172a' : '2px solid transparent',
            color: tab === key ? '#0f172a' : '#64748b', padding: '8px 16px', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit', marginBottom: -2,
          }}>{label}</button>
        ))}
      </div>

      {tab === 'staff' && (
        <div>
          <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px' }}>
            These names are auto-populated throughout risk assessments as owners and sign-off fields. Keep them current as staff changes.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {localStaff.map((person, idx) => (
              <div key={person.key} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr 1fr auto', gap: 12, alignItems: 'end' }}>
                  <Field label="Role / Title">
                    <input value={person.label} onChange={e => updateStaffMember(idx, 'label', e.target.value)} style={css.input} />
                  </Field>
                  <Field label="Name">
                    <input value={person.name} onChange={e => updateStaffMember(idx, 'name', e.target.value)} style={css.input} placeholder="Full name" />
                  </Field>
                  <Field label="Email">
                    <input type="email" value={person.email} onChange={e => updateStaffMember(idx, 'email', e.target.value)} style={css.input} placeholder="name@stfrancis.org" />
                  </Field>
                  <Field label="Phone">
                    <input value={person.phone} onChange={e => updateStaffMember(idx, 'phone', e.target.value)} style={css.input} placeholder="07xxx xxxxxx" />
                  </Field>
                  <div style={{ paddingBottom: 2 }}>
                    <button onClick={() => removeStaffMember(idx)} style={{ background: '#fee2e2', border: 'none', borderRadius: 6, color: '#dc2626', cursor: 'pointer', padding: '8px 10px', fontSize: 13, fontFamily: 'inherit' }}>✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={addStaffMember} style={{ ...css.btn('#f1f5f9', '#475569'), marginTop: 12 }}>+ Add staff member</button>
        </div>
      )}

      {tab === 'settings' && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 24, maxWidth: 640 }}>
          <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px' }}>
            These settings appear on all exported risk assessment documents.
          </p>
          {[
            ['church_name',    'Church Name'],
            ['address',        'Address'],
            ['diocese',        'Diocese'],
            ['network',        'Network Affiliation'],
            ['registered_charity', 'Registered Charity Number'],
            ['ecclesiastical_policy', 'Ecclesiastical Policy Number'],
            ['admin_email',    'Admin Email'],
            ['website',        'Website'],
          ].map(([key, label]) => (
            <Field key={key} label={label}>
              <input value={localSettings[key] || ''} onChange={e => updateSetting(key, e.target.value)} style={css.input} />
            </Field>
          ))}
        </div>
      )}

      {tab === 'compliance' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { title: 'CofE Safeguarding', items: ['Safeguarding Policy reviewed annually by PCC', 'PSO appointed and trained to Advanced level', 'All workers in regulated activity hold Enhanced DBS', 'Foundation safeguarding training for all volunteers', 'Diocese Safeguarding Adviser contact held by PSO'] },
            { title: 'Health & Safety', items: ['Risk Assessment register reviewed at each PCC meeting', 'Annual fire drill conducted and recorded', 'Fixed wiring test every 5 years', 'PAT testing annually', 'Gas safety check annually (Gas Safe engineer)', 'First Aid kit inspected monthly', 'Accident book maintained and reviewed quarterly'] },
            { title: 'Fire Safety (RRO 2005)', items: ['Fire Risk Assessment in place and current', 'Fire exits checked before every gathering', 'Fire extinguishers serviced annually', 'Fire alarm tested weekly (push-button test)', 'Evacuation procedure displayed in all areas', 'Personal Emergency Evacuation Plans for regular mobility-impaired attendees'] },
            { title: 'GDPR & Data Protection', items: ['Privacy notice published on website', 'Data Protection Policy adopted by PCC', 'ChurchSuite access reviewed annually', 'Subject Access Request procedure in place', 'Data retention schedule reviewed annually', 'ICO registration current (if required)'] },
            { title: 'Buildings & Faculty', items: ['Quinquennial Inspection current', 'Asbestos register in place', 'Legionella risk assessment current', 'Faculty obtained for notifiable works', 'Ecclesiastical insurance policy reviewed annually', 'Buildings Committee meets at least twice yearly'] },
            { title: 'Finance & Governance', items: ['PCC meets at least 4 times per year', 'Accounts independently examined or audited', 'Gift Aid claims submitted annually', 'Treasurer and Churchwarden signatories reviewed', 'Charity Commission returns filed on time', 'Finance Committee meets at least quarterly'] },
          ].map(({ title, items }) => (
            <div key={title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{title}</h3>
              {items.map(item => (
                <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 12, color: '#374151' }}>
                  <span style={{ color: '#94a3b8', flexShrink: 0 }}>☐</span>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
