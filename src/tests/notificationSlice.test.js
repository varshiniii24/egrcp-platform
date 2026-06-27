import notificationReducer, {
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from '../store/slices/notificationSlice';
import { fetchNotifications } from '../store/slices/notificationSlice';

describe('notificationSlice', () => {
  const initialState = { items: [], loading: false, error: null };

  const mockNotifications = [
    { id: 'N-001', title: 'Alert 1', message: 'Msg 1', type: 'warning', read: false, date: '2025-06-24T09:00:00' },
    { id: 'N-002', title: 'Alert 2', message: 'Msg 2', type: 'error',   read: false, date: '2025-06-24T08:00:00' },
    { id: 'N-003', title: 'Alert 3', message: 'Msg 3', type: 'info',    read: true,  date: '2025-06-23T08:00:00' },
  ];

  const stateWithItems = { ...initialState, items: mockNotifications };

  test('should return initial state', () => {
    expect(notificationReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('should handle markAsRead for unread item', () => {
    const state = notificationReducer(stateWithItems, markAsRead('N-001'));
    expect(state.items[0].read).toBe(true);
  });

  test('should not affect other items on markAsRead', () => {
    const state = notificationReducer(stateWithItems, markAsRead('N-001'));
    expect(state.items[1].read).toBe(false);
    expect(state.items[2].read).toBe(true);
  });

  test('should handle markAllAsRead', () => {
    const state = notificationReducer(stateWithItems, markAllAsRead());
    expect(state.items.every((n) => n.read)).toBe(true);
  });

  test('markAllAsRead on empty items', () => {
    const state = notificationReducer(initialState, markAllAsRead());
    expect(state.items).toHaveLength(0);
  });

  test('should handle deleteNotification', () => {
    const state = notificationReducer(stateWithItems, deleteNotification('N-001'));
    expect(state.items).toHaveLength(2);
    expect(state.items.find((n) => n.id === 'N-001')).toBeUndefined();
  });

  test('should keep other items on delete', () => {
    const state = notificationReducer(stateWithItems, deleteNotification('N-002'));
    expect(state.items).toHaveLength(2);
    expect(state.items[0].id).toBe('N-001');
    expect(state.items[1].id).toBe('N-003');
  });

  test('should handle fetchNotifications pending', () => {
    const action = { type: fetchNotifications.pending.type };
    const state = notificationReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  test('should handle fetchNotifications fulfilled', () => {
    const action = { type: fetchNotifications.fulfilled.type, payload: mockNotifications };
    const state = notificationReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toHaveLength(3);
  });

  test('should handle fetchNotifications rejected', () => {
    const action = { type: fetchNotifications.rejected.type, payload: 'Error' };
    const state = notificationReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });

  test('delete non-existent item keeps list same', () => {
    const state = notificationReducer(stateWithItems, deleteNotification('INVALID'));
    expect(state.items).toHaveLength(3);
  });
});