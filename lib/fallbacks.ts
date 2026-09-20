export interface FallbackResponse {
  answer: string;
  sources: { is_number: string; title: string; category: string }[];
}

export interface DomainTopic {
  keys: string[];
  is_number: string;
  title: string;
  category: string;
  scheme: 'Scheme-I (ISI Mark)' | 'Scheme-II (CRS)' | 'FMCS' | 'Hallmarking';
  portal: string;
  leadTime: string;
  mandatoryQCO: string;
  penalties: string;
  safetySummary: string;
  keyTests: string[];
  markFormat: string;
  mfgSteps: string[];
  consumerTips: string[];
}

export const DOMAIN_KNOWLEDGE: DomainTopic[] = [
  {
    keys: ['helmet', 'helmets', '4151', 'bike', 'rider', 'two wheeler', 'motorcycle', 'हेलमेट'],
    is_number: 'IS 4151:2015',
    title: 'Protective Helmets for Two-Wheeler Motor Vehicle Riders',
    category: 'Helmets & Personal Safety',
    scheme: 'Scheme-I (ISI Mark)',
    portal: 'manakonline.in',
    leadTime: '60–90 days',
    mandatoryQCO: 'Helmet for Riders of Two-Wheeler Motor Vehicles (Quality Control) Order, 2020',
    penalties: 'BIS Act 2016 Section 29 (Up to ₹5 lakh fine + up to 2 years imprisonment)',
    safetySummary: 'Mandatory for all two-wheeler helmets manufactured, imported, or sold in India. Non-ISI helmets are illegal.',
    keyTests: [
      'Impact Attenuation Test: Shock absorption across -10°C to +50°C temperatures',
      'Penetration Resistance: Drop cone test to verify shell integrity against puncture',
      'Dynamic Retention System Test: Chin strap dynamic load test to prevent ejection during crash',
      'Visor Optical Quality: Light transmission (min 85%) and scratch resistance',
    ],
    markFormat: 'Standard ISI Mark + IS 4151 above + 7 to 10 digit `CM/L-XXXXXXXXXX` license number below',
    mfgSteps: [
      'Step 1: Set up in-house testing lab with drop rig, penetration tester, and conditioned chambers.',
      'Step 2: Submit Scheme-I application online on manakonline.in with Form-V and factory layout.',
      'Step 3: BIS technical audit team inspects factory manufacturing line and calibration logs.',
      'Step 4: Draw independent samples for NABL-accredited BIS central testing lab verification.',
      'Step 5: Pay marking fees and receive CM/L grant letter valid for 1–2 years (renewable).',
    ],
    consumerTips: [
      'Never buy a helmet without the authentic ISI logo and a clearly visible 7–10 digit CM/L number.',
      'Verify the CM/L number on the official BIS CARE app or manakonline.in before purchasing.',
      'Novelty caps, construction hard hats, and uncertified half-helmets are illegal for road use.',
    ],
  },
  {
    keys: ['cooker', 'cookers', 'pressure cooker', '2347', 'कुकर', 'प्रेशर कुकर'],
    is_number: 'IS 2347:2017',
    title: 'Domestic Pressure Cookers — Specification',
    category: 'Cookware & Pressure Vessels',
    scheme: 'Scheme-I (ISI Mark)',
    portal: 'manakonline.in',
    leadTime: '60–90 days',
    mandatoryQCO: 'Domestic Pressure Cookers (Quality Control) Order',
    penalties: 'BIS Act 2016 Section 29 (Seizure of stock, cancellation of trade license, up to ₹5 lakh fine)',
    safetySummary: 'Mandatory ISI mark for all domestic pressure cookers (aluminium, stainless steel, and composite).',
    keyTests: [
      'Proof Pressure Test: Vessel must withstand 2x nominal operating pressure without permanent deformation',
      'Bursting Pressure Test: Must safely exceed bursting thresholds without dangerous fragmentation',
      'Safety Valve Release Test: Fusible plug and secondary safety vents must release before critical pressure',
      'Gasket Reliability & Thermal Cycle: Gasket rubber food-grade silicone (IS 7466) with zero toxic leaching',
    ],
    markFormat: 'ISI Mark embossed or stamped on lid and body + `IS 2347` + `CM/L-XXXXXXXXXX`',
    mfgSteps: [
      'Install hydraulic pressure testing rig and safety valve pop-off calibration benches.',
      'Apply under Scheme-I on manakonline.in with metallurgical mill test certificates.',
      'BIS factory audit verifies stamping line, gasket seating tolerance, and wall thickness.',
      'Lab testing verifies food-grade contact and bursting safety limits.',
    ],
    consumerTips: [
      'Ensure the cooker has both a primary weight regulator and a metallic fusible safety plug.',
      'Check that the ISI Mark and CM/L number are permanently stamped on both the lid and base.',
    ],
  },
  {
    keys: ['kettle', 'iron', 'heater', 'geyser', 'mixer', 'grinder', 'toaster', 'appliance', 'appliances', '302', 'electrical', 'गीजर', 'प्रेस', 'मिक्सर'],
    is_number: 'IS 302-1:2024 / IS 302-2-15',
    title: 'Safety of Household, Commercial and Similar Electrical Appliances',
    category: 'Household Electrical Appliances',
    scheme: 'Scheme-I (ISI Mark)',
    portal: 'manakonline.in',
    leadTime: '60–90 days',
    mandatoryQCO: 'Safety of Household, Commercial and Similar Electrical Appliances (Quality Control) Order, 2026',
    penalties: 'BIS Act 2016 Section 29 (Fines up to ₹5 lakh + 2 years imprisonment)',
    safetySummary: 'Mandatory ISI certification for single-phase (up to 250V) and three-phase (up to 480V) domestic appliances.',
    keyTests: [
      'Protection against Electric Shock (IS 302-1 Clause 8): Inaccessibility of live parts',
      'High Voltage Dielectric Breakdown: 1500V–3750V insulation breakdown withstand test',
      'Earth Continuity & Leakage Current: Max 0.75mA leakage at rated operating temperature',
      'Thermal Cutout & Boil-Dry Protection: Automatic power cutoff on dry heating for kettles/geysers',
    ],
    markFormat: 'ISI Mark + `IS 302-X-XX` + `CM/L-XXXXXXXXXX` on nameplate rating sticker',
    mfgSteps: [
      'Equip SIT in-house lab with HV Flash Tester, Megohmmeter, Earth Bond Tester, and Leakage meter.',
      'Submit Form-V on manakonline.in with circuit schematics and BOM (Bill of Materials).',
      'BIS audit verifies 100% routine dielectric tests on 100% finished assembly line products.',
      'Independent sample testing at NABL lab verifies glow-wire flammability of plastic housings.',
    ],
    consumerTips: [
      'Check the rear rating plate for the ISI mark and 3-pin earthed plug molded mark.',
      'Never use single-insulated uncertified heating elements or immersions without auto-cutoff.',
    ],
  },
  {
    keys: ['charger', 'adapter', 'mobile charger', 'power bank', 'laptop adapter', '16333', '13252', 'crs', 'चाージャー', 'मोबाइल'],
    is_number: 'IS 16333 (Part 3) / IS 13252 (Part 1)',
    title: 'Compulsory Registration Scheme — Power Adapters & Information Technology Goods',
    category: 'Electronics & IT (CRS)',
    scheme: 'Scheme-II (CRS)',
    portal: 'crsbis.in',
    leadTime: '20–30 days',
    mandatoryQCO: 'Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order',
    penalties: 'Customs port confiscation + BIS Act Section 29 enforcement',
    safetySummary: 'CRS is self-declaration based on lab testing. NO factory audit is required for Scheme-II.',
    keyTests: [
      'Electric Shock Hazard & Creepage/Clearance Distances (IS 13252-1)',
      'Temperature Rise & Thermal Stress during full load fast charging',
      'Short Circuit and Over-Voltage Protection under fault conditions',
      'Flammability of Enclosure Materials (UL 94 V-0/V-1 rating equivalent)',
    ],
    markFormat: 'Official BIS CRS Dual-Loop Logo with `R-XXXXXXXX` (8-digit Registration Number)',
    mfgSteps: [
      'Step 1: Send sample units to a BIS-recognized NABL laboratory in India for testing.',
      'Step 2: Obtain valid test report (Form-VI format) within 15–20 days.',
      'Step 3: Register online on crsbis.in with Indian Authorized Representative (AIR) for foreign brands.',
      'Step 4: Upload test report and submit self-declaration of conformity.',
      'Step 5: BIS issues 8-digit R-number (e.g., R-41012345). Affix CRS logo on packaging and label.',
    ],
    consumerTips: [
      'Look for the official CRS border logo with `R-XXXXXXXX` printed below it on the charger casing.',
      'Verify the R-number on crsbis.in to check if the brand and model match the physical product.',
    ],
  },
  {
    keys: ['toy', 'toys', '9873', '15644', 'doll', 'game', 'खिलौना', 'खिलौने'],
    is_number: 'IS 9873 (Parts 1–9) & IS 15644',
    title: 'Safety of Toys — Mechanical, Chemical and Electrical Safety',
    category: 'Toys & Children Products',
    scheme: 'Scheme-I (ISI Mark)',
    portal: 'manakonline.in',
    leadTime: '60–90 days',
    mandatoryQCO: 'Toys (Quality Control) Order, 2020',
    penalties: 'BIS Act 2016 Section 29 (Strict confiscation + fines up to ₹5 lakh)',
    safetySummary: '100% mandatory ISI certification for all physical and electrical toys for children under 14.',
    keyTests: [
      'IS 9873-1: Mechanical hazards — small parts choking cylinder test, sharp point/edge testers, drop tests',
      'IS 9873-2: Flammability rate of textile and plush stuffed toys',
      'IS 9873-3: Heavy Metal Migration limits (Lead < 90mg/kg, Cadmium < 75mg/kg, Mercury, Chromium)',
      'IS 15644: Electrical safety for battery-operated and plug-in electric toys',
    ],
    markFormat: 'ISI Mark + `IS 9873` / `IS 15644` + `CM/L-XXXXXXXXXX` printed on primary packaging',
    mfgSteps: [
      'Set up in-house lab with small parts cylinder, tension gauge, torque tester, and sharp edge tester.',
      'Submit Scheme-I application on manakonline.in.',
      'BIS factory inspection examines raw plastic virginity, non-toxic pigment traceability.',
      'Draw production samples for BIS laboratory testing before issuing CM/L license.',
    ],
    consumerTips: [
      'Never buy toys from uncertified roadside vendors lacking the ISI stamp and CM/L license.',
      'Verify that non-toxic plastic and age-appropriate warning labels are present.',
    ],
  },
  {
    keys: ['gold', 'jewel', 'jewellery', 'hallmark', 'huid', '1417', '2112', 'karat', 'सोना', 'हॉलमार्क', 'गहने'],
    is_number: 'IS 1417:2016',
    title: 'Gold & Gold Alloys, Jewellery/Artefacts — Fineness & Hallmarking',
    category: 'Precious Metals & Jewellery',
    scheme: 'Hallmarking',
    portal: 'manakonline.in',
    leadTime: 'Instant / Online registration',
    mandatoryQCO: 'Hallmarking of Gold Jewellery and Artefacts Order, 2020 (Mandatory in 340+ districts)',
    penalties: 'BIS Act 2016 Section 29 (Minimum fine of ₹1 lakh or 5x value of gold + imprisonment)',
    safetySummary: 'Mandatory 3-symbol laser hallmark with unique 6-digit alphanumeric HUID on every gold article.',
    keyTests: [
      'Fire Assay (Cupellation) Method: Reference standard for destructive gold purity testing',
      'X-Ray Fluorescence (XRF) Spectrometry: Non-destructive assay testing at Assaying & Hallmarking Centres (AHC)',
      'Laser Inscription Quality: High-resolution laser engraving of 6-digit HUID without weakening structure',
    ],
    markFormat: '3 Authentic Symbols: [1. BIS Triangle] + [2. Purity e.g. 22K916 / 18K750 / 14K585] + [3. 6-digit HUID e.g. AB1234]',
    mfgSteps: [
      'Jewellers register online on manakonline.in (automatic zero-fee registration for micro-units).',
      'Submit unhallmarked jewellery to a BIS-recognized Assaying & Hallmarking Centre (AHC).',
      'AHC performs XRF assaying, issues test report, and laser engraves the unique HUID from BIS central portal.',
      'Article is logged in the BIS National Traceability Database.',
    ],
    consumerTips: [
      'Download the official BIS CARE mobile app and enter the 6-digit HUID printed on your ornament.',
      'The app displays the jeweller name, registration date, AHC centre, and exact purity karatage.',
      'Beware of old 4-mark jewelry; all new sales must carry the 6-digit laser HUID.',
    ],
  },
  {
    keys: ['cement', 'ppc', 'opc', '1489', '12269', '269', 'सीमेंट'],
    is_number: 'IS 1489 (Part 1/2) / IS 12269:2013',
    title: 'Portland Pozzolana Cement & 53-Grade Ordinary Portland Cement',
    category: 'Civil & Construction Materials',
    scheme: 'Scheme-I (ISI Mark)',
    portal: 'manakonline.in',
    leadTime: '90–120 days',
    mandatoryQCO: 'Cement (Quality Control) Order, 2003 (S.O. 191(E))',
    penalties: 'BIS Act 2016 Section 29 (Immediate factory sealing + criminal prosecution)',
    safetySummary: 'Strictly mandatory ISI mark. Selling, storing, or transporting non-ISI cement is a cognizable criminal offense.',
    keyTests: [
      'Compressive Strength Test (at 3, 7, and 28 days of curing)',
      'Initial & Final Setting Time (Vicat apparatus)',
      'Soundness Test (Le-Chatelier expansion < 10mm & Autoclave expansion < 0.8%)',
      'Chemical Composition: Insoluble residue, magnesia content, and loss on ignition',
    ],
    markFormat: 'Prominent ISI Mark + `IS 1489 (Part 1)` or `IS 12269` + `CM/L-XXXXXXXXXX` on every cement bag',
    mfgSteps: [
      'Establish comprehensive physical & chemical NABL-calibrated testing laboratory at grinding plant.',
      'Apply on manakonline.in with limestone quarry leases and clinker supply agreements.',
      'BIS officers audit clinker quality, automated bag packing, and weight control tolerance.',
      'Draw independent 28-day sample validation before CM/L license grant.',
    ],
    consumerTips: [
      'Check the manufacturing week and year (e.g., W-42, Y-2026) along with the ISI logo on every bag.',
      'Never accept cement with damaged stitches, damp lumps, or missing CM/L numbers.',
    ],
  },
  {
    keys: ['steel', 'tmt', 'rebar', '1786', '2062', 'sariya', 'स्टील', 'सरिया'],
    is_number: 'IS 1786:2008 / IS 2062:2011',
    title: 'High Strength Deformed Steel Bars (TMT) & Structural Steel',
    category: 'Steel & Metallurgy',
    scheme: 'Scheme-I (ISI Mark)',
    portal: 'manakonline.in',
    leadTime: '90–120 days',
    mandatoryQCO: 'Steel and Steel Products (Quality Control) Order',
    penalties: 'BIS Act 2016 Section 29 (Confiscation of tonnage + ₹5 lakh fine + criminal charges)',
    safetySummary: 'Mandatory ISI certification for all TMT rebars (Fe 415, Fe 500, Fe 500D, Fe 550D) used in RCC construction.',
    keyTests: [
      '0.2% Proof Stress / Yield Strength & Ultimate Tensile Strength (UTS/YS ratio >= 1.10 for D-grade)',
      'Percentage Elongation (Min 16% for earthquake ductility in Fe 500D)',
      'Bend & Rebend Test: 180° cold bend without surface rupture or cracking',
      'Chemical limits: Carbon <= 0.25%, Sulphur <= 0.040%, Phosphorus <= 0.040%',
    ],
    markFormat: 'Embossed ISI logo + Grade (e.g. `FE 500D`) + Brand Name + `CM/L` at regular 1-meter intervals on bar',
    mfgSteps: [
      'Equip plant with Optical Emission Spectrometer (OES) and 1000kN Universal Testing Machine (UTM).',
      'Submit Scheme-I application on manakonline.in.',
      'BIS audit verifies induction furnace, Ladle Refining Furnace (LRF), and continuous caster controls.',
      'Independent lab tests confirm chemical and mechanical properties across all produced diameters.',
    ],
    consumerTips: [
      'Look for embossed (raised) letters showing the brand name, Fe-grade, and ISI mark on every single rebar.',
      'Ask the dealer for the manufacturer Mill Test Certificate (MTC) matching the batch number.',
    ],
  },
  {
    keys: ['water', 'drinking water', 'packaged water', 'mineral water', '14543', '13428', 'पानी', 'बोतल'],
    is_number: 'IS 14543:2024 / IS 13428:2005',
    title: 'Packaged Drinking Water & Packaged Natural Mineral Water',
    category: 'Food, Water & Beverages',
    scheme: 'Scheme-I (ISI Mark)',
    portal: 'manakonline.in',
    leadTime: '60–90 days',
    mandatoryQCO: 'Mandatory under Food Safety and Standards (FSSAI) & BIS Act Regulations',
    penalties: 'BIS Act Section 29 + FSSAI Act (Closure of plant + criminal prosecution)',
    safetySummary: '100% mandatory dual certification: ISI Mark (IS 14543) + FSSAI License before sale.',
    keyTests: [
      'Microbiological Purity: Total coliforms, E. coli, Salmonella, Pseudomonas aeruginosa (0 cfu/250ml)',
      'Heavy Metals & Pesticide Residue: Limits for Lead, Arsenic, Cadmium, and 20+ banned pesticide molecules',
      'Total Dissolved Solids (TDS): 75–500 mg/l with neutral pH (6.5–8.5)',
      'Packaging Safety: Food-grade PET / Polycarbonate containers (IS 15410 / IS 14971)',
    ],
    markFormat: 'ISI Mark with `IS 14543` + `CM/L-XXXXXXXXXX` on neck seal and label + FSSAI logo',
    mfgSteps: [
      'Set up in-house microbiological and chemical testing laboratory with laminar airflow hood and autoclave.',
      'Apply for Scheme-I on manakonline.in.',
      'BIS officers audit reverse osmosis (RO), ozonation, UV sterilization, and automated touch-free bottling line.',
      'Complete microbiological test reports required before commercial bottling authorization.',
    ],
    consumerTips: [
      'Never drink from a sealed water bottle lacking both the ISI mark and the 7–10 digit CM/L number.',
      'Ensure the tamper-evident neck seal is intact and features printed batch and manufacturing dates.',
    ],
  },
  {
    keys: ['fire', 'extinguisher', 'cylinder', '15683', 'आग', 'अग्निशामक'],
    is_number: 'IS 15683:2018',
    title: 'Portable Fire Extinguishers — Performance and Construction',
    category: 'Fire Protection & Safety',
    scheme: 'Scheme-I (ISI Mark)',
    portal: 'manakonline.in',
    leadTime: '60–90 days',
    mandatoryQCO: 'Fire Extinguishers (Quality Control) Order',
    penalties: 'BIS Act 2016 Section 29 (Up to ₹5 lakh fine + safety disqualification)',
    safetySummary: 'Mandatory ISI mark on all portable fire extinguishers (Water, Foam, ABC Powder, CO2, Clean Agent).',
    keyTests: [
      'Fire Rating Extinguishment Test: Actual test fires of Class A wood cribs and Class B heptane trays',
      'Hydraulic Burst Pressure Test: Cylinder must withstand 2.5x to 4x working pressure without rupture',
      'Discharge Duration & Throw Range: Min 85% chemical powder discharge within specified seconds',
      'Corrosion Resistance: Salt spray fog test for 240+ hours without external/internal pitting',
    ],
    markFormat: 'ISI Mark + `IS 15683` + `CM/L-XXXXXXXXXX` embossed or printed on cylinder body label',
    mfgSteps: [
      'Set up hydraulic pressure test rig and outdoor fire test proving ground.',
      'Apply for Scheme-I on manakonline.in.',
      'BIS audits deep-drawing cylinder fabrication, seam welding quality (X-ray/ultrasonic), and powder purity.',
      'Type testing at BIS lab confirms fire rating certification (e.g., 4A, 34B).',
    ],
    consumerTips: [
      'Check that the pressure gauge indicator is strictly in the GREEN operating zone.',
      'Ensure the safety pull-pin and plastic tamper seal with ISI CM/L mark are intact.',
    ],
  },
  {
    keys: ['led', 'bulb', 'lighting', '16102', '15885', 'एलईडी', 'बल्ब'],
    is_number: 'IS 16102 (Part 1 & 2) / IS 15885 (Part 2/Sec 13)',
    title: 'Self-Ballasted LED Lamps & LED Controlgear (Drivers)',
    category: 'Lighting & Electronics',
    scheme: 'Scheme-II (CRS)',
    portal: 'crsbis.in',
    leadTime: '20–30 days',
    mandatoryQCO: 'Electronics and IT Goods (Compulsory Registration) Order',
    penalties: 'Customs port clearance denial + BIS market seizure',
    safetySummary: 'Mandatory CRS registration for all domestic LED bulbs, tubelights, streetlights, and drivers.',
    keyTests: [
      'Luminous Efficacy & Life Test (Min 90–100 lumens/Watt)',
      'Electrical Insulation, Creepage Distances, and High Voltage Surge Protection (up to 2.5kV–4kV)',
      'Harmonic Current Emissions (Total Harmonic Distortion THD < 15%)',
      'Thermal Endurance Test: 1000-hour continuous burning under elevated temperature conditions',
    ],
    markFormat: 'Official BIS CRS Dual-Loop Mark with `R-XXXXXXXX` registration number on lamp base',
    mfgSteps: [
      'Submit sample units to a BIS-recognized NABL laboratory.',
      'Obtain certified test report within 2–3 weeks.',
      'Register on crsbis.in with Indian Authorized Representative details.',
      'Receive official R-number and print on LED base and retail box.',
    ],
    consumerTips: [
      'Check for the CRS logo and `R-XXXXXXXX` registration code on the bulb plastic neck.',
      'Verify that wattage, lumen output, and Bureau of Energy Efficiency (BEE) star label are displayed.',
    ],
  },
];

