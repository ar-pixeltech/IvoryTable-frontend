import api from "@/lib/axios";


// Auth APIs
export const login = (data: any) => {
    return api.post("/vendor/auth/login", data);
};

// Profile APIs
export const viewProfile = (id: string) => {
    return api.get(`/vendor/profile/${id}`);
};

export const updateProfile = (id: string, data: any) => {
    return api.put(`/vendor/profile/${id}`, data);
};


// Category APIs
export const viewCategory = (id: string) => {
    return api.get(`/vendor/category/${id}`);
};

export const createCategory = (data: any) => {
    return api.post(`/vendor/category/create`, data);
};

export const updateCategory = (id: string, data: any) => {
    return api.put(`/vendor/category/${id}`, data);
};

export const deleteCategory = (id: string) => {
    return api.delete(`/vendor/category/${id}`);
};

// Item APIs
export const viewItem = (id: string) => {
    return api.get(`/vendor/item/${id}`);
};

export const createItem = (data: any) => {
    return api.post(`/vendor/item/create`, data);
};

export const updateItem = (id: string, data: any) => {
    return api.put(`/vendor/item/${id}`, data);
};

export const deleteItem = (id: string) => {
    return api.delete(`/vendor/item/${id}`);
};


export const viewSubscriptionPlan = (
    id: string
) => {
    return api.get(`/vendor/subscription/${id}`);
};

export const viewSales = (
    id: string
) => {
    return api.get(`/vendor/sales/${id}`);
};

// invoice APIs
export const viewInvoice = (id: string) => {
    return api.get(`/vendor/invoice/${id}`);
};

export const printInvoice = (id: string) => {
    return api.get(`/vendor/invoice/${id}/print`, { responseType: "blob" });
}

// // Subscription APIs
// export const subscribePlan = (data: SubscriptionPlanPayload) => {
//     return api.post(`/vendor/subscription/subscribe`, data);
// };

// export const cancelSubscription = () => {
//     return api.post(`/vendor/subscription/cancel`);
// };