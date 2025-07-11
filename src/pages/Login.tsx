import { Link } from "react-router-dom";
import { LoginForm } from "../components/login-form";

export function Login() { 
    return ( 
        <div className="min-h-screen flex items-center justify-center ">
            <div className=" p-6 rounded-2xl shadow-md w-full max-w-md bg-accent">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Faça Login no MindTrack!
                </h1>
                <p className="mb-4 text-center">
                    Acesse sua conta e comece a gerenciar seus estudos agora mesmo!
                </p>
                <LoginForm/>
                <p className="p-2">
                    Não possui uma conta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Cadastrar-se
                    </Link>
                </p>
            </div>
        </div>
    )
}