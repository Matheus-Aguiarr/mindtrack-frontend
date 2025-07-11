import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {z} from 'zod'
import { useAuthRegister } from '@/http/use-auth-register';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';


const schema = z.object({
    login: z.string(), 
    password: z.string(), 
})

type FormData = z.infer<typeof schema>; 

export function RegisterForm() { 
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
                <Label htmlFor="login">Login</Label>
                <Input id="login" type="login" {...register("login")}/>
                {errors.login && <p className='text-sm text-red-500'>errors.login.message</p>}
            </div>

            <div>
                <Label htmlFor='password'>Senha</Label>
                <Input id='password' type='password' {...register("password")} />
                {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
            </div>

            {error && <p className='text-sm text-red-500'>{error.message}</p>}

            <Button type="submit" disabled={isPending} className='w-full'>
                {isPending ? "Cadastrando..." : "Cadastrar"}
            </Button>
        </form>
    )
}