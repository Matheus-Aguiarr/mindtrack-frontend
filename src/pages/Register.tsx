import { RegisterForm } from "@/components/register-form";
import { Link } from "react-router-dom";
import logo from "../assets/logo-mindtrack.png"

export function RegisterPage() {
    return ( 
        <div className="min-h-screen flex items-center justify-center ">
            <div className=" p-6 rounded-2xl shadow-md w-full max-w-md bg-accent">
                <img src={logo} alt="" className="w-[50px] h-[50px] rounded-md m-auto my-5"/>
                <h1 className="  text-2xl font-bold mb-4 text-center">
                    Crie sua conta no <span className="text-yellow-500">MindTrack! </span>
                </h1>
                <p className="mb-4 text-center">
                    Crie sua conta e comece a gerenciar seus estudos agora mesmo!
                </p>
                <RegisterForm /> 
                <p className="p-2">
                    Já possui uma conta? {" "}
                    <Link to="/" className="text-yellow-500 hover:underline">
                        Fazer Login
                    </Link>
                </p>
            </div>
        </div>
    )
}