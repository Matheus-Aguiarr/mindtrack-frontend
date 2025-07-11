import { RegisterForm } from "@/components/register-form";
import { Link } from "react-router-dom";

export function RegisterPage() {
    return ( 
        <div className="min-h-screen flex items-center justify-center">
            <div className=" p-6 rounded-2xl shadow-md w-full max-w-md bg-accent">
                <h1 className="  text-2xl font-bold mb-4 text-center">
                    Crie sua conta no MindTrack! 
                </h1>
                <p className="mb-4 text-center">
                    Crie sua conta e comece a gerenciar seus estudos agora mesmo!
                </p>
                <RegisterForm /> 
                <p className="p-2">
                    Já possui uma conta? {" "}
                    <Link to="/" className="text-blue-600 hover:underline">
                        Fazer Login
                    </Link>
                </p>
            </div>
        </div>
    )
}