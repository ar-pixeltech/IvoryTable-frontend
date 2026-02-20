import api from "@/lib/axios";

export const adminLogin = (data: {
    email: string;
    password: string;
}) => {
    return api.post("/admin/login", data);
};
