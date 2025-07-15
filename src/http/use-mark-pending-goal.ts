import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./auth-fetch";

export function useMarkPedingGoal(goalId: number | undefined, subjectId: number | undefined) { 
    const queryClient = useQueryClient();

    return useMutation({ 
        mutationKey: ['pending-goal', goalId], 
        mutationFn: async() => {
            const response = await authFetch(`https://mindtrack-service.onrender.com/goal/pending/${goalId}`, {
                method: "PUT"
            }); 

            if(!response.ok) { 
                const error = await response.json();
                throw new Error(error.message || "Erro ao marcar matéria como pendente."); 
            }



        }, 
        onSuccess: () => {
            if (subjectId) { 
                queryClient.refetchQueries({queryKey: ['get-subject', subjectId]});
            }
        }
    })
}