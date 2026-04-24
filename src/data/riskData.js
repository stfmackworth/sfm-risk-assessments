// ─── Risk Level Helpers ───────────────────────────────────────────────────────
export const RISK_LEVELS = {
  Low:      { color: '#16a34a', bg: '#dcfce7', border: '#86efac' },
  Medium:   { color: '#d97706', bg: '#fef3c7', border: '#fcd34d' },
  High:     { color: '#dc2626', bg: '#fee2e2', border: '#fca5a5' },
  Critical: { color: '#7c3aed', bg: '#ede9fe', border: '#c4b5fd' },
};

export function getRiskLevel(likelihood, severity) {
  const score = likelihood * severity;
  if (score <= 2) return { score, label: 'Low',      ...RISK_LEVELS.Low };
  if (score <= 4) return { score, label: 'Medium',   ...RISK_LEVELS.Medium };
  if (score <= 6) return { score, label: 'High',     ...RISK_LEVELS.High };
  return             { score, label: 'Critical', ...RISK_LEVELS.Critical };
}

export const CATEGORY_COLORS = {
  'Premises':           '#0f172a',
  'Regular Activities': '#1e40af',
  'Events':             '#7c3aed',
  'Maintenance':        '#d97706',
  'Operations':         '#0891b2',
};

export const WHO_AT_RISK_OPTIONS = [
  'Congregation members','Volunteers','Children (under 18)',
  'Young people (11–17)','Vulnerable adults','Elderly attendees',
  'Staff','Visitors / public','Contractors','Lone workers',
];

export const HAZARD_BANK = {
  'Trips & Falls': [
    'Worn or unfixed carpet edges, rugs, or doormats',
    'Trailing wires, cables, or leads',
    'Worn, damaged, or uneven steps or stairs',
    'Poor lighting in corridors or stairwells',
    'Missing or defective handrails',
    'Variations in floor level (ramps, thresholds)',
  ],
  'Slips': [
    'Smooth or polished floor surfaces','Wet floors from cleaning or spills',
    'Wet floors from leaking roof or plumbing','Walk-in contaminants (mud, rainwater, ice)',
    'Algae or moss on external paths','Inadequate provision for snow and ice',
  ],
  'Fire': [
    'Accumulations of combustible waste','Blocked or obstructed fire exit routes',
    'Locked or obstructed fire escape doors','Candles left unattended or near combustibles',
    'Faulty or overloaded electrical equipment','Portable heaters in use',
  ],
  'Electricity': [
    'Faulty or damaged fixed wiring','Damaged or unauthorised portable electrical equipment',
    'Faulty extension cables or multi-way adaptors','Electrical equipment not PAT tested',
  ],
  'Manual Handling': [
    'Lifting or carrying heavy or bulky furniture','Moving heavy AV or production equipment',
    'Handling deliveries or donated goods','Manual handling without training or instruction',
  ],
  'Falls from Height': [
    'Changing lightbulbs without appropriate equipment','Cleaning or decorating at height',
    'Putting up displays or decorations at height','Using damaged or inappropriate ladders',
    'Working at height without a second person present',
  ],
  'Safeguarding': [
    'Safeguarding disclosure not escalated promptly','Two-adult rule breach',
    'Unsupervised access to children or vulnerable adults','DBS check not completed before regulated activity',
    'Communication boundary breach (personal social media)',
  ],
  'Food & Allergens': [
    'Allergen cross-contamination (Natasha\'s Law)','Incorrect food storage temperatures',
    'Burns and scalds from hot liquids or equipment','Poor personal hygiene by food handlers',
    'Unsecured or poorly positioned hot water urns',
  ],
  'Security': [
    'Volunteer working alone in the building','Keyholder opening or closing alone',
    'Unauthorised persons gaining access to premises','Threatening or aggressive behaviour',
    'Cash handling without two-person procedure',
  ],
};

