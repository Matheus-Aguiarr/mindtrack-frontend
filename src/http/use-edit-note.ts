import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EditNoteData } from "./types/edit-note-data";
import { authFetch } from "./auth-fetch";

export function useEditNote(noteId: number | undefined, subjectId: number | undefined) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["edit-note", noteId], 
        mutationFn: async(data: EditNoteData) => { 
            const response = await authFetch(`https://mindtrack-service.onrender.com/note/${noteId}`, {
                method: "PUT", 
                body: JSON.stringify(data)
            })

            if (!response.ok) { 
                const error = await response.json();
                throw new Error(error.message || "Erro ao editar anotação")
            }
        }, 
        onSuccess: () => { 
            if(subjectId) { 
                queryClient.refetchQueries({queryKey: ['get-subject', subjectId]})
            }
        }
    })
}