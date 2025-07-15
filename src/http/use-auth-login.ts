import { useMutation } from "@tanstack/react-query";
import type { LoginData } from "./types/login-data";

export function useAuthLogin() {
    return useMutation({
        mutationKey: ['post-login'], 
        mutationFn: async (data: LoginData) => {
            const response = await fetch('https://mindtrack-service.onrender.com/auth/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data), 
            });

            if (!response.ok) {
                const error = await response.json(); 
                throw new Error(error.message || 'Erro ao fazer login.')
            }
            return response.json();
            
        }, 
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            console.log("Token: ", data.token);
            
        }
    });
    
}