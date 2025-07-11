import { useMutation } from "@tanstack/react-query";
import type { RegisterData } from "./types/register-data";

export function useAuthRegister() {
    return useMutation({
        mutationKey: ['post-register'], 
        mutationFn: async (data: RegisterData) => {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data), 
            });

            if (!response.ok) {
                const error = await response.json(); 
                throw new Error(error.message || 'Erro ao registrar')
            }
        }
    });
}