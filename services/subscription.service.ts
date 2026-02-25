import api from "@/lib/axios";

export interface SubscriptionPlanPayload {
    name: string;
    price: number;
    durationDays: number;
    // description?: string;
    isTrial?: boolean;
}

export const getSubscriptionPlans = () => {
    return api.get("/subscription/all");
};

// export const getSubscriptionPlanById = (id: string) => {
//   return api.get(`/admin/subscription-plans/${id}`);
// };

export const createSubscriptionPlan = (
    data: SubscriptionPlanPayload
) => {
    return api.post("/subscription/create", data);
};

export const updateSubscriptionPlan = (
    id: string,
    data: SubscriptionPlanPayload
) => {
    return api.put(`/subscription/update/${id}`, data);
};

export const deleteSubscriptionPlan = (id: string) => {
    return api.delete(`/subscription/delete/${id}`);
};
