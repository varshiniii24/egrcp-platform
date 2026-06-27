import procurementReducer, {
  addProcurement,
  updateProcurement,
  deleteProcurement,
  setSelected,
} from '../store/slices/procurementSlice';

describe('procurementSlice', () => {
  const initialState = { items: [], loading: false, error: null, selected: null };

  const mockItem = {
    id: 'PO-001',
    title: 'Office Supplies',
    vendor: 'OfficeMax',
    amount: 5000,
    status: 'pending',
    category: 'Supplies',
    date: '2025-06-01',
  };

  test('should return initial state', () => {
    expect(procurementReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('should handle addProcurement', () => {
    const state = procurementReducer(initialState, addProcurement(mockItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].title).toBe('Office Supplies');
    expect(state.items[0].status).toBe('pending');
  });

  test('should handle updateProcurement', () => {
    const stateWithItem = { ...initialState, items: [mockItem] };
    const updated = { ...mockItem, status: 'approved' };
    const state = procurementReducer(stateWithItem, updateProcurement(updated));
    expect(state.items[0].status).toBe('approved');
  });

  test('should handle deleteProcurement', () => {
    const stateWithItem = { ...initialState, items: [mockItem] };
    const state = procurementReducer(stateWithItem, deleteProcurement('PO-001'));
    expect(state.items).toHaveLength(0);
  });

  test('should handle setSelected', () => {
    const state = procurementReducer(initialState, setSelected(mockItem));
    expect(state.selected).toEqual(mockItem);
  });

  test('should add item to beginning of list', () => {
    const existingItem = { ...mockItem, id: 'PO-000', title: 'Existing Item' };
    const stateWithItem = { ...initialState, items: [existingItem] };
    const newItem = { ...mockItem, id: 'PO-002', title: 'New Item' };
    const state = procurementReducer(stateWithItem, addProcurement(newItem));
    expect(state.items[0].title).toBe('New Item');
    expect(state.items).toHaveLength(2);
  });
});