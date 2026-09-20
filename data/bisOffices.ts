export interface BisOffice {
  name: string;
  type: 'HQ' | 'Regional' | 'Branch';
  state: string;
  city: string;
  address: string;
  phone: string;
  email: string;
}

export const BIS_OFFICES: BisOffice[] = [
  {
    name: "BIS Headquarters",
    type: "HQ",
    state: "Delhi",
    city: "New Delhi",
    address: "9 Bahadur Shah Zafar Marg, New Delhi-110002",
    phone: "011-23230131",
    email: "info@bis.gov.in"
  },
  {
    name: "Central Regional Office",
    type: "Regional",
    state: "Delhi",
    city: "New Delhi",
    address: "601/A, Konnectus Tower-1, 6th Floor, DMRC Building, Bhavbhuti Marg, New Delhi-110002",
    phone: "011-23237401",
    email: "ddgc@bis.gov.in"
  },
  {
    name: "Eastern Regional Office",
    type: "Regional",
    state: "West Bengal",
    city: "Kolkata",
    address: "8th Floor, Plot No. 7/7 & 7/8, CP Block, Sector V, Salt Lake, Kolkata-700091",
    phone: "033-23670012",
    email: "ddge@bis.gov.in"
  },
  {
    name: "Northern Regional Office",
    type: "Regional",
    state: "Chandigarh",
    city: "Chandigarh",
    address: "Plot No. 4-A, Sector 27-B, Madhya Marg, Chandigarh-160019",
    phone: "0172-2659930",
    email: "ddgn@bis.gov.in"
  },
  {
    name: "Southern Regional Office",
    type: "Regional",
    state: "Tamil Nadu",
    city: "Chennai",
    address: "C.I.T. Campus, IV Cross Road, Chennai-600113",
    phone: "044-22542365",
    email: "ddgs@bis.gov.in"
  },
  {
    name: "Western Regional Office",
    type: "Regional",
    state: "Maharashtra",
    city: "Mumbai",
    address: "5th Floor, MTNL CETTM Technology Street, Hiranandani Gardens, Powai, Mumbai-400076",
    phone: "022-25702716",
    email: "ddgw@bis.gov.in"
  },
  {
    name: "Bhopal Branch Office",
    type: "Branch",
    state: "Madhya Pradesh",
    city: "Bhopal",
    address: "Manakalya, Opp. Dushera Maidan, E-5 Area Colony, Bittan Market, Bhopal-462016",
    phone: "0755-2423453",
    email: "hbpbo@bis.gov.in"
  },
  {
    name: "Ghaziabad Branch Office",
    type: "Branch",
    state: "Uttar Pradesh",
    city: "Ghaziabad",
    address: "Plot No. 20/9, Site IV, Sahibabad Industrial Area, Sahibabad-201010",
    phone: "0120-2771092",
    email: "hgzbo@bis.gov.in"
  },
  {
    name: "Faridabad Branch Office",
    type: "Branch",
    state: "Haryana",
    city: "Faridabad",
    address: "SCO 21, Sector 12, Faridabad-121007",
    phone: "0129-2292173",
    email: "hfrbo@bis.gov.in"
  },
  {
    name: "Jaipur Branch Office",
    type: "Branch",
    state: "Rajasthan",
    city: "Jaipur",
    address: "Ground Floor, Prithvi Raj Road, Opp. Bharat Overseas Bank Ltd, C-Scheme, Jaipur-302001",
    phone: "0141-2223286",
    email: "hjpbo@bis.gov.in"
  },
  {
    name: "Delhi Branch Office (DLBO-I)",
    type: "Branch",
    state: "Delhi",
    city: "New Delhi",
    address: "601/A, Konnectus Tower-1, 6th Floor, DMRC Building, Bhavbhuti Marg, New Delhi-110002",
    phone: "011-23237401",
    email: "hdlbo1@bis.gov.in"
  },
  {
    name: "Lucknow Branch Office",
    type: "Branch",
    state: "Uttar Pradesh",
    city: "Lucknow",
    address: "Regional Telecom Training Centre, BSNL Building, Sector-G, LDA Colony, Ashiana, Lucknow-226012",
    phone: "0522-2728808",
    email: "hlkbo@bis.gov.in"
  },
  {
    name: "Noida Branch Office",
    type: "Branch",
    state: "Uttar Pradesh",
    city: "Noida",
    address: "NITS Campus, A-20 & 21, Institutional Area, Sector-62, Noida-201309",
    phone: "0120-2979004",
    email: "hnobo-bis@bis.gov.in"
  },
  {
    name: "Jammu & Kashmir Branch Office",
    type: "Branch",
    state: "Jammu and Kashmir",
    city: "Jammu",
    address: "Lane No. 4, SIDCO Industrial Complex, Bari Brahmana, Jammu-181133",
    phone: "01923-222690",
    email: "hjkbo@bis.gov.in"
  },
  {
    name: "Chandigarh Branch Office",
    type: "Branch",
    state: "Chandigarh",
    city: "Chandigarh",
    address: "Northern Regional Office, Plot No. 4-A, Sector 27-B, Madhya Marg, Chandigarh-160019",
    phone: "0172-2997494",
    email: "hchbo1@bis.gov.in"
  },
  {
    name: "Patna Branch Office",
    type: "Branch",
    state: "Bihar",
    city: "Patna",
    address: "Patliputra Industrial Estate, Patna-800013",
    phone: "0612-2275342",
    email: "hptbo@bis.gov.in"
  },
  {
    name: "Bhubaneswar Branch Office",
    type: "Branch",
    state: "Odisha",
    city: "Bhubaneswar",
    address: "6th Floor, Gruha Nirman Bhawan (OSHB Building), Sachivalaya Marg, Bhubaneswar-751001",
    phone: "0674-2390847",
    email: "hbhbo@bis.gov.in"
  },
  {
    name: "Guwahati Branch Office",
    type: "Branch",
    state: "Assam",
    city: "Guwahati",
    address: "2nd Floor, West End Block, HOUSEFED Building Complex, Last Gate, Dispur, Guwahati-781006",
    phone: "0361-2226508",
    email: "hghbo@bis.gov.in"
  },
  {
    name: "Kolkata Branch Office",
    type: "Branch",
    state: "West Bengal",
    city: "Kolkata",
    address: "7th Floor, Plot No. 7/7 & 7/8, CP Block, Sector V, Salt Lake, Kolkata-700091",
    phone: "033-23670017",
    email: "hkkbo@bis.gov.in"
  },
  {
    name: "Raipur Branch Office",
    type: "Branch",
    state: "Chhattisgarh",
    city: "Raipur",
    address: "Manakalaya, Plot No. 13-C, Sector-24, Nava Raipur – Atal Nagar-492101",
    phone: "0771-2412236",
    email: "hrpbo@bis.gov.in"
  },
  {
    name: "Jamshedpur Branch Office",
    type: "Branch",
    state: "Jharkhand",
    city: "Jamshedpur",
    address: "55 and 57, M Road, Bistupur, Jamshedpur-831001",
    phone: "9891830363",
    email: "hjdbo@bis.gov.in"
  },
  {
    name: "Bengaluru Branch Office",
    type: "Branch",
    state: "Karnataka",
    city: "Bengaluru",
    address: "Peenya Industrial Area, 1st Stage, Bengaluru-Tumkur Road, Bengaluru-560058",
    phone: "080-28395604",
    email: "hbnbo@bis.gov.in"
  },
  {
    name: "Hubli Branch Office",
    type: "Branch",
    state: "Karnataka",
    city: "Hubli",
    address: "1st Floor, KSFC Building, Hubli-Dharwad Highway, Rayapur, Dharwad-580009",
    phone: "0836-2957898",
    email: "hubo@bis.gov.in"
  },
  {
    name: "Hyderabad Branch Office",
    type: "Branch",
    state: "Telangana",
    city: "Hyderabad",
    address: "Plot No. 1, Sy No. 367/1, Industrial Development Park, Moula Ali, Hyderabad-500040",
    phone: "040-27173200",
    email: "hhybo@bis.gov.in"
  },
  {
    name: "Coimbatore Branch Office",
    type: "Branch",
    state: "Tamil Nadu",
    city: "Coimbatore",
    address: "5th Floor, Kovai Towers, 44 Bala Sundaram Road, Coimbatore-641018",
    phone: "0422-2248892",
    email: "hctbo@bis.gov.in"
  },
  {
    name: "Chennai Branch Office",
    type: "Branch",
    state: "Tamil Nadu",
    city: "Chennai",
    address: "C.I.T. Campus, IV Cross Road, Taramani, Chennai-600113",
    phone: "044-22541220",
    email: "cnbo@bis.gov.in"
  },
  {
    name: "Madurai Branch Office",
    type: "Branch",
    state: "Tamil Nadu",
    city: "Madurai",
    address: "First Floor, SIDCO Centre of Excellence, Women Industrial Park, Thoppur, Kappalur, Madurai-625008",
    phone: "0452-2910334",
    email: "hmdbo-bis@bis.gov.in"
  },
  {
    name: "Kochi Branch Office",
    type: "Branch",
    state: "Kerala",
    city: "Kochi",
    address: "II Floor, Central Warehousing Corporation Office Complex, Maveli Road, Gandhi Nagar, Kadavanthara, Kochi-682020",
    phone: "0484-2207066",
    email: "hkobo@bis.gov.in"
  },
  {
    name: "Vijayawada Branch Office",
    type: "Branch",
    state: "Andhra Pradesh",
    city: "Vijayawada",
    address: "First Floor, 56-2-11, AP MARKFED Building, APIIC Colony, Jawahar Auto Nagar, Vijayawada-520007",
    phone: "0866-3501605",
    email: "hvjbo@bis.gov.in"
  },
  {
    name: "Ahmedabad Branch Office",
    type: "Branch",
    state: "Gujarat",
    city: "Ahmedabad",
    address: "3rd Floor, Navajivan Amrut Jayanti Bhavan, Behind Gujarat Vidyapith, Off Ashram Road, Ahmedabad-380014",
    phone: "079-27540314",
    email: "hahbo@bis.gov.in"
  },
  {
    name: "Surat Branch Office",
    type: "Branch",
    state: "Gujarat",
    city: "Surat",
    address: "First Floor, Doorsanchar Bhavan, Karimabad Admin Building, Ghod Dod Road, Surat-395001",
    phone: "0261-2990071",
    email: "headsubo@bis.gov.in"
  },
  {
    name: "Rajkot Branch Office",
    type: "Branch",
    state: "Gujarat",
    city: "Rajkot",
    address: "F P No. 364/P, Ward No. 13, Opp. Crystal Mall, Next to Bharat Petrol Pump, Kalawad Road, Rajkot-360005",
    phone: "0281-2563978",
    email: "hrjbo@bis.gov.in"
  },
  {
    name: "Pune Branch Office",
    type: "Branch",
    state: "Maharashtra",
    city: "Pune",
    address: "657-660, MIDC Building, Market Yard, Gultekdi, Pune-411037",
    phone: "020-24264911",
    email: "hpnbo@bis.gov.in"
  },
  {
    name: "Nagpur Branch Office",
    type: "Branch",
    state: "Maharashtra",
    city: "Nagpur",
    address: "Indian Bureau of Mines, Block A & D, 8th Floor, Indira Bhavan, Civil Lines, Nagpur-440001",
    phone: "0712-2540807",
    email: "hngbo@bis.gov.in"
  },
  {
    name: "Mumbai Branch Office",
    type: "Branch",
    state: "Maharashtra",
    city: "Mumbai",
    address: "5th Floor, MTNL CETTM Technology Street, Hiranandani Gardens, Powai, Mumbai-400076",
    phone: "022-25702721",
    email: "hmubo1@bis.gov.in"
  }
];

/**
 * Derives unique sorted list of states from the dataset.
 */
export function getUniqueStates(): string[] {
  const states = Array.from(new Set(BIS_OFFICES.map((o) => o.state)));
  return states.sort((a, b) => a.localeCompare(b));
}

/**
 * Normalizes phone numbers for standard tel: links (tel:+91 prefix).
 */
export function formatPhoneForDialing(phone: string): string {
  if (!phone || !phone.trim()) return '';
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';

  // If starts with leading 0 (STD code), strip it and add tel:+91
  if (digits.startsWith('0')) {
    return `tel:+91${digits.slice(1)}`;
  }

  // If 10-digit mobile number or standard number
  return `tel:+91${digits}`;
}
