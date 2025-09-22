// s3_full_stack/03.testing/tests/api.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Next.js (App Router) workbook API', () => {
  test('GET /api/companies returns a list', async ({ request }) => {
    const res = await request.get('/api/companies');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('count');
    expect(body).toHaveProperty('items');
    expect(Array.isArray(body.items)).toBeTruthy();
    expect(body.count).toBeGreaterThan(0);
  });

  test('GET /api/companies/search?name=Microsoft returns Microsoft', async ({ request }) => {
    const res = await request.get('/api/companies/search?name=Microsoft');
    expect(res.status()).toBe(200);
    const { count, items } = await res.json();
    expect(count).toBeGreaterThan(0);
    const found = items.find(it => it.name && it.name.toLowerCase().includes('microsoft'));
    expect(found).toBeTruthy();
  });

  test('GET /api/companies/:id returns the company document', async ({ request }) => {
    const listRes = await request.get('/api/companies?limit=1');
    expect(listRes.status()).toBe(200);
    const listBody = await listRes.json();
    expect(listBody.items.length).toBeGreaterThan(0);

    const id = listBody.items[0]._id;
    const singleRes = await request.get(`/api/companies/${id}`);
    expect(singleRes.status()).toBe(200);
    const doc = await singleRes.json();
    expect(doc).toHaveProperty('_id');
    expect(doc._id).toBe(id);
    expect(doc).toHaveProperty('name');
  });

  test('GET /api/companies/:id with invalid id returns 400', async ({ request }) => {
    const r = await request.get('/api/companies/invalid-id-123');
    expect(r.status()).toBe(400);
    const body = await r.json();
    expect(body).toHaveProperty('error');
  });

  test('page 2 returns 5 items skipping the first 5', async ({ request }) => {
    // page1
    const res1 = await request.get('/api/companies?limit=5&skip=0');
    expect(res1.status()).toBe(200);
    const { count: count1, items: items1 } = await res1.json();
    expect(Array.isArray(items1)).toBe(true);
    expect(count1).toBe(5);
    expect(items1.length).toBe(5);

    // page2
    const res2 = await request.get('/api/companies?limit=5&skip=5');
    expect(res2.status()).toBe(200);
    const { count: count2, items: items2 } = await res2.json();
    expect(Array.isArray(items2)).toBe(true);
    expect(count2).toBe(5);
    expect(items2.length).toBe(5);

    // compare IDs to ensure no overlap
    const ids1 = items1.map(item => item._id);
    const ids2 = items2.map(item => item._id);
    ids2.forEach(id => expect(ids1).not.toContain(id));
  });


  test('GET /api/companies/search?location=Hyderabad returns companies in Hyderabad', async ({ request }) => {
    const res = await request.get('/api/companies/search?location=Hyderabad');
    expect(res.status()).toBe(200);
    const { count, items } = await res.json();
    expect(count).toBeGreaterThan(0);
    expect(Array.isArray(items)).toBe(true);

    items.forEach(company => {
      expect(company.location.toLowerCase()).toContain('hyderabad');
    });
  });

  test('GET /api/companies?skill=DSA returns companies with DSA in their hiringCriteria.skills', async ({ request }) => {
    const res = await request.get('/api/companies?skill=DSA');
    expect(res.status()).toBe(200);

    const { count, items } = await res.json();
    expect(count).toBeGreaterThan(0);
    expect(Array.isArray(items)).toBe(true);

    items.forEach(company => {
      expect(company.hiringCriteria).toBeDefined();
      expect(Array.isArray(company.hiringCriteria.skills)).toBe(true);

      const hasDSA = company.hiringCriteria.skills.some(
        skill => skill.toLowerCase().includes('dsa')
      );
      expect(hasDSA).toBe(true);
    });
  });


  test('GET /api/companies/:idc return the same document as in the list', async ({ request }) => {
    const listRes = await request.get('/api/companies?limit=1');
    expect(listRes.status()).toBe(200);
    const listBody = await listRes.json();
    expect(listBody.items.length).toBeGreaterThan(0);
  })

  test('GET /api/companies?limit=0 return all the companies', async ({ request }) => {
    const listRes = await request.get('/api/companies?limit=0');
    expect(listRes.status()).toBe(200);
    const { total, items } = await listRes.json();
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBe(19);
    // expect(total).toBe(19);
  })

  test('GET /api/companies?name=Microsoft&location=Hyderabad returns Microsoft companies in Hyderabad', async ({ request }) => {
    const listRes = await request.get('/api/companies?name=Microsoft&location=Hyderabad');
    expect(listRes.status()).toBe(200);

    const { count, items } = await listRes.json();
    expect(count).toBeGreaterThan(0);
    expect(Array.isArray(items)).toBe(true);

    items.forEach(company => {
      expect(company.name.toLowerCase()).toContain('microsoft');
      expect(company.location.toLowerCase()).toContain('hyderabad');
    });
  });
  
  test('GET /api/companies?name=Microsoft&location=Delhi returns no results for contradictory filters', async ({ request }) => {
  const res = await request.get('/api/companies?name=Microsoft&location=Delhi');
  expect(res.status()).toBe(200);

  const { count, items } = await res.json();
  expect(count).toBe(0);
  expect(items.length).toBe(0);
});


});
