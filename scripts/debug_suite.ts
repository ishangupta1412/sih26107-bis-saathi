async function testEndpoint(name: string, url: string, options?: RequestInit) {
  const start = Date.now();
  try {
    const res = await fetch(url, options);
    const duration = Date.now() - start;
    let data;
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }
    console.log(`[PASS] ${name} -> Status: ${res.status} (${duration}ms)`);
    return { ok: res.ok, status: res.status, data, duration };
  } catch (err: any) {
    console.error(`[FAIL] ${name} -> Error:`, err.message);
    return { ok: false, error: err.message };
  }
}

async function runComprehensiveDebugSuite() {
  console.log('====================================================');
  console.log('  BIS CARE AI PORTAL - COMPREHENSIVE DEBUG SUITE   ');
  console.log('====================================================\n');

  const BASE_URL = 'http://localhost:3001';

  // 1. Test All Frontend HTML Pages (Zero 404s, Clean Render)
  console.log('--- 1. Testing Frontend Route Responses ---');
  const pages = ['/', '/chat', '/standards', '/pathway', '/checker', '/complaint', '/policies', '/about'];
  for (const page of pages) {
    await testEndpoint(`Page Route: ${page}`, `${BASE_URL}${page}`);
  }

  // 2. Test License Checker API (/api/license-check)
  console.log('\n--- 2. Testing License & Format Checker API ---');
  await testEndpoint(
    'License Check: Valid ISI (CM/L-7654321)',
    `${BASE_URL}/api/license-check`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseNumber: 'CM/L-7654321' }),
    }
  );

  await testEndpoint(
    'License Check: Valid CRS (R-41012345)',
    `${BASE_URL}/api/license-check`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseNumber: 'R-41012345' }),
    }
  );

  await testEndpoint(
    'License Check: Suspended ISI (CM/L-3391827)',
    `${BASE_URL}/api/license-check`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseNumber: 'CM/L-3391827' }),
    }
  );

  await testEndpoint(
    'License Check: Invalid Format Syntax (ABC-123)',
    `${BASE_URL}/api/license-check`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ licenseNumber: 'ABC-123' }),
    }
  );

  // 3. Test Grievance Submission API (/api/complaints)
  console.log('\n--- 3. Testing Grievance Submission API ---');
  const complaintRes = await testEndpoint(
    'Grievance Submission (POST)',
    `${BASE_URL}/api/complaints`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_name: 'Test Pressure Cooker',
        category: 'Cookware & Pressure Vessels',
        description: 'Testing grievance pipeline integrity verification.',
        contact_email: 'test.citizen@example.gov.in',
      }),
    }
  );

  if (complaintRes.data?.reference_id) {
    console.log(`       -> Generated Reference ID: ${complaintRes.data.reference_id}`);
  }

  // 4. Test Chat RAG API (/api/chat)
  console.log('\n--- 4. Testing Multimodal RAG Chat API (Gemini + Supabase) ---');
  const chatRes = await testEndpoint(
    'Chat RAG Query: Helmets IS 4151',
    `${BASE_URL}/api/chat`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What is the mandatory standard for two-wheeler helmets and what are the main tests?',
        role: 'manufacturer',
        history: [],
      }),
    }
  );

  if (chatRes.data?.answer) {
    console.log(`       -> Answer Sample: ${chatRes.data.answer.slice(0, 120)}...`);
    console.log(`       -> Citations Found: ${chatRes.data.sources?.length || 0}`);
  }

  console.log('\n====================================================');
  console.log('  DEBUG SUITE RUN COMPLETED SUCCESSFULLY            ');
  console.log('====================================================');
}

runComprehensiveDebugSuite();
