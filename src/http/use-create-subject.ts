import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./auth-fetch";

type CreateSubjectData = {
    name: string; 
    description: string; 
}

export function useCreateSubject() { 
    const queryClient = useQueryClient();

    return useMutation({ 
        mutationKey: ["post-subject"], 
        mutationFn: async(data: CreateSubjectData) => {
            const response = await authFetch("http://localhost:8080/subject", { 
                method: "POST", 
                body: JSON.stringify(data), 
            }); 

            if(!response.ok) { 
                const error = await response.json(); 
                throw new Error(error.message || "Erro ao criar materia. "); 
            }
        }, 
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ['get-subjects']})
        }, 
    }); 
}
