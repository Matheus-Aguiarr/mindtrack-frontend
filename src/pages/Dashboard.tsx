import { ConfirmDeleteSubjectDialog } from "@/components/confirm-delete-subject-dialog";
import { ConfirmEditSubjectDialog } from "@/components/confirm-edit-subject-dialog";
import { CreateSubjectDialog } from "@/components/create-subject-dialog";
import { DashboardHeader } from "@/components/dashboard-header";
import { SettingsDropdown } from "@/components/settings-dropdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSubjects } from "@/http/use-get-subjects"
import { useNavigate } from "react-router-dom";


export function Dashboard() {
    const { data: subjects, isLoading, error } = useGetSubjects();
    const navigate = useNavigate();

    if(isLoading) { 
        return <p className="text-center mt-10">Carregando suas matérias...</p>
    }

    if (error) { 
        return <p className="text-center text-red-500 mt-10">Erro ao carregar matérias.</p>
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-10 ">
        
        <DashboardHeader />
        
          <h1 className="text-3xl text-center font-semibold mb-6 mt-6">Suas <span className="">Matérias</span></h1>
        
        <CreateSubjectDialog />

        {subjects && subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {subjects.map((subject, i) => (
              <Card key={i} className="rounded-2xl min-h-[240px] shadow-md hover:shadow-lg transition cursor-pointer" >
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <h2 className="text-xl font-semibold">{subject.name}</h2>
                  <p className="text-sm text-muted-foreground">{subject.description}</p>

                  <div className="flex gap-2 mt-3 flex-wrap">
                    <Badge variant="outline">
                      🎯 {subject.goals.length} objetivo{subject.goals.length > 1 ? "(s)" : ""}
                    </Badge>
                    <Badge variant="outline">
                      📝 {subject.notes.length} anotação{subject.notes.length > 1 ? "(s)" : ""}
                    </Badge>
                  </div>
                  <div className="flex flex-row justify-between mt-2">
                    <div className="flex flex-row gap-2">
                      <ConfirmEditSubjectDialog subject={subject} subjectId={subject.id} /> 
                      <ConfirmDeleteSubjectDialog subjectId={subject.id} />
                    </div>
                    <div>
                      <Button onClick={() => navigate(`/subject/${subject.id}`)} className="cursor-pointer">
                        Ver matéria
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
      ) : (
        <p>Você ainda não tem nenhuma matéria cadastrada.</p>
      )}
    </div>
    )
}