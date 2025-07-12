import { useCreateNote } from "@/http/use-create-note";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Plus } from "lucide-react";


const schema = z.object({ 
    title: z.string().min(1), 
    content: z.string().min(1), 
});

type FormData = z.infer<typeof schema>;

interface Props { 
    subjectId: number; 
}

export function CreateNoteDialog({subjectId}: Props) { 
    const [open, setOpen] = useState(false); 
    const {mutate, isPending, error} = useCreateNote();

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: {errors}, 
    } = useForm<FormData>({resolver: zodResolver(schema)}); 

    const onSubmit = (data: FormData) => {
        mutate( 
            { ...data, subjectId}, 
            { 
                onSuccess: () => {
                    reset(); 
                    setOpen(false);
                }, 
            }
        )
    }

    return ( 
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto cursor-pointer" variant={"secondary"}>
            <Plus  size={18}/>
            Nova Anotação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Anotação</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...register("title")} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea id="content" {...register("content")} />
            {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
          </div>

          {error && <p className="text-sm text-red-500">{error.message}</p>}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Criando..." : "Criar Anotação"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    )
}