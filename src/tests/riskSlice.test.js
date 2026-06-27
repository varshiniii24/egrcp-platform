import riskReducer, {
  addRisk,
  updateRisk,
  closeRisk,
  setSelected,
} from '../store/slices/riskSlice';

describe('riskSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
    selected: null,
  };

  const mockRisk = {
    id: 'R-001',
    title: 'Data Breach Risk',
    category: 'Cybersecurity',
    severity: 'critical',
    status: 'open',
    owner: 'IT Dept',
    likelihood: 'High',
    impact: 'Critical',
    date: '2025-06-01',
  };

  test('should return initial state', () => {
    expect(riskReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('should handle addRisk', () => {
    const state = riskReducer(initialState, addRisk(mockRisk));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].title).toBe('Data Breach Risk');
    expect(state.items[0].severity).toBe('critical');
  });

  test('should handle updateRisk', () => {
    const stateWithItem = { ...initialState, items: [mockRisk] };
    const updated = { ...mockRisk, severity: 'high' };
    const state = riskReducer(stateWithItem, updateRisk(updated));
    expect(state.items[0].severity).toBe('high');
  });

  test('should handle closeRisk', () => {
    const stateWithItem = { ...initialState, items: [mockRisk] };
    const state = riskReducer(stateWithItem, closeRisk('R-001'));
    expect(state.items[0].status).toBe('closed');
  });

  test('should handle setSelected', () => {
    const state = riskReducer(initialState, setSelected(mockRisk));
    expect(state.selected).toEqual(mockRisk);
  });

  test('should add risk to beginning of list', () => {
    const existing = { ...mockRisk, id: 'R-000', title: 'Existing Risk' };
    const stateWithItem = { ...initialState, items: [existing] };
    const newRisk = { ...mockRisk, id: 'R-002', title: 'New Risk' };
    const state = riskReducer(stateWithItem, addRisk(newRisk));
    expect(state.items[0].title).toBe('New Risk');
    expect(state.items).toHaveLength(2);
  });

  test('should not close non-existent risk', () => {
    const stateWithItem = { ...initialState, items: [mockRisk] };
    const state = riskReducer(stateWithItem, closeRisk('INVALID'));
    expect(state.items[0].status).toBe('open');
  });
});