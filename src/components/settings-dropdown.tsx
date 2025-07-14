import { Moon, Settings, Sun, User, UserCog } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function SettingsDropdown() {
    const {theme, setTheme} = useTheme();
    const navigate = useNavigate();

    return (
        <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"lg"}>
                        <UserCog size={40} />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-48">
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        Ver perfil
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        {theme === "light" ? (
                            <>
                                <Moon className="mr-2 h-4 w-4" />
                                Tema escuro
                            </>

                        ) : (
                            <>
                                <Sun className="mr-2 h-4 w-4" />
                                Tema claro
                            </>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    )
}