import procurementService from '../services/procurementService';

describe('procurementService', () => {
  test('getAll returns array of procurements', async () => {
    const result = await procurementService.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test('getAll returns items with required fields', async () => {
    const result = await procurementService.getAll();
    const first = result[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('vendor');
    expect(first).toHaveProperty('amount');
    expect(first).toHaveProperty('status');
  });

  test('getById returns correct item', async () => {
    const result = await procurementService.getById('PO-001');
    expect(result).toBeDefined();
    expect(result.id).toBe('PO-001');
  });

  test('getById returns undefined for invalid id', async () => {
    const result = await procurementService.getById('INVALID-999');
    expect(result).toBeUndefined();
  });

  test('create returns new item with pending status', async () => {
    const newItem = {
      title: 'Test PO',
      vendor: 'Test Vendor',
      amount: 10000,
      category: 'Technology',
      date: '2025-06-01',
    };
    const result = await procurementService.create(newItem);
    expect(result).toBeDefined();
    expect(result.status).toBe('pending');
    expect(result.title).toBe('Test PO');
  });

  test('update returns updated item', async () => {
    const updated = { title: 'Updated PO', status: 'approved' };
    const result = await procurementService.update('PO-001', updated);
    expect(result.id).toBe('PO-001');
    expect(result.title).toBe('Updated PO');
  });

  test('approve returns approved status', async () => {
    const result = await procurementService.approve('PO-001');
    expect(result.status).toBe('approved');
  });

  test('reject returns rejected status', async () => {
    const result = await procurementService.reject('PO-001');
    expect(result.status).toBe('rejected');
  });

  test('delete returns success', async () => {
    const result = await procurementService.delete('PO-001');
    expect(result.success).toBe(true);
    expect(result.id).toBe('PO-001');
  });
});