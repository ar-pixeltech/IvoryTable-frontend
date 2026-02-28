import api from '@/lib/axios';

export const adminLogin = (data: { email: string; password: string }) => {
  return api.post('/admin/login', data);
};

// subscription plans
export interface SubscriptionPlanPayload {
  name: string;
  price: number;
  durationDays: number;
  // description?: string;
  isTrial?: boolean;
}

export const getSubscriptionPlans = () => {
  return api.get('/subscription/all');
};

// export const getSubscriptionPlanById = (id: string) => {
//   return api.get(`/admin/subscription-plans/${id}`);
// };

export const createSubscriptionPlan = (data: SubscriptionPlanPayload) => {
  return api.post('/subscription/create', data);
};

export const updateSubscriptionPlan = (id: string, data: SubscriptionPlanPayload) => {
  return api.put(`/subscription/update/${id}`, data);
};

export const deleteSubscriptionPlan = (id: string) => {
  return api.delete(`/subscription/delete/${id}`);
};


// Vendor
export const createVendor = (data: { name: string; email: string; phone: string }) => {
  return api.post('/admin/vendor/create', data);
};

export const getVendorList = () => {
  return api.get('/admin/vendor/list');
};
