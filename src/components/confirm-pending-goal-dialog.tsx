import { useMarkPedingGoal } from "@/http/use-mark-pending-goal";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { AlertDialogCancel, AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog";

interface Props { 
    goalId: number; 
    subjectId: number; 
}

export function ConfirmPedingGoalDialog({goalId, subjectId}: Props) { 
    const {mutate, isPending} = useMarkPedingGoal(goalId, subjectId);

    const handleConfirm = () => {
        mutate();
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="cursor-pointer bg-amber-500 mr-2 hover:bg-amber-600">
                    Pendente
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tem certeza?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Você está marcando esse objetivo como pendente. Essa ação pode ser desfeita logo após a confirmação. 
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={isPending}
                        className="cursor-pointer bg-yellow-500 shadow-lg shadow-yellow-500/20 hover:bg-yellow-600"
                    >
                        {isPending ? "Salvando..." : "Sim, marcar como pendente"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}