import { mockProcurements } from '../mocks/mockData';

const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

const procurementService = {
  getAll:    async ()       => { await delay(); return mockProcurements; },
  getById:   async (id)     => { await delay(300); return mockProcurements.find((p) => p.id === id); },
  create:    async (data)   => { await delay(); return { ...data, id: 'PO-' + Date.now(), status: 'pending' }; },
  update:    async (id, data) => { await delay(); return { ...data, id }; },
  delete:    async (id)     => { await delay(300); return { success: true, id }; },
  approve:   async (id)     => { await delay(); return { id, status: 'approved' }; },
  reject:    async (id)     => { await delay(); return { id, status: 'rejected' }; },
};

export default procurementService;