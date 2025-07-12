export async function authFetch(
    input: RequestInfo, 
    init: RequestInit = {}
): Promise<Response> { 
    const token = localStorage.getItem("token");

    const response = await fetch(input, { 
        ...init, 
        headers: {
            ...init.headers, 
            Authorization: token? `Bearer ${token}` : "", 
            "Content-Type": "application/json", 
        }, 
    })

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    return response; 
}