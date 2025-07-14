import { Link } from "react-router-dom";
import { LoginForm } from "../components/login-form";
import logo from "../assets/logo-mindtrack.png"

export function Login() { 
    return ( 
        <div className="min-h-screen m-2 flex items-center justify-center ">
            <div className=" p-6 rounded-2xl shadow-md w-full max-w-md bg-accent">
                <img src={logo} alt="" className="w-[50px] h-[50px] rounded-md m-auto my-5"/>
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Faça Login no <span className="text-yellow-500">MindTrack!</span>
                </h1>
                <p className="mb-4 text-center">
                    Acesse sua conta e comece a gerenciar seus estudos agora mesmo!
                </p>
                <LoginForm/>
                <p className="p-2">
                    Não possui uma conta?{" "}
                    <Link to="/register" className="text-yellow-500 hover:underline">
                        Cadastrar-se
                    </Link>
                </p>
            </div>
        </div>
    )
}