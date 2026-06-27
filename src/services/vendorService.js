import { mockVendors } from '../mocks/mockData';

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

const vendorService = {
  getAll:  async ()         => { await delay(); return mockVendors; },
  getById: async (id)       => { await delay(300); return mockVendors.find((v) => v.id === id); },
  create:  async (data)     => { await delay(); return { ...data, id: 'V-' + Date.now(), status: 'active' }; },
  update:  async (id, data) => { await delay(); return { ...data, id }; },
};

export default vendorService;