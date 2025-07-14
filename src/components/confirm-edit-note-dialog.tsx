import { useEditNote } from "@/http/use-edit-note";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { NoteData } from "@/http/types/note-data";
import { Textarea } from "./ui/textarea";

interface Props {
    noteId: number; 
    subjectId: number;
    note: NoteData;
}

const schema = z.object({
    title: z.string().min(1, "Titulo obrigatório"), 
    content: z.string(),
})

type FormData = z.infer<typeof schema>;

export function ConfirmEditNoteDialog({noteId, subjectId, note}:Props) { 
    const [open, setOpen] = useState(false);
    const {mutate, isPending, error} = useEditNote(noteId, subjectId);

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
                        Editar Anotação
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="title">Titulo</Label>
                        <Input id="title" {...register("title")} defaultValue={note.title}>
                            {errors.title && ( 
                                <p className="text-sm text-red-500">{errors.title.message}</p>
                            )}
                            
                        </Input>
                    </div>

                    <div>
                        <Label htmlFor="content">
                            Conteúdo
                        </Label>
                        <Textarea defaultValue={note.content} id="description" {...register("content")}>
                            {errors.content && ( 
                                <p className="text-sm text-red-500">{errors.content.message}</p>
                            )}
                        </Textarea>
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
                        {isPending ? "Salvando..." : "Editar Anotação"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}