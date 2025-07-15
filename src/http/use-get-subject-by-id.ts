import { useQuery } from "@tanstack/react-query";
import type { SubjectData } from "./types/subject-data";
import { authFetch } from "./auth-fetch";

export function useGetSubjectById(id: number | undefined) { 
    return useQuery<SubjectData>({ 
        queryKey: ["get-subject", id], 
        enabled: !!id, // so executa se o id tiver definido
        queryFn: async () => { 
            console.log("Reexecutando a query do subject", id);
            
            const response = await authFetch(`https://mindtrack-service.onrender.com/subject/${id}`, {
                method: "GET"
            }); 
            if (!response.ok) {
                const error = await response.json(); 
                throw new Error(error.message || "Erro ao buscar materia. "); 
            }

            console.log("Buscando subject com ID: ", id);

            const data = await response.json();

            console.log("Novos dados: ", data);
            

            return data;
        }, 
    })
}