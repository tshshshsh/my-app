"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import useAuthStore from '@/store/AuthStore';

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

const Navigation = () => {
    const [isClient, setIsClient] = useState(false)
    const { user, setUser } = useAuthStore();

    const isUserLogin = isClient && !!user;
    const router = useRouter();

    async function logout() {
        eraseCookie('isAuth');
        eraseCookie('userId');
        setUser(null, null);
        router.replace('/login');
    }

    useEffect(() => {
        setIsClient(true);
    }, [])

    return (
        <nav className='shadow-lg'>
            <div className="navbar bg-base-100  row">
                <div className="navbar-start">
                    {isUserLogin && <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a>My first projects</a>
                                <ul className="p-2">
                                    <li><Link href={'/protected/tic-tac-toe'}>Tic-Tac-Toe</Link></li>
                                    <li><Link href={'/protected/todo-list'}>Todo List</Link></li>
                                    <li><Link href={'/protected/calculator'}>Calculator</Link></li>
                                </ul>
                            </li>
                            <li><Link href={'/protected/underground-stations'}>Underground stations</Link>
                            </li>
                        </ul>
                    </div>}
                    {
                        isUserLogin ?
                            <Link className="btn btn-ghost normal-case text-xl" href="/">[LOREM IPSUM]</Link> :
                            <a>[LOREM IPSUM]</a>
                    }
                </div>



                <div className="navbar-end">
                    {isUserLogin && <ul className="menu menu-horizontal px-1 hidden lg:flex mr-3">
                        <li tabIndex={0}>
                            <details>
                                <summary>My first projects</summary>
                                <ul className="p-2">
                                    <li><Link href={'/protected/tic-tac-toe'}>Tic-Tac-Toe</Link></li>
                                    <li><Link href={'/protected/todo-list'}>Todo List</Link></li>
                                    <li><Link href={'/protected/calculator'}>Calculator</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link href={'/protected/underground-stations'}>Underground stations</Link></li>
                    </ul>}
                    {
                        isUserLogin ?
                            <a className="btn btn-neutral btn-sm" onClick={logout}>Log out</a> :
                            <Link className="btn btn-neutral btn-sm" href="/login">Log in</Link>
                    }
                </div>
            </div>
        </nav>
    );
};
export default Navigation;