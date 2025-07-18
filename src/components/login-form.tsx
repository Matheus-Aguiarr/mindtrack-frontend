import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from "./ui/label";
import {z} from 'zod'
import { useAuthLogin } from '@/http/use-auth-login';
import { Button } from './ui/button';
import { Eye, EyeOff, KeyRoundIcon, Mail } from 'lucide-react'
import { InputWithIcon } from './ui/input-with-icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from './ui/checkbox';


const schema = z.object({
    login: z.string(), 
    password: z.string()
})

type FormData = z.infer<typeof schema>; 

export function LoginForm() { 
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema), 
    })

    const { mutate, isPending, error } = useAuthLogin();

    const onSubmit = (data: FormData) => {
        mutate(data, {
            onSuccess: (data) => {
                localStorage.setItem("token", data.token); 
                navigate("/dashboard");
            }
        });
    }


    return ( 
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto mt-10">
            <div className="">
                <Label htmlFor="login" className='p-1'>Login</Label>
                <InputWithIcon 
                icon={<Mail size={16}/>} 
                id="login" 
                type="login" 
                {...register("login")} 
                placeholder='seu@email.com' 
            />
                {errors.login && <p className='text-sm text-red-500'>errors.login.message</p>}
            </div>

            <div>
                <Label htmlFor='password' className='p-1'>Senha</Label>
                <InputWithIcon 
                    icon={<KeyRoundIcon size={16}/>} 
                    id='password' 
                    type={showPassword ? "text" : "password"} 
                    {...register("password")} 
                    placeholder='Senha' 
                    iconRight={
                        <button type='button' onClick={toggleShowPassword} tabIndex={-1} className='cursor-pointer p-2'>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    }
                />
                {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
            </div>

            <div>
                <Checkbox className='mr-2'/>
                Lembrar-me
            </div>

            {error && <p className='text-sm text-red-500'>Erro ao realizar login.</p>}

            <Button type="submit" disabled={isPending} className='w-full bg-yellow-500 hover:bg-yellow-600 shadow-lg shadow-yellow-500/25 cursor-pointer'>
                {isPending ? "Entrando..." : "Entrar"}
            </Button>
        </form>
    )
}