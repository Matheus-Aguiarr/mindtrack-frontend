import { useDeleteNote } from "@/http/use-delete-note";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface Props { 
    noteId: number; 
    subjectId: number; 
}

export function ConfirmDeleteNoteDialog({noteId, subjectId}: Props) { 
    const { mutate, isPending } = useDeleteNote(noteId, subjectId);
    const handleConfirm = () => {
        mutate();
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-red-400 cursor-pointer hover:bg-red-500">
                    Excluir
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader> 
                    <AlertDialogTitle>
                        Tem certeza? 
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Você está excluindo essa anotação. Essa ação não pode ser desfeita. 
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="bg-yellow-500 shadow-lg shadow-yellow-500/20 cursor-pointer hover:bg-yellow-600"
                        disabled={isPending}
                    >
                     {isPending ? "Excluindo..." : "Sim, deletar anotação."}   
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}