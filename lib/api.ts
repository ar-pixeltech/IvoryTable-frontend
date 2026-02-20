const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiFetch(endpoint: string, options?: RequestInit) {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
            ...options?.headers
        }
    })

    return res.json()
}
