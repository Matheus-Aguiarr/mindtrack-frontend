import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from "./ui/label";
import {z} from 'zod'
import { useAuthRegister } from '@/http/use-auth-register';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { InputWithIcon } from './ui/input-with-icon';
import { Eye, EyeOff, KeyRoundIcon, Mail } from 'lucide-react';
import { useState } from 'react';


const schema = z.object({
    login: z.string(), 
    password: z.string()
        .min(6)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            'A senha deve conter: letra maiúscula, letra minúscula, número e caractere especial.'
        ),
    confirmation: z.string()
}).refine((data) => data.password === data.confirmation, {
    message: "As senhas não conferem",
    path: ["confirmation"]
});

type FormData = z.infer<typeof schema>; 

export function RegisterForm() { 

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }
    
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema), 
    })

    const { mutate, isPending, error } = useAuthRegister();

    const onSubmit = (data: FormData) => {
        mutate({...data,role: "USER"}, {
            onSuccess: () => {
                navigate("/"); // volta para a tela de login
            }
        });
    }


    return ( 
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto mt-10">
            <div className="">
                <Label htmlFor="login" className='p-1'>Login</Label>
                <InputWithIcon 
                id="login" 
                type="login" 
                {...register("login")}
                icon={<Mail size={16}/>}
                placeholder='seu@email.com'
            />
                {errors.login && <p className='text-sm text-red-500'>errors.login.message</p>}
            </div>

            <div>
                <Label htmlFor='password' className='p-1'>Senha</Label>
                <InputWithIcon 
                id='password' 
                type={showPassword ? 'text' : 'password'} 
                {...register("password")} 
                icon={<KeyRoundIcon size={16}/>}
                iconRight={
                    <button type='button' onClick={toggleShowPassword} tabIndex={-1} className='cursor-pointer p-2'>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18}/>}
                    </button>
                }
                placeholder='Senha'
            />
                {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
            </div>

            <div>
                <Label htmlFor='confirmation' className='p-1'>Confirme a senha</Label>
                <InputWithIcon 
                id='confirmation' 
                type={showPassword ? 'text' : 'password'} 
                {...register("confirmation")} 
                icon={<KeyRoundIcon size={16}/>}
                iconRight={
                    <button type='button' onClick={toggleShowPassword} tabIndex={-1} className='cursor-pointer p-2'>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18}/>}
                    </button>
                }
                placeholder='Senha'
            />
                {errors.confirmation && <p className='text-sm text-red-500'>{errors.confirmation.message}</p>}
            </div>

            {error && <p className='text-sm text-red-500'>{error.message}</p>}

            <Button type="submit" disabled={isPending} className='w-full  bg-yellow-500 hover:bg-yellow-600 shadow-lg shadow-yellow-500/25 cursor-pointer' >
                {isPending ? "Cadastrando..." : "Cadastrar"}
            </Button>
        </form>
    )
}