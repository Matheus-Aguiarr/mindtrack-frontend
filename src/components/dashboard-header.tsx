import { useNavigate } from "react-router-dom"
import logo from "@/assets/logo-mindtrack.png"
import { Button } from "./ui/button";
import { LogOut} from "lucide-react";
import { SettingsDropdown } from "./settings-dropdown";

export function DashboardHeader() { 
    const navigate = useNavigate();
    

    const handleLogout = () => { 
        localStorage.removeItem("token");
        navigate("/");
    }
    return ( 
        <header className="pb-4 border-b">



            <div className="flex flex-row justify-between items-center">
                <SettingsDropdown />
                
                <div className="flex gap-4 items-center">
                    <Button variant={"outline"} onClick={handleLogout} className="gap-2">
                        <LogOut size={30} />
                        Sair
                    </Button>
                </div>
            </div>
        </header>
    )
}