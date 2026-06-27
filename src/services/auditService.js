import { mockAudits } from '../mocks/mockData';

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

const auditService = {
  getAll:  async ()         => { await delay(); return mockAudits; },
  getById: async (id)       => { await delay(300); return mockAudits.find((a) => a.id === id); },
  create:  async (data)     => { await delay(); return { ...data, id: 'A-' + Date.now(), status: 'pending' }; },
  update:  async (id, data) => { await delay(); return { ...data, id }; },
};

export default auditService;