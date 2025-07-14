import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./auth-fetch";

export function useDeleteNote(noteId: number | undefined, subjectId: number | undefined) { 
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationKey: ['delete-note', noteId], 
        mutationFn: async() => {
            const response = await authFetch(`http://localhost:8080/note/${noteId}`, { 
                method: "DELETE"
            })

            if (!response.ok) { 
                const error = await response.json();
                throw new Error(error.message || "Erro ao deletar anotação")
            }
        }, 
        onSuccess: () => {
            if(subjectId) { 
                queryClient.refetchQueries({queryKey: ['get-subject', subjectId]});
            }
        }
    })
}