import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./auth-fetch";

export function useDeleteSubject(subjectId: number | undefined) { 
    const queryClient = useQueryClient(); 
    return useMutation({
        mutationKey: ['delete-subject', subjectId], 
        mutationFn: async () => {
            const response = await authFetch(`https://mindtrack-service.onrender.com/subject/${subjectId}`, {
                method: "DELETE"
            }); 

            if (!response.ok) { 
                const error = await response.json();
                throw new Error(error.message || "Erro ao deletar matéria.")
            }
        }, 
        onSuccess: () => {
            queryClient.refetchQueries({queryKey: ['get-subjects']})
        }
    })
} 