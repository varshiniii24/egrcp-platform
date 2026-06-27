import { mockNotifications } from '../mocks/mockData';

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const notificationService = {
  getAll:    async ()    => { await delay(); return mockNotifications; },
  markRead:  async (id)  => { await delay(200); return { id, read: true }; },
  markAllRead: async ()  => { await delay(200); return { success: true }; },
  delete:    async (id)  => { await delay(200); return { success: true, id }; },
};

export default notificationService;