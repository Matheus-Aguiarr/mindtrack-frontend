import { useEditSubject } from "@/http/use-edit-subject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { SubjectData } from "@/http/types/subject-data";

interface Props { 
    subjectId: number; 
    subject: SubjectData;
}

const schema = z.object({ 
    name: z.string().min(1, "Nome obrigatório"), 
    description: z.string()
});

type FormData = z.infer<typeof schema>;

export function ConfirmEditSubjectDialog({subjectId, subject}:Props) { 
    const [open, setOpen] = useState(false);
    const {mutate, isPending, error} = useEditSubject(subjectId);

    const { 
        register, 
        handleSubmit, 
        formState: {errors}, 
        reset, 
    } = useForm<FormData>({resolver: zodResolver(schema)});

    const onSubmit = (data: FormData) => { 
        mutate(data, { 
            onSuccess: () => { 
                reset();
                setOpen(false);
            }
        })
    }

    return ( 
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-amber-400 cursor-pointer hover:bg-amber-500">
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Editar Matéria
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" {...register("name")} defaultValue={subject.name}>
                            {errors.name && ( 
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                            
                        </Input>
                    </div>

                    <div>
                        <Label htmlFor="description">
                            Descrição
                        </Label>
                        <Input defaultValue={subject.description} id="description" {...register("description")}>
                            {errors.description && ( 
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </Input>
                    </div>
                    
                    {error && ( 
                        <p className="text-sm text-red-500">
                            {error.message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-yellow-500 shadow-lg shadow-yellow-500/20 hover:bg-yellow-600 cursor-pointer"
                    >
                        {isPending ? "Salvando..." : "Editar Matéria"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}