import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./auth-fetch";

type CreateNoteData = {
    title: string;
    content: string;
    subjectId: number;
}

export function useCreateNote() { 
    const queryClient = useQueryClient(); 

    return useMutation({ 
        mutationKey: ["post-note"], 
        mutationFn: async (data: CreateNoteData) => {
            const response = await authFetch("https://mindtrack-service.onrender.com/note", {
                method: "POST", 
                body: JSON.stringify(data), 
            })

            if (!response.ok) { 
                const error = await response.json(); 
                throw new Error(error.message || "Erro ao criar anotação. "); 
            }
        }, 
        onSuccess: (_, { subjectId }) => { 
            queryClient.invalidateQueries({ queryKey: ["get-subject", subjectId]})
        }, 
    })
}