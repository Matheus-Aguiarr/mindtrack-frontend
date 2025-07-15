import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./auth-fetch";


type CreateGoalData = { 
    title: string; 
    description: string; 
    deadline: string; 
    subject_id: number; 
}

export function useCreateGoal() { 
    const queryClient = useQueryClient(); 

    return useMutation({ 
        mutationKey: ["post-goal"], 
        mutationFn: async (data: CreateGoalData) => { 
            const response = await authFetch("https://mindtrack-service.onrender.com/goal", { 
                method: "POST", 
                body: JSON.stringify(data), 
            }); 

            if(!response.ok) { 
                const error = await response.json(); 
                throw new Error(error.message || "Erro ao criar objetivo.")
            }

        }, 
        onSuccess: (_, { subject_id }) => { 
           queryClient.refetchQueries({ queryKey: ['get-subject', subject_id] });
        }, 
    })
}