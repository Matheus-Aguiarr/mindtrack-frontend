import { useCreateSubject } from "@/http/use-create-subject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";



const schema = z.object({ 
    name: z.string().min(1, "Nome obrigatório"), 
    description: z.string()
});

type FormData = z.infer<typeof schema>; 

export function CreateSubjectDialog() { 
    const [open, setOpen] = useState(false);
    const {mutate, isPending, error} = useCreateSubject();

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
        <Button className="ml-auto flex gap-2 mb-10 cursor-pointer bg-yellow-500 shadow-lg shadow-yellow-500/20 hover:bg-yellow-600">
          <Plus size={18} />
          Nova Matéria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Matéria</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500">{error.message}</p>
          )}

          <Button type="submit" disabled={isPending} className="w-full bg-yellow-500 shadow-lg shadow-yellow-500/20 hover:bg-yellow-600 cursor-pointer">
            {isPending ? "Criando..." : "Criar Matéria"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    );
}