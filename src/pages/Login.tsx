import { Link } from "react-router-dom";
import { LoginForm } from "../components/login-form";

export function Login() { 
    return ( 
        <div className="min-h-screen flex items-center justify-center ">
            <div className=" p-6 rounded-2xl shadow-md w-full max-w-md bg-zinc-900">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Login
                </h1>
                <LoginForm/>
                <p>
                    Não possui uma conta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Cadastrar-se
                    </Link>
                </p>
            </div>
        </div>
    )
}