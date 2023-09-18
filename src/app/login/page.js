import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import LoginForm from "@/app/login/LoginForm";

export default function LoginPage() {

    const isAuth = (cookies().get('isAuth') || {}).value === 'true';
    if (isAuth) {
        redirect('/');
    }

    return (<LoginForm />)
}