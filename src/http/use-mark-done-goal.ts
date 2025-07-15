import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./auth-fetch";

export function useMarkDoneGoal(id: number | undefined, subjectId: number | undefined) { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["done-goal", id], 
        mutationFn: async() => {
            const response = await authFetch(`https://mindtrack-service.onrender.com/goal/done/${id}`, {
                method: "PUT"
            });

            if(!response.ok) { 
                const error = await response.json();
                throw new Error(error.message || "Erro ao marcar como done.")
            }
        }, 
        onSuccess: () => { 
            if(subjectId) { 
                queryClient.refetchQueries({queryKey: ['get-subject', subjectId]})
            }
            
        }
    })
}