export function buildRichResponse(topic: DomainTopic, role: 'manufacturer' | 'consumer', lang: string): FallbackResponse {
  const isMfg = role === 'manufacturer';
  const isHi = lang === 'hi-IN' || lang.startsWith('hi');

  if (isHi) {
    const hindiAnswer = `### 🇮🇳 ${topic.title} (${topic.is_number})

**भारतीय मानक ब्यूरो (BIS) आधिकारिक तकनीकी मार्गदर्शन:**

---

### 📋 नियामक सारांश एवं अनिवार्यता (Regulatory Overview):
| विवरण | सरकारी विनिर्देश (Details) |
| :--- | :--- |
| **मानक कोड (IS Code)** | **${topic.is_number}** |
| **प्रमाणन योजना (Scheme)** | **${topic.scheme}** |
| **अनिवार्य आदेश (QCO)** | ${topic.mandatoryQCO} |
| **आधिकारिक पोर्टल (Portal)** | \`${topic.portal}\` |
| **अनुमानित समय (Timeline)** | **${topic.leadTime}** |
| **उल्लंघन पर दंड (Penalties)** | **${topic.penalties}** |

---

### 🛡️ मुख्य सुरक्षा परीक्षण (Mandatory Safety Tests):
${topic.keyTests.map(t => `- **${t.split(':')[0]}:** ${t.split(':')[1] || t}`).join('\n')}

---

### 🏷️ मानक चिह्न का सही प्रारूप (Genuine Mark Format):
- **${topic.markFormat}**

---

### ${isMfg ? '🏭 निर्माताओं के लिए प्रमाणीकरण चरण (Manufacturer Certification Roadmap)' : '🔍 उपभोक्ताओं के लिए सुरक्षा निर्देश (Consumer Safety Guidelines)'}:
${(isMfg ? topic.mfgSteps : topic.consumerTips).map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

> ⚖️ **वैधानिक चेतावनी (Section 29 BIS Act 2016):** बिना मानक चिह्न के इस उत्पाद का निर्माण, आयात या विक्रय करना गैर-कानूनी है।`;

    return {
      answer: hindiAnswer,
      sources: [{ is_number: topic.is_number, title: topic.title, category: topic.category }],
    };
  }

  // English / Global formatting
  const answer = `### 🇮🇳 ${topic.title} — ${topic.is_number}

**Official Technical Guidance from Bureau of Indian Standards (BIS)**

---

### 📋 Regulatory Matrix & Statutory Overview:
| Parameter | Official Specification / Requirement |
| :--- | :--- |
| **Applicable Standard** | **${topic.is_number}** |
| **Certification Scheme** | **${topic.scheme}** |
| **Mandatory Status** | Compulsory under *${topic.mandatoryQCO}* |
| **Application Portal** | [\`${topic.portal}\`](https://${topic.portal}) |
| **Processing Lead Time** | **${topic.leadTime}** |
| **Legal Liabilities** | **${topic.penalties}** |

---

### 🔬 Mandatory Laboratory Testing Parameters (SIT & NABL):
${topic.keyTests.map(t => `* **${t.split(':')[0]}:** ${t.split(':')[1] || t}`).join('\n')}

---

### 🏷️ Authentic BIS Standard Mark Verification:
* **Format:** ${topic.markFormat}
* **Verification:** Verify in real time on the **BIS CARE mobile app** or through the \`${topic.portal}\` verification directory.

---

### ${isMfg ? '🏭 Step-by-Step Manufacturer Certification Roadmap (Scheme Compliance)' : '🛡️ Consumer Protection & Counterfeit Detection Guide'}:
${(isMfg ? topic.mfgSteps : topic.consumerTips).map((step, idx) => `${idx + 1}. **${step.includes(':') ? step.split(':')[0] + ':**' + step.split(':')[1] : step}`).join('\n')}

---

> ⚖️ **Statutory Notice (BIS Act 2016 Section 29):** Manufacturing, importing, distributing, or selling non-certified units of goods under mandatory QCOs is punishable with fines up to ₹5,00,000 and up to 2 years imprisonment.`;

  return {
    answer,
    sources: [{ is_number: topic.is_number, title: topic.title, category: topic.category }],
  };
}

