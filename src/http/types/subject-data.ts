import type { GoalData } from "./goal-data";
import type { NoteData } from "./note-data";

export type SubjectData = {
    id: number;
    name: string; 
    description: string; 
    goals: GoalData[]; 
    notes: NoteData[]; 
}