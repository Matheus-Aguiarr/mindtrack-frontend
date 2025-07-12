import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge'
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSubjectById } from "@/http/use-get-subject-by-id";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom"
import { CreateGoalDialog } from "@/components/create-goal-dialog";
import { CreateNoteDialog } from "@/components/create-note-dialog";

export function SubjectDetails() {
    const { id } = useParams(); // pega o id dos parametros
    const numericId = id ? Number(id) : undefined;
    const { data: subject, isLoading, error} = useGetSubjectById(numericId); 

    if (isLoading) { 
        return ( 
            <div className="mx-w-4xl mx-auto px-4 mt-10 space-y-4"> 
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-6 w-full" /> 
                <Skeleton className="h-32 w-full" /> 
            </div>
        )
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
                            <Card key={goal.id} className="rounded-2xl">
                                <CardContent className="p-4 space-y-1">
                                    <h3 className="font-semibold text-lg">
                                        {goal.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {goal.description}
                                    </p>
                                    <Badge variant={goal.done ? "default" : "outline"} className="mt-2">
                                        {goal.done ? "Concluído ✅" : "Pendente ⏳"}
                                    </Badge>
                                    <p className="text-xs text-right text-muted-foreground">
                                        até {goal.deadline}
                                    </p>
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
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-4 space-y-1">
                  <h3 className="font-semibold text-lg">{note.title}</h3>
                  <p className="text-sm text-muted-foreground">{note.content}</p>
                  <p className="text-xs text-right text-muted-foreground">
                    Criado em {note.created_at}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
            
        </div>
    )
}