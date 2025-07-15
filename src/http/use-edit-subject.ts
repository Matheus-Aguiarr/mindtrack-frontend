import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { editSubjectData } from "./types/edit-subject-data";
import { authFetch } from "./auth-fetch";




export function useEditSubject(subjectId: number | undefined) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationKey: ['edit-subject', subjectId], 
        mutationFn: async(data: editSubjectData) => {
            
            const response = await authFetch(`https://mindtrack-service.onrender.com/subject/${subjectId}`, { 
                method: "PUT", 
                body: JSON.stringify(data), 
            })

            if (!response.ok) { 
                const error = await response.json();
                throw new Error(error.message || "Erro ao editar matéria.");
            }
        }, 
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['get-subject', subjectId]})
            queryClient.refetchQueries({queryKey: ['get-subjects']})
        },
    })

}