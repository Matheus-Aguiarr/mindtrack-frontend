import { useMarkDoneGoal } from "@/http/use-mark-done-goal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface Props { 
    goalId: number; 
    subjectId: number;
}

export function ConfirmMarkDoneDialog({goalId, subjectId}: Props) { 
    const {mutate, isPending} = useMarkDoneGoal(goalId, subjectId) 

    const handleConfirm = () => { 
        mutate(); 
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-green-400 hover:bg-green-500 cursor-pointer mr-2">
                    Feito
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tem certeza? 
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Você está marcando esse objetivo como feito. Essa ação pode ser desfeita logo após a confirmação.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={isPending} className="cursor-pointer bg-yellow-500 shadow-lg shadow-yellow-500/20 hover:bg-yellow-600">
                        {isPending ? "Salvando..." : "Sim, marcar como feito"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}