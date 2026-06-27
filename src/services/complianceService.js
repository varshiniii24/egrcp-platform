import { mockCompliances } from '../mocks/mockData';

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

const complianceService = {
  getAll:  async ()         => { await delay(); return mockCompliances; },
  getById: async (id)       => { await delay(300); return mockCompliances.find((c) => c.id === id); },
  update:  async (id, data) => { await delay(); return { ...data, id }; },
};

export default complianceService;