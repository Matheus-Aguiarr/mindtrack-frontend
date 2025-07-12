import { useCreateGoal } from "@/http/use-create-goal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {  CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";


const schema = z.object({
    title: z.string().min(1), 
    description: z.string(), 
    deadline: z.date(), 
}); 

type FormData = z.infer<typeof schema>;

interface Props { 
    subject_id: number;
}

export function CreateGoalDialog({ subject_id }: Props) { 
    const [open, setOpen] = useState(false);
    const { mutate, isPending, error} = useCreateGoal(); 

    const { 
        register, 
        handleSubmit, 
        formState: {errors}, 
        setValue, 
        watch, 
        reset, 
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const deadline = watch("deadline"); 
    
    const onSubmit = (data: FormData) => {
        mutate( 
            { 
                ...data, 
                deadline: data.deadline.toISOString().split("T")[0], 
                subject_id, 
            },
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
        <Button className="ml-auto" variant={"secondary"}>
            <Plus size={18}/>
            Novo Objetivo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Objetivo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...register("title")} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <div>
            <Label>Data limite</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left", !deadline && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, "dd/MM/yyyy") : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={(date) => setValue("deadline", date!)}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            {errors.deadline && <p className="text-sm text-red-500">{errors.deadline.message}</p>}
          </div>

          {error && <p className="text-sm text-red-500">{error.message}</p>}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Criando..." : "Criar Objetivo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    )
}