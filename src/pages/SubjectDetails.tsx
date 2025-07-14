import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge'
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSubjectById } from "@/http/use-get-subject-by-id";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom"
import { CreateGoalDialog } from "@/components/create-goal-dialog";
import { CreateNoteDialog } from "@/components/create-note-dialog";
import { ArrowLeft } from "lucide-react";
import { ConfirmMarkDoneDialog } from "@/components/confirm-mark-done-dialog";
import { ConfirmDeleteGoalDialog } from "@/components/confirm-delete-goal-dialog";
import { ConfirmPedingGoalDialog } from "@/components/confirm-pending-goal-dialog";
import { Button } from "@/components/ui/button";
import { ConfirmEditNoteDialog } from "@/components/confirm-edit-note-dialog";
import { ConfirmDeleteNoteDialog } from "@/components/confirm-delete-note-dialog";

export function SubjectDetails() {
    const { id } = useParams(); // pega o id dos parametros
    const numericId = id ? Number(id) : undefined;
    const { data: subject, isLoading, error} = useGetSubjectById(numericId); 
    const navigate = useNavigate();


    if (isLoading) { 
        return ( 
            <div className="mx-w-4xl mx-auto px-4 mt-10 space-y-4"> 
                <Skeleton className="h-10 w-[250px] m-auto mb-2" />
                <Skeleton className="h-6 w-[300px] m-auto mb-10" /> 
                <Separator />
                <div className="flex flex-row m-auto w-1/2 justify-between">
                    <Skeleton className="h-10 w-[250px]" />
                    <Skeleton className="h-10 w-[200px]"/> 
                </div> 
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 w-1/2 m-auto mb-10">
                    <Skeleton className="h-40 mt-4 w-64 rounded-2xl  " />
                </div>
                <Separator />
                <div className="flex flex-row m-auto w-1/2 justify-between">
                    <Skeleton className="h-10 w-[250px]" />
                    <Skeleton className="h-10 w-[200px]"/> 
                </div> 
                <Skeleton />
            </div>
        )
    }

    function handleGoBack() { 
        navigate("/dashboard");
    }

    if (error) {
        console.error("Erro no useGetSubjectById: ", error.message)
        return ( 
            <div className="text-red-500 text-center mt-10">
                Erro ao buscar materia: {(error as Error).message}
            </div>
        )
    }

    if (!subject) return null; 


    return ( 
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">    
            <div>
                <ArrowLeft size={25} onClick={handleGoBack}  className="cursor-pointer"/> 
                <h1 className="text-3xl font-bold text-center">
                    {subject.name}
                </h1>
                <p className="text-muted-foreground text-center">
                    {subject.description}
                </p>
            </div>

            <Separator />
            {/* Objetivos */}

            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">
                        🎯 Objetivos
                    </h2>
                    <CreateGoalDialog subject_id={subject.id} /> 
                </div>

                {subject.goals.length ===  0 ? ( 
                    <p>Nenhum objetivo ainda. </p>
                ) : ( 
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"> 
                        {subject.goals.map((goal) => ( 
                            <Card key={goal.id} className="rounded-2xl min-h-[180px] p-0.5">
                                <CardContent className="p-4 flex flex-col justify-between h-full">
                                    <h3 className="font-semibold text-lg">
                                        {goal.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {goal.description}
                                    </p>
                                    <Badge variant={"outline"} className="mt-2">
                                        {goal.done ? "Concluído ✅" : "Pendente ⏳"}
                                    </Badge>
                                    
                                    <div className="flex flex-row items-center justify-between mt-5">
                                        <div>
                                            {goal.done ? (
                                                <ConfirmPedingGoalDialog goalId={goal.id} subjectId={subject.id} />
                                            ) : (
                                                <ConfirmMarkDoneDialog goalId={goal.id}  subjectId={subject.id}/>
                                            )}
                                            <ConfirmDeleteGoalDialog goalId={goal.id} subejctId={subject.id} />
                                        </div>
                                        <p className="text-xs text-right text-muted-foreground">
                                            até {goal.deadline}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            <Separator />

      {/* Anotações */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">📝 Anotações</h2>
            <CreateNoteDialog subjectId={subject.id} />
        </div>

        {subject.notes.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma anotação ainda.</p>
        ) : (
          <div className="space-y-4">
            {subject.notes.map((note, i) => (
              <Card key={i} className="rounded-2xl min-h-[150px]">
                <CardContent className=" flex flex-col justify-between ">
                  <h3 className="font-semibold text-lg">{note.title}</h3>
                  <p className="text-sm text-muted-foreground break-words">{note.content}</p>
                  <div className="flex flex-row items-center justify-end gap-3  mt-5">
                    <ConfirmEditNoteDialog subjectId={subject.id} note={note} noteId={note.id}/>
                    <ConfirmDeleteNoteDialog subjectId={subject.id} noteId={note.id} /> 
                    <p className="text-xs text-right text-muted-foreground">
                        Criado em {note.created_at}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
            
        </div>
    )
}