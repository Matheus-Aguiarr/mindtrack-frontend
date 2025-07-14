import { useDeleteGoal } from "@/http/use-delete-goal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface Props { 
    goalId: number;
    subejctId: number;
}

export function ConfirmDeleteGoalDialog({goalId, subejctId}: Props) { 
    const {mutate, isPending} = useDeleteGoal(goalId, subejctId);

    const handleConfirm = () => { 
        mutate();
    }

    return ( 
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="cursor-pointer bg-red-400 hover:bg-red-500">
                    Excluir
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tem certeza?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Você está excluindo esse objetivo. Essa ação não pode ser desfeita após a confirmação.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={isPending} className="cursor-pointer bg-yellow-500 shadow-lg shadow-yellow-500/20 hover:bg-yellow-600">
                        {isPending ? "Excluindo..." : "Sim, excluir mesmo assim"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}