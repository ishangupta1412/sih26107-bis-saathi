// BIS Standards seed data — 4 confirmed categories
// Sources: bis.gov.in, verified August 2026

export interface Standard {
  is_number: string;
  title: string;
  category: string;
  scheme_type: 'ISI' | 'CRS' | 'FMCS' | 'Hallmarking';
  plain_summary: string;
  source_url: string;
}

export interface StandardChunk {
  standard_is_number: string; // FK reference
  content: string;
}

export const STANDARDS: Standard[] = [
  {
    is_number: 'IS 4151:2015',
    title: 'Protective Helmets for Two-Wheeler Motor Vehicle Riders',
    category: 'Helmets',
    scheme_type: 'ISI',
    plain_summary:
      'IS 4151:2015 specifies safety requirements for helmets worn by riders of two-wheeled motor vehicles. Certification is mandatory under the Helmet for Riders of Two-Wheeler Motor Vehicles (Quality Control) Order, 2020. Helmets must carry the ISI Mark (BIS Standard Mark) along with a CM/L license number. The standard covers impact absorption, penetration resistance, chin strap retention, shell rigidity, and visor quality. It is illegal to manufacture, import, or sell non-ISI certified helmets in India. Penalties for violation include fines up to ₹5 lakh and imprisonment up to 2 years.',
    source_url: 'https://www.bis.gov.in',
  },
  {
    is_number: 'IS 302-1:2024',
    title: 'Safety of Household, Commercial and Similar Electrical Appliances — Part 1: General Requirements',
    category: 'Household Electrical Appliances',
    scheme_type: 'ISI',
    plain_summary:
      'IS 302 (Part 1):2024 specifies general safety requirements for household and similar electrical appliances with rated voltages not exceeding 250V for single-phase and 480V for other appliances. This standard is aligned with IEC 60335-1:2020. Certification is mandatory under the Safety of Household, Commercial and Similar Electrical Appliances (Quality Control) Order, 2026, effective October 1, 2026. Manufacturers must obtain ISI Mark certification (Scheme I) through factory inspection, lab testing at NABL-accredited laboratories, and quality system audit. Products covered include electric kettles, irons, fans, heaters, mixers, and similar appliances.',
    source_url: 'https://www.bis.gov.in',
  },
  {
    is_number: 'IS 9873-1:2019',
    title: 'Safety of Toys — Part 1: Safety Aspects Related to Mechanical and Physical Properties',
    category: 'Toys',
    scheme_type: 'ISI',
    plain_summary:
      'IS 9873 (Part 1):2019 specifies mechanical and physical safety requirements for toys intended for children under 14 years of age. Certification is mandatory under the Toys (Quality Control) Order, 2020. All toys sold in India must carry the ISI Mark with a CM/L license number. Electric toys must additionally comply with IS 15644. The standard covers hazards related to sharp edges, small parts, projectiles, cords, and structural integrity. The 2019 version has been updated (2025 version exists); confirm the exact version required with BIS at the time of application.',
    source_url: 'https://www.bis.gov.in',
  },
  {
    is_number: 'CRS (IS 16333 / IS 13252)',
    title: 'Compulsory Registration Scheme — LED Lighting and Electronic Power Adapters/Chargers',
    category: 'LED Lighting & Chargers',
    scheme_type: 'CRS',
    plain_summary:
      'LED lighting products (including LED modules, LED luminaires, and LED drivers) and electronic power adapters/chargers fall under the BIS Compulsory Registration Scheme (CRS), administered under the Electronics and IT Goods (Requirements for Compulsory Registration) Order. Unlike ISI Mark (which requires factory inspection), CRS requires only product testing at a BIS-recognized NABL-accredited laboratory and online registration at crsbis.in. No factory visit is required. Products display the BIS Standard Mark along with an R-XXXXXXXX registration number. The typical timeline is 3–5 weeks from test report submission.',
    source_url: 'https://www.crsbis.in',
  },
];

