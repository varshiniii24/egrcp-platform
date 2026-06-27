import { mockRisks } from '../mocks/mockData';

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

const riskService = {
  getAll:  async ()         => { await delay(); return mockRisks; },
  getById: async (id)       => { await delay(300); return mockRisks.find((r) => r.id === id); },
  create:  async (data)     => { await delay(); return { ...data, id: 'R-' + Date.now(), status: 'open' }; },
  update:  async (id, data) => { await delay(); return { ...data, id }; },
  close:   async (id)       => { await delay(); return { id, status: 'closed' }; },
};

export default riskService;