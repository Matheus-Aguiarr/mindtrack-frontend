import { RegisterForm } from "@/components/register-form";

export function RegisterPage() {
    return ( 
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-md w-full max-w-md">
                <h1 className=" text-white text-2xl font-bold mb-4 text-center">
                    Cadastro
                </h1>
                <RegisterForm /> 
            </div>
        </div>
    )
}