export const STANDARD_CHUNKS: StandardChunk[] = [
  // IS 4151 — Helmets
  {
    standard_is_number: 'IS 4151:2015',
    content:
      'IS 4151:2015 covers protective helmets for riders of two-wheeled motor vehicles in India. The Helmet for Riders of Two-Wheeler Motor Vehicles (Quality Control) Order, 2020 makes this standard mandatory. Any helmet sold in India for two-wheeler use must carry the ISI Mark issued by BIS.',
  },
  {
    standard_is_number: 'IS 4151:2015',
    content:
      'The ISI Mark certification process for helmets (IS 4151) involves: (1) submitting an application on manakonline.in, (2) product testing at a BIS-recognized laboratory, (3) factory inspection by BIS officers, (4) grant of a CM/L license number. The typical timeline is 3–4 months. Manufacturers need to maintain a Quality Control System at their factory.',
  },
  {
    standard_is_number: 'IS 4151:2015',
    content:
      'IS 4151:2015 tests helmets for: impact absorption (shock absorption of the shell), penetration resistance (sharp object test), retention system strength (chin strap pull test), shell rigidity, and visor optical quality if applicable. Helmets failing any of these tests cannot receive the ISI Mark.',
  },
  {
    standard_is_number: 'IS 4151:2015',
    content:
      'Selling, manufacturing, or importing helmets without the ISI Mark (IS 4151) in India is a criminal offense. Penalties under the BIS Act, 2016 include fines up to ₹5 lakh and imprisonment up to 2 years for first-time offenses. Repeat offenses carry higher penalties. Consumers should check for the ISI Mark + CM/L number before buying a helmet.',
  },
  {
    standard_is_number: 'IS 4151:2015',
    content:
      'To verify whether a helmet\'s ISI Mark is genuine, look for the CM/L license number printed near the ISI Mark. You can check this number on the BIS CARE app or at bis.gov.in. The format is CM/L followed by 7–10 digits (e.g., CM/L-7654321). If the number is not found, the mark may be fake — report it to BIS at complaints@bis.gov.in.',
  },

  // IS 302 — Household Electrical Appliances
  {
    standard_is_number: 'IS 302-1:2024',
    content:
      'IS 302 (Part 1):2024 is the Indian Standard for safety of household and similar electrical appliances — general requirements. It applies to appliances like electric kettles, irons, heaters, fans, and mixers with rated voltages up to 250V (single-phase). The standard is aligned with the international standard IEC 60335-1:2020.',
  },
  {
    standard_is_number: 'IS 302-1:2024',
    content:
      'The Safety of Household, Commercial and Similar Electrical Appliances (Quality Control) Order, 2026 makes ISI Mark certification under IS 302 mandatory effective October 1, 2026. Manufacturers must apply through manakonline.in. The certification process (Scheme I) includes product testing at NABL-accredited labs, factory inspection, and quality audit.',
  },
  {
    standard_is_number: 'IS 302-1:2024',
    content:
      'ISI Mark certification for household electrical appliances (IS 302) steps: (1) Apply on manakonline.in with product details and test reports. (2) BIS reviews the application and may ask for additional documents. (3) Factory inspection by BIS officers. (4) If satisfactory, CM/L license is granted. (5) Manufacturer marks products with ISI Mark + CM/L number. Timeline: approximately 3–4 months.',
  },
  {
    standard_is_number: 'IS 302-1:2024',
    content:
      'IS 302 has multiple parts — Part 1 covers general requirements (applicable to all appliances), while Part 2 has specific requirements for individual appliance types (e.g., Part 2-1 for vacuum cleaners, Part 2-3 for electric irons, Part 2-9 for grills and toasters). A manufacturer making electric irons must comply with both IS 302-1 and IS 302-2-3.',
  },

  // IS 9873 — Toys
  {
    standard_is_number: 'IS 9873-1:2019',
    content:
      'IS 9873 (Part 1):2019 specifies mechanical and physical safety requirements for toys for children under 14 years. The Toys (Quality Control) Order, 2020 makes this standard mandatory. All toys (including board games, stuffed toys, bicycles for children, and construction toys) must carry the ISI Mark.',
  },
  {
    standard_is_number: 'IS 9873-1:2019',
    content:
      'Electric and electronic toys must comply with both IS 9873 (Part 1) for mechanical safety AND IS 15644 for electrical safety. Manufacturers of battery-operated toys, remote-controlled toys, and toys with electronic components need to test for both standards before applying for the ISI Mark.',
  },
  {
    standard_is_number: 'IS 9873-1:2019',
    content:
      'ISI Mark certification for toys (IS 9873) involves: (1) Selecting a BIS-recognized test laboratory, (2) Submitting toy samples for testing, (3) Applying on manakonline.in with test reports, (4) Factory inspection by BIS officers, (5) Surveillance testing (random samples from the market periodically). Timeline: 3–4 months. BIS can suspend or cancel the license if surveillance tests fail.',
  },
  {
    standard_is_number: 'IS 9873-1:2019',
    content:
      'Toys without the ISI Mark (IS 9873) cannot be legally sold in India since 2021. This includes imported toys — foreign manufacturers must also obtain BIS certification (under FMCS — Foreign Manufacturers Certification Scheme) or appoint an Authorized Indian Representative (AIR) to hold the license on their behalf.',
  },

  // CRS — LED & Chargers
  {
    standard_is_number: 'CRS (IS 16333 / IS 13252)',
    content:
      'The BIS Compulsory Registration Scheme (CRS) covers electronics and IT products including LED lighting (LED modules, LED luminaires, LED drivers, LED lamps) and power adapters/chargers. Unlike the ISI Mark scheme, CRS does NOT require factory inspection — only lab testing at a BIS-recognized NABL-accredited laboratory and online registration at crsbis.in.',
  },
  {
    standard_is_number: 'CRS (IS 16333 / IS 13252)',
    content:
      'CRS registration steps for LED products or chargers: (1) Get product tested at a BIS-recognized NABL lab. (2) Create an account on crsbis.in. (3) Submit application with test report, product details, and factory details. (4) BIS reviews and grants registration. (5) Display BIS Standard Mark + R-XXXXXXXX registration number on product and packaging. Timeline: 3–5 weeks.',
  },
  {
    standard_is_number: 'CRS (IS 16333 / IS 13252)',
    content:
      'CRS registration numbers follow the format R-XXXXXXXX (R- followed by 8 digits, e.g., R-41012345). Consumers can verify a CRS registration number on the BIS CARE app or at bis.gov.in by searching for the R-number. If a charger or LED product claims BIS certification but has no R-number on the packaging, the mark may be fake.',
  },
  {
    standard_is_number: 'CRS (IS 16333 / IS 13252)',
    content:
      'The key difference between ISI Mark (Scheme I) and CRS (Scheme II): ISI Mark requires factory inspection and is used for higher-risk products like helmets, appliances, toys, cement, and steel. CRS is used for electronics/IT products, requires only lab testing (no factory visit), and has a faster registration timeline (3–5 weeks vs 3–4 months for ISI). A manufacturer making both a toy and a charger would need ISI for the toy and CRS for the charger — these are two separate certification pathways.',
  },

  // General BIS / cross-cutting
  {
    standard_is_number: 'IS 4151:2015',
    content:
      'BIS certification scheme comparison: ISI Mark (Scheme I) — for domestic manufacturers of high-risk products, includes factory inspection, 3–4 months. CRS (Scheme II) — for electronics and IT, lab-test only, no factory visit, 3–5 weeks. FMCS (Foreign Manufacturers) — same as ISI but for foreign companies, requires an Authorized Indian Representative (AIR) in India, longer timeline. Hallmarking — only for gold and silver jewellery (IS 1417 for gold, IS 2112 for silver), uses HUID numbers.',
  },
];
