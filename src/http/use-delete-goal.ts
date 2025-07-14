import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./auth-fetch";

export function useDeleteGoal(goalId: number | undefined, subjectId: number | undefined) { 
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["delete-goal", goalId], 
        mutationFn: async () => {
            const response = await authFetch(`http://localhost:8080/goal/${goalId}`, {
                method: "DELETE"
            })

            if (!response.ok) { 
                const error = await response.json();
                throw new Error(error.message || "Erro ao deletar objetivo. ")
            }
        }, 
        onSuccess: () => { 
            if(subjectId) { 
                queryClient.refetchQueries({queryKey: ['get-subject', subjectId]})
            }
        }
    })
}