// ─── New RA Templates (additions to existing set) ─────────────────────────────
export const NEW_TEMPLATES = [
  // ── Operations ───────────────────────────────────────────────────────────────
  {
    id: 'P4', ref: 'P4', category: 'Operations',
    name: 'Lone Working (General)',
    legislation: 'HSWA 1974, MHSWR 1999',
    reviewMonths: 12,
    location: 'St Francis Mackworth — All areas',
    whoAtRisk: ['Staff', 'Volunteers', 'Lone workers'],
    involvesChildren: false, involvesVulnerableAdults: false, involvesFood: false, isOutdoor: false,
    hazards: [
      { hazard: 'Staff or volunteer working alone in the building with no check-in procedure', who: 'Staff, Volunteers', existingControls: 'Lone Working Policy in place. All lone workers inform a named contact before entering and on leaving the building.', likelihood: 2, severity: 3, additionalControls: 'Named emergency contact holds expected finish time. 30-minute overdue check-in triggers welfare call.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Keyholder opening or locking up alone out of hours', who: 'Staff, Volunteers', existingControls: 'Charged mobile phone carried at all times. Building checked before locking. Keys kept on person.', likelihood: 2, severity: 2, additionalControls: 'WhatsApp check-in group for all keyholders. Operations Manager notified if out-of-hours opening required.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Pastoral or home visit without check-in or return confirmation', who: 'Staff, Volunteers', existingControls: 'Pastoral visit recorded in diary. Vicar or line manager holds destination and expected return time.', likelihood: 2, severity: 3, additionalControls: 'Text check-in on arrival and on leaving. Overdue welfare call procedure agreed with all pastoral staff.', owner: 'Vicar', deadline: '' },
      { hazard: 'Aggressive or threatening behaviour when alone', who: 'Staff, Volunteers', existingControls: 'Lone workers trained in de-escalation. 999 protocol clear. Charged mobile always available.', likelihood: 2, severity: 3, additionalControls: 'Do not confront suspected intruder — leave building and call 999. Incident reporting form completed after any threatening encounter.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Medical emergency or accident when working alone', who: 'Staff, Volunteers', existingControls: 'First aid kit accessible. Mobile phone on person at all times.', likelihood: 1, severity: 3, additionalControls: 'Nearest defibrillator location known. ICE contact in personal mobile.', owner: 'Operations Manager', deadline: '' },
    ],
  },
  {
    id: 'P5', ref: 'P5', category: 'Operations',
    name: 'Contractor Management',
    legislation: 'HSWA 1974, MHSWR 1999, CDM Regulations 2015',
    reviewMonths: 12,
    location: 'St Francis Mackworth — All premises',
    whoAtRisk: ['Contractors', 'Staff', 'Volunteers', 'Congregation members'],
    involvesChildren: false, involvesVulnerableAdults: false, involvesFood: false, isOutdoor: false,
    hazards: [
      { hazard: 'Contractor working on site without evidence of insurance or competence', who: 'Contractors, Staff', existingControls: 'All contractors must provide public liability insurance certificate (min £2m) and evidence of competence before work commences.', likelihood: 2, severity: 3, additionalControls: 'Copy of insurance and accreditation retained on file. Annual check of contractor approved list.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Contractor working in occupied building creating risk to congregation', who: 'Congregation members, Volunteers', existingControls: 'Works scheduled outside of service times where possible. Area cordoned off with barriers and signage when works in progress.', likelihood: 2, severity: 2, additionalControls: 'Briefing held with contractor before work starts. Named STF contact available throughout works.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Gas, electrical, or structural works creating hazard to building users', who: 'All persons on premises', existingControls: 'Only Gas Safe or NICEIC registered contractors used for gas/electrical works. Structural works require architect or structural engineer sign-off.', likelihood: 1, severity: 3, additionalControls: 'Building closed or affected area isolated for duration of high-risk works. Test and inspection certificates retained.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Asbestos disturbed during maintenance or refurbishment works', who: 'Contractors, Staff', existingControls: 'Asbestos register reviewed before any works instructed. Contractors informed of any known or suspected asbestos locations.', likelihood: 1, severity: 3, additionalControls: 'Any suspected asbestos found during works — works stop immediately. Licensed asbestos contractor instructed. Diocese notified.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Contractor accessing premises out of hours without supervision', who: 'Contractors', existingControls: 'Out-of-hours access by prior written agreement only. Keyholder present or access fob issued temporarily and returned on completion.', likelihood: 1, severity: 2, additionalControls: 'Temporary access fob log maintained. Fob returned and deactivated on completion of works.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Works exceeding agreed scope or budget without authorisation', who: 'Church — financial risk', existingControls: 'Written quotation required for all works over £500. PCC approval required for works over £5,000 or any notifiable works under faculty jurisdiction.', likelihood: 2, severity: 2, additionalControls: 'Faculty process checklist reviewed before any significant building works. Diocesan DAC consulted where required.', owner: 'Operations Manager / PCC', deadline: '' },
    ],
  },
  {
    id: 'P6', ref: 'P6', category: 'Operations',
    name: 'Money Handling & Cash Security',
    legislation: 'HSWA 1974, Theft Act 1968, Charity Commission guidance CC8',
    reviewMonths: 12,
    location: 'St Francis Mackworth — All cash handling points',
    whoAtRisk: ['Staff', 'Volunteers'],
    involvesChildren: false, involvesVulnerableAdults: false, involvesFood: false, isOutdoor: false,
    hazards: [
      { hazard: 'Cash counted or handled by a single person (no witness)', who: 'Volunteers', existingControls: 'Minimum two unrelated volunteers present at all cash counting. Cash not left unattended at any point.', likelihood: 2, severity: 2, additionalControls: 'Cash counting procedure documented and communicated to all welcome and hospitality teams. Counter-signing sheet used.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Cash left insecure on premises overnight', who: 'Staff, Church — financial risk', existingControls: 'Cash banked same day or next working day. Locked cash box used for short-term secure storage. Safe used for any larger amounts.', likelihood: 1, severity: 3, additionalControls: 'Cash holdings over £500 must be in safe or banked same day. Ecclesiastical insurer limits on cash holdings to be confirmed and complied with.', owner: 'Operations Manager / Churchwarden', deadline: '' },
      { hazard: 'Theft of offering or event income during counting', who: 'Volunteers', existingControls: 'Counting always performed in pairs. Amounts recorded on standardised cash sheet before banking.', likelihood: 1, severity: 2, additionalControls: 'Cash sheets retained for audit. Any discrepancy reported to Operations Manager and Finance Committee.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Volunteer threatened or assaulted during cash handling', who: 'Volunteers', existingControls: 'Cash handling performed discreetly, away from public areas. Cash not displayed or discussed publicly.', likelihood: 1, severity: 3, additionalControls: 'Do not resist robbery — property is not worth personal safety. 999 called immediately after any threat or assault. Incident reported to police.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Gift Aid records inadequately maintained for HMRC compliance', who: 'Church — compliance risk', existingControls: 'Gift Aid declarations retained for minimum 6 years. ChurchSuite used to manage Gift Aid data.', likelihood: 2, severity: 2, additionalControls: 'Annual Gift Aid submission reviewed by Finance Committee. HMRC audit preparation reviewed annually.', owner: 'Operations Manager / Finance Committee', deadline: '' },
    ],
  },
  {
    id: 'P7', ref: 'P7', category: 'Operations',
    name: 'IT, Data & GDPR Compliance',
    legislation: 'UK GDPR 2021, Data Protection Act 2018, PECR 2003',
    reviewMonths: 12,
    location: 'St Francis Mackworth — All data processing activities',
    whoAtRisk: ['Staff', 'Volunteers', 'Congregation members'],
    involvesChildren: false, involvesVulnerableAdults: false, involvesFood: false, isOutdoor: false,
    hazards: [
      { hazard: 'Personal data stored insecurely or shared without consent', who: 'Congregation members, Staff', existingControls: 'ChurchSuite used as primary data platform. Access restricted to named users. Privacy notice on website and in welcome pack.', likelihood: 2, severity: 3, additionalControls: 'Annual GDPR audit. Data retention schedule reviewed by Operations Manager. Volunteers with data access complete basic GDPR awareness.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Data breach — unauthorised access to personal or safeguarding data', who: 'Congregation members, Children, Vulnerable adults', existingControls: 'ChurchSuite access uses individual login credentials. Shared logins prohibited. Admin access limited to named staff.', likelihood: 1, severity: 3, additionalControls: 'Data breach reporting procedure in place. ICO must be notified within 72 hours of discovering a notifiable breach. Diocese Data Protection Officer contact held by Operations Manager.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Photography of children or vulnerable adults shared without consent', who: 'Children, Vulnerable adults', existingControls: 'Photography policy in place. Consent obtained via ChurchSuite registration. No photos of children shared on social media without parental consent.', likelihood: 2, severity: 3, additionalControls: 'Photography policy communicated to all volunteers at induction. Visible opt-out process for those who do not consent.', owner: 'PSO / Operations Manager', deadline: '' },
      { hazard: 'Church IT equipment lost, stolen, or compromised', who: 'Congregation members, Staff', existingControls: 'Church laptops and devices encrypted. Strong passwords required. ChurchSuite app requires individual login.', likelihood: 1, severity: 2, additionalControls: 'Device inventory maintained. Remote wipe capability enabled where possible. Lost device reported to Operations Manager immediately.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Email communications containing personal or sensitive data sent insecurely', who: 'Congregation members, Staff', existingControls: 'Sensitive personal data not sent by unencrypted email. Bulk emails use ChurchSuite or Mailchimp, not personal email.', likelihood: 2, severity: 2, additionalControls: 'Staff trained not to email lists of personal data. BCC used for group emails from personal accounts.', owner: 'Operations Manager', deadline: '' },
    ],
  },
  {
    id: 'P8', ref: 'P8', category: 'Operations',
    name: 'First Aid Provision & RIDDOR',
    legislation: 'Health & Safety (First Aid) Regulations 1981, RIDDOR 2013',
    reviewMonths: 12,
    location: 'St Francis Mackworth — All premises and activities',
    whoAtRisk: ['Congregation members', 'Staff', 'Volunteers', 'Visitors / public'],
    involvesChildren: false, involvesVulnerableAdults: true, involvesFood: false, isOutdoor: false,
    hazards: [
      { hazard: 'No trained First Aider present during services or activities', who: 'All persons on premises', existingControls: 'At least one qualified First Aider on rota for every Sunday service and major activity. First Aider name confirmed on rota.', likelihood: 2, severity: 3, additionalControls: 'First Aider rota managed by Operations Manager. Backup First Aider identified. Training kept current (3-year renewal).', owner: 'Operations Manager', deadline: '' },
      { hazard: 'First aid kit inadequately stocked or out of date', who: 'All persons on premises', existingControls: 'Main first aid kit inspected monthly. Consumables replaced after use. Expiry dates checked quarterly.', likelihood: 2, severity: 2, additionalControls: 'Paediatric first aid kit maintained separately for children\'s activities. Burns kit included. Kit locations known to all Welcome Team leads.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Location of nearest defibrillator (AED) unknown to staff and volunteers', who: 'Congregation members, Elderly attendees', existingControls: 'Nearest AED location confirmed and communicated to all Welcome Team leads and First Aiders.', likelihood: 2, severity: 3, additionalControls: 'AED location posted on Welcome Team briefing sheet. Consider registering nearest AED with The Circuit (national AED database). Regular CPR + AED awareness sessions for volunteers.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Reportable accident or incident not reported under RIDDOR', who: 'Staff, Volunteers, Contractors', existingControls: 'Accident book maintained. Serious incidents (hospitalisation, fracture, amputation, death) reported to HSE via RIDDOR within prescribed timescales.', likelihood: 1, severity: 3, additionalControls: 'RIDDOR reporting thresholds posted near accident book. Operations Manager holds responsibility for RIDDOR notifications. Diocese notified of any RIDDOR-reportable incident.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Accident book not completed after an incident', who: 'All persons on premises', existingControls: 'Accident book held in kitchen/office. All incidents recorded promptly, however minor.', likelihood: 2, severity: 2, additionalControls: 'Accident book reviewed monthly by Operations Manager. Near-misses also recorded. Annual incident review presented to PCC.', owner: 'Operations Manager', deadline: '' },
    ],
  },

  // ── Regular Activities ────────────────────────────────────────────────────────
  {
    id: 'A11', ref: 'A11', category: 'Regular Activities',
    name: 'Toddler Group / Parent & Child',
    legislation: 'HSWA 1974, MHSWR 1999, Derby Diocese Children & Youth Risk Assessment Framework',
    reviewMonths: 12,
    location: 'St Francis Mackworth — Hall',
    whoAtRisk: ['Children (under 18)', 'Vulnerable adults', 'Elderly attendees', 'Volunteers'],
    involvesChildren: true, involvesVulnerableAdults: false, involvesFood: true, isOutdoor: false,
    hazards: [
      { hazard: 'Child injury from age-inappropriate or unsafe toys and equipment', who: 'Children (under 18)', existingControls: 'All toys and equipment age-appropriate and checked before each session. Items with small parts removed for under-3s. Equipment checked for damage weekly.', likelihood: 2, severity: 2, additionalControls: 'Toy safety checklist completed at start of each session. Damaged items removed immediately. Annual toy audit.', owner: 'Toddler Group Lead', deadline: '' },
      { hazard: 'Child not under parental or carer supervision at all times', who: 'Children (under 18)', existingControls: 'Parents and carers retain responsibility for their own children at all times during the session. This is communicated clearly at welcome.', likelihood: 2, severity: 2, additionalControls: 'Notice at entrance confirms parental responsibility policy. Volunteers support but do not assume sole supervision.', owner: 'Toddler Group Lead', deadline: '' },
      { hazard: 'Allergen cross-contamination in snacks or craft materials', who: 'Children (under 18)', existingControls: 'Snack allergens declared. Parents asked about allergies at registration. Craft materials checked for allergen content.', likelihood: 2, severity: 3, additionalControls: 'Nut-free policy in place. Any EpiPen requirement noted in register. All volunteers aware of children with known severe allergies.', owner: 'Toddler Group Lead', deadline: '' },
      { hazard: 'Safeguarding concern — disclosure or observation not escalated', who: 'Children (under 18)', existingControls: 'All leaders trained to Foundation level. PSO contact displayed. Escalation pathway followed for any concern.', likelihood: 2, severity: 3, additionalControls: 'Low-Level Concern log maintained by session lead. Any concern about a family reported to PSO same day.', owner: 'Joanne Baillie (PSO)', deadline: '' },
      { hazard: 'Hot drinks accessible to children causing scalds', who: 'Children (under 18)', existingControls: 'Hot drinks only consumed by adults in a clearly designated adults-only area. Hot drinks not taken into the main play area.', likelihood: 2, severity: 3, additionalControls: 'Hot drink zone clearly marked and communicated at welcome. No paper cups — lidded reusable cups for hot drinks encouraged.', owner: 'Toddler Group Lead', deadline: '' },
      { hazard: 'Child leaving the premises unsupervised', who: 'Children (under 18)', existingControls: 'Entrance door monitored at all times during session. Door closed and monitored during active play.', likelihood: 1, severity: 3, additionalControls: 'Volunteer stationed near entrance for full duration of session.', owner: 'Toddler Group Lead', deadline: '' },
    ],
  },
  {
    id: 'A12', ref: 'A12', category: 'Regular Activities',
    name: 'Pastoral Home Visits',
    legislation: 'HSWA 1974, MHSWR 1999',
    reviewMonths: 12,
    location: 'Off-site — homes of congregation members',
    whoAtRisk: ['Staff', 'Volunteers', 'Vulnerable adults', 'Elderly attendees'],
    involvesChildren: false, involvesVulnerableAdults: true, involvesFood: false, isOutdoor: false,
    hazards: [
      { hazard: 'Visitor working alone with vulnerable adult in a private home', who: 'Staff, Volunteers, Vulnerable adults', existingControls: 'Lone Working Policy applied. Vicar or line manager holds destination and expected return time. Check-in on arrival and departure.', likelihood: 2, severity: 3, additionalControls: 'Two-person visits recommended for known high-vulnerability cases. Welfare call if check-in overdue by 30 minutes.', owner: 'Vicar', deadline: '' },
      { hazard: 'Safeguarding concern or disclosure during home visit', who: 'Vulnerable adults', existingControls: 'All visitors trained to Foundation level and Domestic Abuse Awareness. PSO contact known and carried.', likelihood: 2, severity: 3, additionalControls: 'Any concern reported to PSO same day. Do not leave individual in danger without taking action. Emergency services called if immediate risk of harm.', owner: 'Joanne Baillie (PSO)', deadline: '' },
      { hazard: 'Slip, trip, or fall in private home environment', who: 'Staff, Volunteers', existingControls: 'Visitors take reasonable care in unfamiliar environment. Any hazardous conditions noted.', likelihood: 2, severity: 2, additionalControls: 'Do not move or rearrange items in someone\'s home. If hazardous conditions noted, report to line manager with pastoral sensitivity.', owner: 'Vicar', deadline: '' },
      { hazard: 'Aggressive or threatening behaviour from householder or others present', who: 'Staff, Volunteers', existingControls: 'Known risk cases identified in advance. Two-person visits for any case with known history of challenging behaviour.', likelihood: 1, severity: 3, additionalControls: 'Leave immediately if threatened. Call 999 from safe location. Incident reported to Vicar and Operations Manager.', owner: 'Vicar', deadline: '' },
      { hazard: 'Exposure to communicable illness during visit', who: 'Staff, Volunteers', existingControls: 'Visitors follow any infection control guidance given by household. Visits deferred if active outbreak in household.', likelihood: 2, severity: 2, additionalControls: 'Visitors not required to attend if personally unwell. Hand sanitiser carried. PPE available if requested.', owner: 'Vicar', deadline: '' },
    ],
  },
  {
    id: 'A13', ref: 'A13', category: 'Regular Activities',
    name: 'Bereavement Support & Pastoral Crisis Response',
    legislation: 'HSWA 1974, MHSWR 1999, Mental Health Act 1983 (awareness)',
    reviewMonths: 12,
    location: 'Various — church premises and off-site',
    whoAtRisk: ['Congregation members', 'Vulnerable adults', 'Staff', 'Volunteers'],
    involvesChildren: false, involvesVulnerableAdults: true, involvesFood: false, isOutdoor: false,
    hazards: [
      { hazard: 'Person in acute mental health crisis or expressing suicidal ideation', who: 'Congregation members, Vulnerable adults', existingControls: 'Staff aware of Samaritans (116 123) and local crisis line. 999 called if immediate risk to life. Person not left alone if risk of self-harm.', likelihood: 2, severity: 3, additionalControls: 'At least one staff member with Mental Health First Aid qualification. Pastoral crisis procedure document held by Vicar. PSO informed of any serious pastoral crisis.', owner: 'Vicar / PSO', deadline: '' },
      { hazard: 'Pastoral worker experiencing vicarious trauma or burnout', who: 'Staff, Volunteers', existingControls: 'Regular supervision offered to pastoral team. Vicar holds responsibility for staff wellbeing. No pastoral worker expected to carry cases alone.', likelihood: 2, severity: 2, additionalControls: 'Pastoral supervision pathway in place. Staff encouraged to access EAP or counselling if needed. Annual wellbeing review for all pastoral staff.', owner: 'Vicar', deadline: '' },
      { hazard: 'Boundary breach during intensive one-to-one pastoral support', who: 'Staff, Congregation members', existingControls: 'Pastoral Boundaries Policy communicated to all staff. One-to-one pastoral support in visible space or by phone/video.', likelihood: 2, severity: 3, additionalControls: 'Pastoral support cases reviewed with Vicar regularly. Long-term intensive support referred to qualified counsellor. Case notes maintained confidentially.', owner: 'Vicar', deadline: '' },
      { hazard: 'Bereavement visitor arriving at home unprepared for complex grief presentation', who: 'Staff, Volunteers', existingControls: 'Pre-visit briefing from Vicar. Known complex cases assigned to experienced pastoral staff.', likelihood: 2, severity: 2, additionalControls: 'Debrief offered after every bereavement visit. Visitors encouraged to contact Vicar if they feel overwhelmed during or after visit.', owner: 'Vicar', deadline: '' },
    ],
  },
  {
    id: 'A14', ref: 'A14', category: 'Regular Activities',
    name: 'Food Hygiene — Kitchen Operations',
    legislation: 'Food Safety Act 1990, Food Hygiene Regulations 2006, Natasha\'s Law 2021',
    reviewMonths: 6,
    location: 'St Francis Mackworth — Kitchen',
    whoAtRisk: ['Congregation members', 'Volunteers', 'Visitors / public'],
    involvesChildren: false, involvesVulnerableAdults: true, involvesFood: true, isOutdoor: false,
    hazards: [
      { hazard: 'Allergen cross-contamination in food prepared or served on premises', who: 'All attendees', existingControls: 'Allergen information available for all food. Food labelled in compliance with Natasha\'s Law. Volunteers trained in allergen awareness.', likelihood: 2, severity: 3, additionalControls: 'Separate utensils for allergen-free food preparation. Written allergen matrix maintained for regular food items. Annual allergen training refresher.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Food stored at incorrect temperature causing bacterial growth', who: 'All attendees', existingControls: 'Fridge temperature checked and logged daily. Food not left at room temperature for more than 2 hours. Date labelling used for all stored food.', likelihood: 2, severity: 3, additionalControls: 'Fridge temperature log maintained. Food safety officer identified among regular kitchen volunteers.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Poor personal hygiene by food handlers', who: 'All attendees', existingControls: 'Handwashing facilities available in kitchen. Volunteers briefed to wash hands before food handling. Food not handled if volunteer is unwell.', likelihood: 2, severity: 2, additionalControls: 'Food handler guidance posted in kitchen. Any volunteer with vomiting or diarrhoea must not handle food for 48 hours after last symptom.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Burns or scalds from hot liquids, ovens, or cooking equipment', who: 'Volunteers', existingControls: 'Oven gloves provided. Hot liquids handled by adults only. Hot water urn secured and positioned safely.', likelihood: 2, severity: 2, additionalControls: 'Burns first aid kit in kitchen. Volunteers briefed on safe urn use. Boiling water not carried across areas where children may be present.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Kitchen equipment defective or not maintained', who: 'Volunteers', existingControls: 'Kitchen equipment inspected regularly. Defective items taken out of use and tagged. PAT testing includes kitchen appliances.', likelihood: 1, severity: 2, additionalControls: 'Kitchen equipment inspection included in monthly buildings check. Defective items logged and repaired or replaced promptly.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Food Safety (local authority) compliance — no registered food business if required', who: 'Church — compliance risk', existingControls: 'Church activities assessed against Food Business Registration threshold. Registration with Derby City Council in place if required.', likelihood: 1, severity: 2, additionalControls: 'Food Safety Act obligations reviewed annually with Operations Manager. Confirm registration status with Derby City Environmental Health if scale of food operations changes.', owner: 'Operations Manager', deadline: '' },
    ],
  },
  {
    id: 'A15', ref: 'A15', category: 'Regular Activities',
    name: 'Alpha / Small Groups (Off-site)',
    legislation: 'HSWA 1974, MHSWR 1999',
    reviewMonths: 12,
    location: 'Various off-site venues (homes, community spaces)',
    whoAtRisk: ['Congregation members', 'Volunteers', 'Visitors / public'],
    involvesChildren: false, involvesVulnerableAdults: false, involvesFood: true, isOutdoor: false,
    hazards: [
      { hazard: 'Host or leader working alone with attendees in a private home', who: 'Volunteers, Visitors / public', existingControls: 'Alpha and small group leaders briefed on lone working and pastoral boundary expectations. Groups not held at private homes with vulnerable attendees without two leaders present.', likelihood: 2, severity: 2, additionalControls: 'Group leader directory maintained by Operations Manager. Leader contact details held centrally.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Safeguarding concern or disclosure in small group context', who: 'Congregation members, Vulnerable adults', existingControls: 'All leaders trained to Foundation level. PSO contact known. Any disclosure handled sensitively and escalated to PSO.', likelihood: 2, severity: 3, additionalControls: 'Safeguarding reminder included in all Alpha leader training. Escalation pathway laminated and given to every group leader.', owner: 'Joanne Baillie (PSO)', deadline: '' },
      { hazard: 'Allergen cross-contamination in food shared at group', who: 'Congregation members', existingControls: 'Hosts asked to declare any allergens in food provided. Attendees with severe allergies advised to bring own food or notify host in advance.', likelihood: 2, severity: 2, additionalControls: 'Alpha hosting guide includes allergen awareness section.', owner: 'Alpha Team Lead', deadline: '' },
      { hazard: 'Attendee distressed by group discussion content (mental health impact)', who: 'Congregation members, Visitors / public', existingControls: 'Leaders trained to respond sensitively. Any distressed attendee supported privately after session.', likelihood: 2, severity: 2, additionalControls: 'Leader debrief after each session with Alpha Coordinator. PSO contact shared with leaders.', owner: 'Alpha Team Lead', deadline: '' },
    ],
  },

  // ── Events ────────────────────────────────────────────────────────────────────
  {
    id: 'E7', ref: 'E7', category: 'Events',
    name: 'Baptism Service (Water Safety)',
    legislation: 'HSWA 1974, MHSWR 1999, Management of Health & Safety at Work Regulations 1999',
    reviewMonths: 12,
    location: 'St Francis Mackworth — Baptismal Pool / Font',
    whoAtRisk: ['Congregation members', 'Staff', 'Volunteers', 'Children (under 18)'],
    involvesChildren: true, involvesVulnerableAdults: false, involvesFood: false, isOutdoor: false,
    hazards: [
      { hazard: 'Slip or fall entering or exiting the baptismal pool', who: 'Clergy, Candidates', existingControls: 'Non-slip mat placed in and around pool. Pool steps have grip surface. Candidates briefed on safe entry and exit before service.', likelihood: 2, severity: 2, additionalControls: 'Pool area checked and mat secured before every baptism. Spare dry clothes and towels available. Assist candidate on pool steps if required.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Drowning or submersion incident — candidate or child in pool', who: 'Congregation members, Children (under 18)', existingControls: 'Baptisms conducted only by trained and authorised clergy. Candidates briefed fully beforehand. Child baptisms by affusion (pouring) only — full immersion not used for infants.', likelihood: 1, severity: 3, additionalControls: 'First Aider present at all baptism services. Emergency procedure for pool known to all assisting staff. 999 called immediately in any submersion incident.', owner: 'Vicar', deadline: '' },
      { hazard: 'Electrical equipment (sound, lighting) near water', who: 'All present', existingControls: 'AV equipment positioned away from pool. No trailing leads near water. Production Team briefed on water proximity hazard.', likelihood: 1, severity: 3, additionalControls: 'Pre-service check of all electrical equipment near pool area.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Wet floor causing slips for congregation after service', who: 'Congregation members', existingControls: 'Pool area coned off after use until dry. Absorbent towels placed at pool exit. Wet floor signage in place.', likelihood: 2, severity: 2, additionalControls: 'Pool area mopped before congregation moves through area. Wet floor sign removed only when floor confirmed dry.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Water temperature causing discomfort or cold shock', who: 'Baptism candidates', existingControls: 'Pool water temperature checked before service (target 32–36°C). Boiler and pool heating checked day before.', likelihood: 1, severity: 2, additionalControls: 'Candidate informed of approximate water temperature. Warm towels and changing area available immediately after.', owner: 'Operations Manager', deadline: '' },
    ],
  },
  {
    id: 'E8', ref: 'E8', category: 'Events',
    name: 'Bonfire / Fireworks Event',
    legislation: 'HSWA 1974, MHSWR 1999, Fireworks Regulations 2004, Environmental Protection Act 1990',
    reviewMonths: 0,
    location: 'TBC — specify before use',
    whoAtRisk: ['Congregation members', 'Volunteers', 'Visitors / public', 'Children (under 18)'],
    involvesChildren: true, involvesVulnerableAdults: false, involvesFood: true, isOutdoor: true,
    hazards: [
      { hazard: 'Burns or injuries from fireworks — spectators too close to display', who: 'All attendees, Children', existingControls: 'Minimum 25-metre exclusion zone between fireworks and spectators. Exclusion zone marked with rope and stewards. Fireworks set off only by trained operator.', likelihood: 2, severity: 3, additionalControls: 'Professional fireworks display operator used for any display over Category F2. Public liability insurance confirmed. Safety distances on label observed and exceeded.', owner: 'Events Team Lead', deadline: '' },
      { hazard: 'Burns from bonfire — spectators too close', who: 'All attendees, Children', existingControls: 'Bonfire surrounded by rope barrier (minimum 3m). Barrier stewarded. Only dry, approved materials burned.', likelihood: 2, severity: 3, additionalControls: 'Fire extinguisher adjacent to bonfire. Bucket of sand available. Bonfire not left unattended until fully extinguished.', owner: 'Events Team Lead', deadline: '' },
      { hazard: 'Stray firework or flying debris injuring spectator', who: 'All attendees', existingControls: 'Fireworks only set off in appropriate open space. Wind direction checked before launch. Display paused if wind direction changes adversely.', likelihood: 1, severity: 3, additionalControls: 'Display stopped immediately if any firework misfires. Dud fireworks left for 5 minutes before being doused with water — not picked up.', owner: 'Events Team Lead', deadline: '' },
      { hazard: 'Child separated from adult in dark/crowded conditions', who: 'Children (under 18)', existingControls: 'Lost child procedure in place. Meeting point identified and communicated. Children under 12 must remain with named adult.', likelihood: 2, severity: 3, additionalControls: 'Briefing to all attendees at start of event. Stewards briefed on lost child procedure.', owner: 'Events Team Lead', deadline: '' },
      { hazard: 'Inadequate first aid for crowd size', who: 'All attendees', existingControls: 'First Aider present scaled to expected attendance. First aid kit accessible. Nearest A&E confirmed.', likelihood: 2, severity: 3, additionalControls: 'For 200+ attendees, St John Ambulance attendance considered. Fire engine call-out number known.', owner: 'Events Team Lead', deadline: '' },
    ],
  },
  {
    id: 'E9', ref: 'E9', category: 'Events',
    name: 'Public Fundraising Event',
    legislation: 'HSWA 1974, MHSWR 1999, Licensing Act 2003, Food Safety Act 1990, Charity Commission guidance',
    reviewMonths: 0,
    location: 'TBC — specify before use',
    whoAtRisk: ['Congregation members', 'Volunteers', 'Visitors / public'],
    involvesChildren: false, involvesVulnerableAdults: false, involvesFood: true, isOutdoor: false,
    hazards: [
      { hazard: 'Licensing requirement not met for regulated entertainment or alcohol', who: 'Church — compliance risk', existingControls: 'Premises licence reviewed before any regulated activity (live music, alcohol, late-night refreshment). Temporary Event Notice (TEN) obtained where required.', likelihood: 2, severity: 3, additionalControls: 'TEN application submitted minimum 10 working days before event. Licence conditions complied with in full.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Charity collection compliance — unlicensed street or public collection', who: 'Church — compliance risk', existingControls: 'Public collection licence obtained from Derby City Council for any collection in public space.', likelihood: 1, severity: 2, additionalControls: 'Collection licence application made minimum 4 weeks before event. Charity registration number displayed on all collection materials.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Overcrowding beyond venue capacity', who: 'All attendees', existingControls: 'Venue capacity known. Ticket sales limited accordingly. Door counter used for walk-in events.', likelihood: 2, severity: 3, additionalControls: 'Named capacity monitor on door. Overflow plan in place if capacity reached.', owner: 'Events Team Lead', deadline: '' },
      { hazard: 'Allergen information not available for food sold or given away', who: 'All attendees', existingControls: 'All food labelled with ingredient and allergen information. Volunteers briefed on Natasha\'s Law requirements.', likelihood: 2, severity: 3, additionalControls: 'Written allergen information available for all stall holders. Anyone with a severe allergy advised to ask before consuming.', owner: 'Events Team Lead', deadline: '' },
      { hazard: 'Proceeds lost, stolen, or miscounted', who: 'Volunteers, Church — financial risk', existingControls: 'Two-person cash handling. Cash counted and recorded before leaving event. Funds banked promptly.', likelihood: 1, severity: 2, additionalControls: 'Counting sheet signed by two counters. Discrepancies reported to Operations Manager. Float recorded separately from income.', owner: 'Operations Manager', deadline: '' },
    ],
  },

  // ── Maintenance ───────────────────────────────────────────────────────────────
  {
    id: 'M2', ref: 'M2', category: 'Maintenance',
    name: 'Asbestos & Hazardous Materials Awareness',
    legislation: 'Control of Asbestos Regulations 2012, HSWA 1974',
    reviewMonths: 24,
    location: 'St Francis Mackworth — All premises',
    whoAtRisk: ['Staff', 'Volunteers', 'Contractors'],
    involvesChildren: false, involvesVulnerableAdults: false, involvesFood: false, isOutdoor: false,
    hazards: [
      { hazard: 'Asbestos-containing materials disturbed during routine maintenance', who: 'Staff, Volunteers, Contractors', existingControls: 'Asbestos Management Survey completed. Register of known/presumed ACMs held by Operations Manager. All contractors provided with register before works begin.', likelihood: 1, severity: 3, additionalControls: 'If suspected ACM found during works: stop immediately, seal area, notify Operations Manager. Licensed contractor instructed for any removal.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'No asbestos survey in place — unknown ACM locations', who: 'Staff, Contractors', existingControls: 'Management survey instructed and on file. Re-inspection every 12 months or when condition changes.', likelihood: 1, severity: 3, additionalControls: 'Survey reviewed and updated before any significant building works. Diocese/Ecclesiastical notified if ACM removal required.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Lead paint disturbed during redecoration works', who: 'Contractors', existingControls: 'Contractors informed of potential for lead paint in older buildings. Works scoped accordingly.', likelihood: 1, severity: 2, additionalControls: 'Paint test instructed for any sanding/stripping works in building sections pre-1970. Licensed waste disposal for lead paint waste.', owner: 'Operations Manager', deadline: '' },
    ],
  },
  {
    id: 'M3', ref: 'M3', category: 'Maintenance',
    name: 'Legionella & Water Safety',
    legislation: 'Control of Substances Hazardous to Health (COSHH) 2002, HSE ACoP L8, HSG274',
    reviewMonths: 12,
    location: 'St Francis Mackworth — All premises',
    whoAtRisk: ['Congregation members', 'Staff', 'Volunteers', 'Contractors'],
    involvesChildren: false, involvesVulnerableAdults: true, involvesFood: false, isOutdoor: false,
    hazards: [
      { hazard: 'Legionella growth in water systems due to infrequent use or stagnant water', who: 'All persons on premises', existingControls: 'Legionella risk assessment in place. Hot water stored and distributed above 60°C. Cold water maintained below 20°C. Infrequently used outlets flushed weekly.', likelihood: 1, severity: 3, additionalControls: 'Competent person appointed for water safety. Annual Legionella risk assessment review. Temperature checks logged monthly.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Water system temperature outside safe parameters', who: 'All persons on premises, Vulnerable adults', existingControls: 'Hot water temperature monitored at calorifier and sentinel outlets monthly. Results logged.', likelihood: 1, severity: 3, additionalControls: 'Thermostatic mixing valves (TMVs) installed at accessible outlets to prevent scalding. TMVs serviced annually.', owner: 'Operations Manager', deadline: '' },
      { hazard: 'Showers or rarely used taps not flushed during building closure', who: 'All persons on premises', existingControls: 'All outlets flushed weekly during periods of low or no building use. Flushing log maintained.', likelihood: 2, severity: 2, additionalControls: 'Flushing procedure assigned to named responsible person. Logged in building management file.', owner: 'Operations Manager', deadline: '' },
    ],
  },
];