export function getFallbackResponse(query: string, role: 'manufacturer' | 'consumer' = 'consumer', lang: string = 'en-IN'): FallbackResponse | null {
  const q = query.toLowerCase().trim();
  const isHi = lang === 'hi-IN' || lang.startsWith('hi') || /[\u0900-\u097F]/.test(query);

  // ── 1. GREETINGS & FRIENDLY CHIT-CHAT ─────────────────────────────
  const isGreetingQuery =
    /^(hi|hello|hey|namaste|namaskar|good morning|good afternoon|good evening|hii|hiii|helo|kem cho|vanakkam)\b/i.test(q) ||
    /^(kaise ho|kaisa hai|kya haal|kya haal hai|kya chal raha hai|kya scene hai|sab theek|sab kaisa hai)/i.test(q) ||
    q.includes('kaise ho') || q.includes('kya haal') || q.includes('who are you') || q.includes('tum kaun ho');

  if (isGreetingQuery) {
    const greeting = isHi
      ? `Namaste! 🙏 Main ekdum badhiya hoon, aap batao aap kaise ho?

Main **BIS Saathi** hoon — Bureau of Indian Standards (BIS) ka official AI Assistant! 

Aap mujhse kisi bhi product ki safety, ISI mark verification, gold hallmarking (HUID), electronics CRS registration, ya BIS certification ke baare me pooch sakte hain.

Aaj main aapki kya madad kar sakta hoon? 😊`
      : `Namaste! 🙏 I am doing great, thank you for asking! How are you doing today?

I am **BIS Saathi** — the official AI Assistant for the **Bureau of Indian Standards (BIS)**, Government of India.

I can assist you with:
- ✅ **ISI Mark Verification & Genuine vs Fake Check** (Helmets, Cookers, Appliances, Toys)
- 🥇 **Gold Jewellery Hallmarking & 6-Digit Laser HUID Check**
- 📱 **Electronics & Mobile Chargers CRS Registration (Scheme-II)**
- 🏭 **Manufacturer Certification Pathways & In-House Lab Testing (SIT)**

What product or standard would you like to explore today?`;

    return {
      answer: greeting,
      sources: [{ is_number: 'BIS Act, 2016', title: 'National Standards Body of India', category: 'General Assistance' }],
    };
  }

  // ── 2. OUT-OF-DOMAIN / UNRELATED / "UT-PATANG" QUERIES ─────────────
  const outOfDomainKeywords = [
    'ipl', 'cricket', 'football', 'match', 'score', 'movie', 'cinema', 'actor', 'actress',
    'python', 'javascript', 'java', 'c++', 'coding', 'program', 'html code', 'css code',
    'recipe', 'khana banana', 'biryani', 'weather', 'mausam', 'barish', 'joke', 'jokes',
    'shayari', 'song', 'gaana', 'crypto', 'bitcoin', 'stock market', 'nifty', 'sensex',
    'homework', 'math', 'solve 2+2', 'calculus', 'dating', 'girlfriend', 'boyfriend',
    'election', 'vote', 'modi', 'rahul', 'politics', 'love'
  ];

  const isOutOfDomain = outOfDomainKeywords.some(kw => q.includes(kw)) &&
    !q.includes('bis') && !q.includes('standard') && !q.includes('isi') && !q.includes('mark') && !q.includes('safety');

  if (isOutOfDomain) {
    const refusal = isHi
      ? `Haha, dost main IPL, coding, movies ya general entertainment ke baare me toh nahi bata sakta! 😅

Main **Bureau of Indian Standards (BIS)** ka official AI assistant hoon. Mera kaam aapko **Indian Standards (IS codes), genuine ISI mark verification, gold hallmarking, aur product safety** ke baare me accurate jankari dena hai.

Agar aapko kisi bhi product ki quality ya BIS rules ke baare me poochna ho (jaise helmets, cookers, toys, mobile chargers, cement, steel, gold jewellery), toh zaroor bataiye — main 100% help karunga! 🛡️`
      : `I specialize strictly as the **Bureau of Indian Standards (BIS)** Intelligent Assistant, so I cannot assist with general topics like sports, coding, entertainment, or recipes! 😅

My purpose is to help you with:
- 🛡️ **Product Quality & Safety Standards (IS Codes)**
- 🔍 **Genuine ISI Mark & CRS Verification**
- 🥇 **Gold Hallmarking (6-digit HUID)**
- ⚖️ **Consumer Grievances & BIS Act Regulations**

Feel free to ask about any product or standard, and I will be glad to assist! 🇮🇳`;

    return {
      answer: refusal,
      sources: [{ is_number: 'BIS Mandate', title: 'Domain Boundaries & Citizen Assistance Guidelines', category: 'General' }],
    };
  }

  // ── 3. GENERAL CONCEPT: "BIS STANDARD KYA HAI" / "WHAT IS AN INDIAN STANDARD" ─
  if (
    q.includes('standard kya') || q.includes('standards kya') || q.includes('what is standard') ||
    q.includes('what is bis standard') || q.includes('what is an indian standard') || q.includes('is code kya') ||
    q.includes('मानक क्या') || q.includes('भारतीय मानक क्या') || q.includes('what are standards')
  ) {
    const answer = isHi
      ? `### 🇮🇳 भारतीय मानक (BIS Standard / IS Code) क्या है?

**भारतीय मानक (Indian Standard — IS)** भारत सरकार द्वारा किसी भी उत्पाद (Product), सेवा (Service), या प्रक्रिया (Process) की **गुणवत्ता (Quality), सुरक्षा (Safety), विश्वसनीयता (Reliability), और प्रदर्शन (Performance)** के लिए तय किया गया आधिकारिक तकनीकी विनिर्देश (Technical Specification) है।

---

### 📋 मुख्य विशेषताएं (Key Highlights):
| विशेषता (Parameter) | विवरण (Official Details) |
| :--- | :--- |
| **निर्धारणकर्ता (Authority)** | **भारतीय मानक ब्यूरो (BIS)** के तकनीकी वैज्ञानिक, उद्योग विशेषज्ञ एवं उपभोक्ता समितियां |
| **कुल मानक (Total Standards)** | भारत में **21,000+ से अधिक प्रकाशित भारतीय मानक (IS Codes)** मौजूद हैं |
| **नामकरण प्रारूप (Format)** | \`IS [संख्या]:[वर्ष]\` — उदाहरण: \`IS 4151:2015\` (हेलमेट), \`IS 2347:2017\` (प्रेशर कुकर) |
| **प्रकार (Classification)** | 1. **ऐच्छिक (Voluntary):** सामान्य व्यापारिक उत्पाद<br>2. **अनिवार्य (Mandatory QCO):** जन-स्वास्थ्य एवं सुरक्षा से जुड़े 350+ उत्पाद |
| **खोज पोर्टल (Library Portal)** | [\`standardsbis.bsbedge.com\`](https://standardsbis.bsbedge.com) |

---

### 🛡️ भारतीय मानक (BIS Standard) क्यों बनाए जाते हैं?
1. **उपभोक्ता सुरक्षा (Consumer Protection):** घटिया या खतरनाक सामान (जैसे कमजोर हेलमेट, फटने वाले कुकर, करंट मारने वाले गीजर) से नागरिकों की जान-माल की रक्षा।
2. **उद्योग गुणवत्ता (Industrial Standards):** भारतीय उत्पादों को अंतरराष्ट्रीय मानकों (ISO / IEC) के समकक्ष बनाकर वैश्विक निर्यात (Export) को बढ़ावा देना।
3. **पर्यावरण व ऊर्जा दक्षता (Sustainability):** बिजली की कम खपत और पर्यावरण-अनुकूल सामग्री का उपयोग सुनिश्चित करना।

> 💡 **उदाहरण:** यदि आप बाइक का हेलमेट खरीदते हैं, तो उस पर **\`IS 4151\`** का ISI मार्क होना आवश्यक है, जो यह प्रमाणित करता है कि यह हेलमेट क्रैश के समय सिर पर लगने वाले घातक प्रभाव को सोखने में पूरी तरह सक्षम है!`
      : `### 🇮🇳 What is a BIS Standard (Indian Standard / IS Code)?

An **Indian Standard (IS)** is a formally published technical specification formulated by the **Bureau of Indian Standards (BIS)** that establishes mandatory benchmarks for the **quality, safety, performance, dimensions, and testing methods** of products, processes, and services in India.

---

### 📋 Key Structural Dimensions:
| Dimension | Official Specification |
| :--- | :--- |
| **Formulating Authority** | **Bureau of Indian Standards (BIS)** Sectional Technical Committees |
| **Total Published Standards** | **21,000+ active Indian Standards (IS Codes)** across 15 engineering divisions |
| **Designation Format** | \`IS [Number]:[Year]\` (e.g., \`IS 4151:2015\` for Helmets, \`IS 1417:2016\` for Gold) |
| **Legal Nature** | 1. **Voluntary Standards:** General commercial guidelines<br>2. **Mandatory QCOs:** 169+ Quality Control Orders covering 350+ safety-critical products |
| **Standards Search Portal** | [\`standardsbis.bsbedge.com\`](https://standardsbis.bsbedge.com) |

---

### 🛡️ Core Objectives of Indian Standards:
1. **Consumer Life & Health Protection:** Eliminating hazardous, adulterated, or electrically dangerous consumer products from Indian markets.
2. **Quality Competitiveness:** Harmonizing Indian domestic manufacturing with international standards (**ISO / IEC**) to boost global exports.
3. **Legal Enforceability:** Providing a statutory benchmark for market surveillance, raids, and penal action under **Section 29 of the BIS Act, 2016**.

Which specific product standard (e.g. helmets, cookers, steel, electronics, solar, gold) would you like to explore?`;

    return {
      answer,
      sources: [{ is_number: 'BIS Act, 2016', title: 'Statutory Standards Formulation Mandate', category: 'Standards Governance' }],
    };
  }

  // ── 4. GENERAL CONCEPT: "BIS KYA HAI" / "WHAT IS BIS" ─────────────
  if (
    q.includes('bis kya hai') || q.includes('what is bis') || q.includes('what is bureau of indian') ||
    q.includes('tell me about bis') || q.includes('about bis') || q.includes('bis full form') ||
    q.includes('बीआईएस क्या है') || q.includes('भारतीय मानक ब्यूरो क्या है')
  ) {
    const answer = isHi
      ? `### 🏛️ भारतीय मानक ब्यूरो (Bureau of Indian Standards — BIS) क्या है?

**भारतीय मानक ब्यूरो (BIS)** भारत सरकार के *उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय* के अधीन भारत का **राष्ट्रीय मानक निकाय (National Standards Body)** है, जिसे **BIS अधिनियम, 2016** के तहत स्थापित किया गया है।

---

### 🏛️ BIS के 5 प्रमुख मुख्य कार्य (Core Mandate & Functions):

| कार्यक्षेत्र (Function) | नियामक प्रक्रिया (Mechanism) | आधिकारिक पोर्टल |
| :--- | :--- | :--- |
| **1. मानक निर्माण (Standards)** | 21,000+ से अधिक भारतीय मानकों (IS Codes) का निर्माण एवं संशोधन | [\`standardsbis.bsbedge.com\`](https://standardsbis.bsbedge.com) |
| **2. ISI मार्क प्रमाणन (ISI Mark)** | घरेलू एवं विदेशी कारखानों का ऑडिट कर प्रामाणिक **ISI मार्क** जारी करना | [\`manakonline.in\`](https://www.manakonline.in) |
| **3. CRS पंजीकरण (Electronics & IT)** | मोबाइल, चार्जर, लैपटॉप और LED के लिए लैब टेस्टिंग आधारित पंजीकरण | [\`crsbis.in\`](https://www.crsbis.in) |
| **4. स्वर्ण हॉलमार्किंग (Hallmarking)** | सोने के आभूषणों पर 6-डिजिट **HUID** लेजर स्टैम्पिंग द्वारा शुद्धता की गारंटी | [\`manakonline.in\`](https://www.manakonline.in) |
| **5. प्रवर्तन एवं निगरानी (Enforcement)** | नकली मार्क बनाने वालों पर छापे और **धारा 29** के तहत कानूनी कार्रवाई | [\`bis.gov.in\`](https://www.bis.gov.in) |

---

### ⚖️ वैधानिक अधिकार (Statutory Powers):
- **BIS Act 2016 की धारा 16:** सरकार को अनिवार्य गुणवत्ता नियंत्रण आदेश (QCO) जारी करने की शक्ति देती है।
- **BIS Act 2016 की धारा 29:** बिना प्रमाणन के अनिवार्य उत्पाद बेचने पर **₹5 लाख तक का जुर्माना और 2 वर्ष तक का कारावास** का प्रावधान है।`
      : `### 🏛️ What is the Bureau of Indian Standards (BIS)?

The **Bureau of Indian Standards (BIS)** is the National Standards Body of India under the *Ministry of Consumer Affairs, Food & Public Distribution*, established as a statutory corporate body by the **BIS Act, 2016**.

---

### 🏛️ Core Functions & Scheme Matrix:

| Key Function | Regulatory Mechanism | Primary Portal |
| :--- | :--- | :--- |
| **Standards Formulation** | Formulates 21,000+ published Indian Standards (**IS Codes**) across 15 engineering divisions | [\`standardsbis.bsbedge.com\`](https://standardsbis.bsbedge.com) |
| **Product Certification (ISI Mark)** | Mandatory & voluntary factory inspection and conformity audits (**Scheme-I**) | [\`manakonline.in\`](https://www.manakonline.in) |
| **Compulsory Registration (CRS)** | Self-declaration test report conformity for electronics & IT goods (**Scheme-II**) | [\`crsbis.in\`](https://www.crsbis.in) |
| **Gold & Silver Hallmarking** | Assaying and 6-digit laser **HUID** stamping for precious metal purity | [\`manakonline.in\`](https://www.manakonline.in) |
| **Market Surveillance & Enforcement** | Nationwide search & seizure raids and prosecution under **BIS Act Section 29** | [\`bis.gov.in\`](https://www.bis.gov.in) |

---

### ⚖️ Legal Enforcement Framework (BIS Act, 2016):
- **Section 16:** Empowers the Central Government to notify mandatory Quality Control Orders (QCOs) for public health and consumer safety.
- **Section 29:** Punishes anyone manufacturing, importing, or selling uncertified mandatory goods with fines up to **₹5,00,000** and up to **2 years imprisonment**.`;

    return {
      answer,
      sources: [{ is_number: 'BIS Act, 2016', title: 'Statutory Mandate of National Standards Body of India', category: 'General Governance' }],
    };
  }

  // ── 5. GENERAL CONCEPT: "QCO KYA HOTA HAI" / "WHAT IS A QUALITY CONTROL ORDER" ──
  if (
    q.includes('qco kya') || q.includes('what is qco') || q.includes('quality control order kya') ||
    q.includes('what is a quality control order') || q.includes('क्युसीओ क्या') || q.includes('क्वालिटी कंट्रोल ऑर्डर')
  ) {
    const answer = isHi
      ? `### 📜 क्वालिटी कंट्रोल ऑर्डर (QCO — Quality Control Order) क्या होता है?

**क्वालिटी कंट्रोल ऑर्डर (QCO)** भारत सरकार के विभिन्न मंत्रालयों (जैसे DPIIT, भारी उद्योग मंत्रालय, MeitY, इस्पात मंत्रालय) द्वारा **BIS अधिनियम, 2016 की धारा 16** के तहत जारी किया जाने वाला आधिकारिक **अनिवार्य सरकारी आदेश (Gazette Notification)** है।

---

### ⚖️ QCO का क्या अर्थ और प्रभाव होता है?
जब किसी उत्पाद पर **QCO लागू हो जाता है**, तो वह उत्पाद भारत में **बिना वैध BIS प्रमाणन (ISI मार्क या CRS) के बनाना, आयात (Import) करना, स्टोर करना या बेचना 100% संज्ञेय अपराध (Cognizable Offense)** बन जाता है।

| मुख्य बिंदु (Parameter) | विवरण (Statutory Details) |
| :--- | :--- |
| **वर्तमान में लागू QCOs** | **169+ QCOs** (350+ महत्वपूर्ण उपभोक्ता एवं औद्योगिक उत्पाद शामिल) |
| **प्रमुख उत्पाद श्रेणियां** | हेलमेट, प्रेशर कुकर, बच्चों के खिलौने, सीमेंट, TMT स्टील, बिजली के उपकरण, जूते, गैस चूल्हे |
| **उल्लंघन पर दंड (Section 29)** | **₹5,00,000 तक का जुर्माना + 2 वर्ष का कारावास** तथा माल की तत्काल जब्ती |
| **QCO का मुख्य उद्देश्य** | 1. घटिया विदेशी डंपिंग को रोकना<br>2. भारतीय नागरिकों की सुरक्षा सुनिश्चित करना<br>3. 'Make in India' की गुणवत्ता बढ़ाना |`
      : `### 📜 What is a Quality Control Order (QCO)?

A **Quality Control Order (QCO)** is a mandatory statutory regulation issued by Central Government Ministries (such as DPIIT, Ministry of Steel, MeitY) under **Section 16 of the BIS Act, 2016**.

---

### ⚖️ Statutory Implications of a QCO:
Once a product is notified under a mandatory QCO, it becomes **strictly illegal** to manufacture, import, distribute, store, or sell that product in India without holding a valid BIS license (ISI Mark or CRS registration).

| Parameter | Official Specification |
| :--- | :--- |
| **Mandatory QCOs in Force** | **169+ QCOs** covering **350+ product categories** |
| **Covered Goods** | Two-wheeler helmets, pressure cookers, toys, cement, TMT steel, household electricals, footwear, LPG stoves |
| **Legal Liabilities (Section 29)** | Fines up to **₹5,00,000**, imprisonment up to **2 years**, and immediate seizure of inventory |
| **Core Objectives** | Preventing substandard cheap foreign imports, guaranteeing citizen safety, and elevating Indian manufacturing standards |`;

    return {
      answer,
      sources: [{ is_number: 'BIS Act 2016 (Sec 16)', title: 'Quality Control Orders & Mandatory Conformity Mandate', category: 'Regulatory Orders' }],
    };
  }

  // ── 6. GENERAL CONCEPT: "ISI MARK KYA HAI" / "WHAT IS ISI MARK" ──
  if (
    q.includes('isi mark kya') || q.includes('what is isi mark') || q.includes('isi kya hota') ||
    q.includes('what is isi') || q.includes('isi मार्क क्या') || q.includes('isi mark full form')
  ) {
    const answer = isHi
      ? `### 🏷️ ISI मार्क (ISI Mark) क्या है?

**ISI मार्क (Indian Standards Institute Mark)** भारत में औद्योगिक एवं उपभोक्ता उत्पादों के लिए आधिकारिक **उत्पाद प्रमाणन चिह्न (Product Certification Mark)** है। यह इस बात की कानूनी गारंटी देता है कि उत्पाद संबंधित भारतीय मानक (IS Code) के 100% गुणवत्ता और सुरक्षा परीक्षणों पर खरा उतरा है।

---

### 🔍 असली ISI मार्क की 3-स्तरीय पहचान (Authentic Mark Anatomy):
एक प्रामाणिक ISI मार्क में 3 प्रमुख हिस्से अनिवार्य रूप से होने चाहिए:
1. **ऊपर (Top):** संबंधित भारतीय मानक संख्या — जैसे \`IS 4151\` (हेलमेट) या \`IS 2347\` (कुकर)
2. **बीच में (Middle):** मानक ISI ओवल लोगो (BIS Standard Mark)
3. **नीचे (Bottom):** 7 से 10 अंकों का विशिष्ट लाइसेंस नंबर — जैसे \`CM/L-7654321\`

---

### ⚠️ फेक (Fake) ISI मार्क की पहचान कैसे करें?
- **फेक मार्क:** केवल "ISI" लिखा होगा, लेकिन ऊपर IS कोड और नीचे **CM/L नंबर गायब** होगा।
- **सत्यापन:** **BIS CARE App** में जाकर 7-अंकों का CM/L नंबर डालकर तुरंत कंपनी का असली नाम और लाइसेंस की वैधता चेक की जा सकती है!`
      : `### 🏷️ What is the ISI Mark?

The **ISI Mark** is the official third-party **Product Certification Mark** issued by the Bureau of Indian Standards (**Scheme-I**). It certifies that an industrial or consumer product conforms strictly to the relevant Indian Standard (IS Code).

---

### 🔍 3-Component Structure of an Authentic ISI Mark:
1. **Top Header:** The Indian Standard number (e.g., \`IS 4151\` for helmets, \`IS 2347\` for cookers)
2. **Center Icon:** The registered geometric ISI monogram
3. **Bottom Footer:** The unique 7 to 10 digit license number (e.g., \`CM/L-7654321\`)

---

### 🚨 How to Spot Counterfeits:
- Uncertified manufacturers often print the ISI monogram without the mandatory \`CM/L-XXXXXXXXXX\` license code.
- Always verify the CM/L number on the official **BIS CARE app** or through [\`manakonline.in\`](https://www.manakonline.in) before purchasing!`;

    return {
      answer,
      sources: [{ is_number: 'BIS Scheme-I', title: 'Product Certification Scheme & Standard Mark Usage', category: 'Certification Marks' }],
    };
  }

  // ── 7. GENERAL CONCEPT: "HUID KYA HAI" / "WHAT IS HUID" ───────────
  if (
    q.includes('huid kya') || q.includes('what is huid') || q.includes('huid number kya') ||
    q.includes('hallmark unique identification') || q.includes('एचयूआईडी क्या')
  ) {
    const answer = isHi
      ? `### 🥇 गोल्ड हॉलमार्किंग में HUID क्या होता है?

**HUID (Hallmark Unique Identification)** सोने के आभूषणों पर लेजर द्वारा उकेरा जाने वाला **6-अंकों का विशिष्ट अल्फ़ान्यूमेरिक कोड** (जैसे \`AZ78K2\` या \`B9K4T1\`) होता है।

---

### 🔍 प्रामाणिक हॉलमार्क के 3 चिन्ह (3 Authentic Symbols):
1. **BIS त्रिकोण लोगो (BIS Triangle Emblem):** भारतीय मानक ब्यूरो का आधिकारिक प्रतीक
2. **शुद्धता कैरेट (Purity Karatage):** जैसे \`22K916\` (91.6% शुद्ध सोना), \`18K750\` (75% शुद्ध), \`14K585\` (58.5% शुद्ध)
3. **6-डिजिट लेजर HUID नंबर:** प्रत्येक आभूषण का अपना अलग और यूनिक कोड

---

### 📱 HUID कोड कैसे चेक करें?
1. अपने फोन में **BIS CARE App** खोलें।
2. **"Verify HUID"** विकल्प पर क्लिक करें और आभूषण पर छपा 6-डिजिट कोड डालें।
3. ऐप तुरंत **ज्वेलर का नाम, हॉलमार्किंग सेंटर का नाम (AHC), हॉलमार्किंग की तारीख और शुद्धता** दिखा देगा!`
      : `### 🥇 What is HUID in Gold Hallmarking?

**HUID (Hallmark Unique Identification)** is a unique **6-digit alphanumeric code** (e.g., \`AZ78K2\`) laser-engraved on every single article of gold jewellery at a BIS-recognized Assaying & Hallmarking Centre (AHC).

---

### 🔍 3-Symbol Structure of Genuine Gold Hallmarking (IS 1417):
1. **BIS Triangle Logo:** Official emblem of the Bureau of Indian Standards
2. **Purity & Karatage:** \`22K916\` (91.6% pure), \`18K750\` (75% pure), \`14K585\` (58.5% pure)
3. **6-Digit Laser HUID:** Unique national traceability identification code

---

### 📱 How to Verify HUID:
1. Open the **BIS CARE mobile app**.
2. Select **"Verify HUID"** and enter the 6-character alphanumeric code.
3. The app displays the **registered jeweller name, AHC centre, hallmarking date, and exact karat purity**!`;

    return {
      answer,
      sources: [{ is_number: 'IS 1417:2016', title: 'Gold & Gold Alloys Hallmarking & Traceability Guidelines', category: 'Precious Metals' }],
    };
  }

  // ── 8. PRODUCT-SPECIFIC RICH DOMAIN KNOWLEDGE ─────────────────────
  for (const topic of DOMAIN_KNOWLEDGE) {
    if (topic.keys.some(k => q.includes(k.toLowerCase()))) {
      return buildRichResponse(topic, role, lang);
    }
  }

  // ── 9. FEES & COSTING STRUCTURE ──────────────────────────────────
  if (q.includes('fee') || q.includes('fees') || q.includes('cost') || q.includes('kharcha') || q.includes('charges') || q.includes('पैसे') || q.includes('फीस')) {
    const answer = isHi
      ? `### 💰 भारतीय मानक ब्यूरो (BIS) — प्रमाणन शुल्क संरचना (Official Fee Structure)

BIS प्रमाणन का शुल्क पारदर्शी और सरकार द्वारा अधिसूचित नियमों के अनुसार तय होता है:

| शुल्क का प्रकार (Fee Head) | सामान्य उद्योग (Large Enterprises) | सूक्ष्म/लघु उद्योग (MSME / Startups) |
| :--- | :--- | :--- |
| **आवेदन शुल्क (Application Fee)** | ₹1,000 | ₹1,000 (गैर-वापसी योग्य) |
| **फैक्ट्री ऑडिट शुल्क (Inspection Fee)** | ₹7,000 प्रति मैन-डे + यात्रा व्यय | ₹7,000 प्रति मैन-डे + यात्रा व्यय |
| **वार्षिक लाइसेंस शुल्क (Annual Fee)** | ₹1,000 प्रति वर्ष | ₹1,000 प्रति वर्ष |
| **न्यूनतम मार्किंग शुल्क (Min Marking Fee)** | ₹20,000 – ₹1,00,000 (उत्पाद अनुसार) | **20% छूट (Concession)** सूक्ष्म उद्योगों के लिए |
| **महिला उद्यमी छूट (Women Entrepreneurs)** | — | **50% विशेष छूट** मार्किंग शुल्क पर |
| **लैब परीक्षण शुल्क (Testing Charges)** | NABL मान्यता प्राप्त लैब दर अनुसार | वास्तविक परीक्षण लागत अनुसार |

---

### 📌 भुगतान और प्रक्रिया (Payment Portal):
- सारा शुल्क केवल आधिकारिक पोर्टल [**\`manakonline.in\`**](https://www.manakonline.in) पर ऑनलाइन पेमेंट गेटवे (UPI/Netbanking/NEFT) के माध्यम से जमा होता है।
- किसी भी बिचौलिए (Agent) को नकद भुगतान न करें!`
      : `### 💰 Bureau of Indian Standards (BIS) — Official Fee Structure

BIS licensing costs are statutory and transparently notified under BIS (Conformity Assessment) Regulations:

| Fee Head | Standard Enterprise Rate | MSME / Startup Concession |
| :--- | :--- | :--- |
| **Application Fee** | ₹1,000 | ₹1,000 (Non-refundable) |
| **Factory Inspection Fee** | ₹7,000 per auditor per day | ₹7,000 per auditor per day |
| **Annual License Fee** | ₹1,000 per year | ₹1,000 per year |
| **Minimum Marking Fee** | ₹20,000 – ₹1,00,000 (per product) | **20% Concession** for Micro & Small units |
| **Women Entrepreneur Privilege** | Standard | **50% Special Concession** on marking fee |
| **Sample Testing Charges** | As per NABL test rates | Actual test parameters billed |

All payments must be submitted digitally through [\`manakonline.in\`](https://www.manakonline.in) (Scheme-I) or [\`crsbis.in\`](https://www.crsbis.in) (Scheme-II).`;

    return {
      answer,
      sources: [{ is_number: 'BIS (Conformity Assessment) Reg.', title: 'Statutory Fee Schedule and MSME Concessions', category: 'Finance & Licensing' }],
    };
  }

  // ── 10. COMPLAINT & GRIEVANCE REDRESSAL ───────────────────────────
  if (q.includes('complaint') || q.includes('grievance') || q.includes('shikayat') || q.includes('report') || q.includes('शिकायत') || q.includes('report fake')) {
    const answer = isHi
      ? `### 🚨 नकली ISI मार्क या घटिया उत्पाद की शिकायत कैसे दर्ज करें?

यदि आपको किसी दुकान, ऑनलाइन सेलर, या निर्माता द्वारा **नकली ISI मार्क**, बिना हॉलमार्क का सोना, या घटिया गुणवत्ता वाला सामान बेचा गया है, तो आप 4 तरीकों से तुरंत शिकायत दर्ज कर सकते हैं:

| शिकायत का माध्यम | प्रक्रिया / संपर्क विवरण | समय सीमा (Timeline) |
| :--- | :--- | :--- |
| **1. BIS CARE Mobile App (सबसे तेज़)** | ऐप में **"Complaints"** सेक्शन खोलें ➡️ फोटो व बिल अपलोड करें ➡️ तुरंत डॉकेट नंबर प्राप्त करें | 48 घंटे में जांच शुरू |
| **2. ऑनलाइन ग्रीवेंस पोर्टल** | [\`bis.gov.in\`](https://www.bis.gov.in) पर "Consumer Grievance" लिंक या [\`pgportal.gov.in\`](https://pgportal.gov.in) | आधिकारिक ट्रैकिंग उपलब्ध |
| **3. ईमेल द्वारा** | \`complaints@bis.gov.in\` पर सबूत और विक्रेता का पूरा पता भेजें | 7 कार्यदिवस |
| **4. राष्ट्रीय टोल-फ्री हेल्पलाइन** | **\`1800-11-0123\`** (सोमवार से शुक्रवार, 9:00 AM – 5:30 PM) | तत्काल कॉल रजिस्ट्रेशन |

---

⚖️ **कानूनी कार्रवाई:** शिकायत सही पाए जाने पर BIS प्रवर्तन अधिकारी पुलिस के साथ मिलकर दुकान/कारखाने पर छापा मारते हैं और **धारा 29** के तहत माल जब्त कर कानूनी मुकदमा दर्ज करते हैं!`
      : `### 🚨 How to File a Complaint Against Fake ISI Marks or Defective Goods

Under the BIS Act, 2016, selling uncertified mandatory products or forging the ISI mark is a cognizable criminal offense. Citizens can lodge grievances through:

| Channel | Procedure | Expected Action Timeline |
| :--- | :--- | :--- |
| **1. BIS CARE Mobile App** | Open App ➡️ Select "Grievances" ➡️ Attach product photo & vendor invoice ➡️ Get Docket ID | Investigation initiated in 48 hours |
| **2. National Portal** | Visit [\`bis.gov.in\`](https://www.bis.gov.in) (Public Grievance cell) or [\`pgportal.gov.in\`](https://pgportal.gov.in) | Trackable status dossier |
| **3. Dedicated Email** | Write with location and evidence to \`complaints@bis.gov.in\` | Verified within 7 business days |
| **4. National Toll-Free Helpline** | Call **\`1800-11-0123\`** (Toll-Free, 9:00 AM – 5:30 PM IST) | Instant registration |

BIS enforcement teams conduct surprise raids with local law enforcement, seize fraudulent stock, and prosecute violators under Section 29.`;

    return {
      answer,
      sources: [{ is_number: 'BIS Act, 2016 (Sec 29)', title: 'Consumer Protection & Enforcement Mechanism', category: 'Citizen Grievance' }],
    };
  }

  // ── 11. GENERAL SCHEME OR LAW QUERY ───────────────────────────────
  if (q.includes('scheme') || q.includes('isi') || q.includes('crs') || q.includes('fmcs') || q.includes('certification') || q.includes('apply')) {
    const answer = `### 🏛️ Bureau of Indian Standards (BIS) — Certification Schemes Comparison

Here is an overview of all major BIS conformity assessment schemes:

| Scheme Name | Target Products | Audit Type | Standard Mark Format | Processing Portal |
| :--- | :--- | :--- | :--- | :--- |
| **Scheme-I (ISI Mark)** | Helmets, Cookers, Steel, Cement, Toys, Cables, Appliances | **Factory Inspection + Lab Testing** | Standard ISI Logo + \`CM/L-XXXXXXXXXX\` | [\`manakonline.in\`](https://www.manakonline.in) |
| **Scheme-II (CRS)** | Electronics, IT Goods, Mobile Chargers, Laptops, LED Lights | **Lab Testing Only (No Factory Audit)** | CRS Border Logo + \`R-XXXXXXXX\` | [\`crsbis.in\`](https://www.crsbis.in) |
| **Scheme-IV (FMCS)** | Overseas Manufacturers exporting to India | **Special Factory Inspection Overseas** | ISI Mark + \`CM/L-XXXXXXXXXX\` | [\`manakonline.in\`](https://www.manakonline.in) |
| **Hallmarking** | Gold Jewellery, Gold Coins, Silver Articles | **Assaying & Laser Stamping (AHC)** | BIS Triangle + Purity + \`6-digit HUID\` | [\`manakonline.in\`](https://www.manakonline.in) |

---

### ⚖️ Legal Framework & Enforcement (BIS Act, 2016):
- **Section 14 & 15:** Empowers the Central Government to notify mandatory Quality Control Orders (QCOs) for public health, safety, and national security.
- **Section 29:** Imposes heavy penalties on anyone manufacturing or selling uncertified goods under mandatory QCOs:
  - **Fines:** Up to **₹5,00,000** for first offense, or up to 10x value of goods.
  - **Imprisonment:** Up to **2 years**.
  - **Seizure:** Immediate confiscation of non-compliant inventory by BIS enforcement officers.

What specific product standard or licensing requirement would you like to explore?`;

    return {
      answer,
      sources: [{ is_number: 'BIS Act, 2016', title: 'Conformity Assessment Schemes and Regulations', category: 'General Governance' }],
    };
  }

  return null;
}

