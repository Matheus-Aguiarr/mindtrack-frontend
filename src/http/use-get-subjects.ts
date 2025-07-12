import { useQuery } from "@tanstack/react-query";
import { authFetch } from "./auth-fetch";
import type { SubjectData } from "./types/subject-data";



export function useGetSubjects() {
    return useQuery<SubjectData[]>({
        queryKey: ["get-subjects"], 
        queryFn: async () => {
            const response = await authFetch("http://localhost:8080/subject/user", {
                method: "GET",
            });
            
            if(!response.ok) { 
                const error = await response.json();
                throw new Error(error.message || "Erro ao buscar materias")
            }

            return response.json();
        }
    });
}