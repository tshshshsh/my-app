"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { user } from '@/signals/AuthSignal'

import NavigationItemList from './NavigationItemList';
import Button from '../ui/Button';
import Row from '../ui/Row';

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
    const isUserLogin = !!user.value;
    const router = useRouter();

    async function logout() {
        eraseCookie('isAuth');
        user.value = null;
        router.replace('/login');
    }

    return (
        <nav className="shadow-lg">
            <Row>
                <div className="flex justify-center items-center">
                    {
                        isUserLogin ?
                            <Link href='/'>[ LOREM IPSUM ]</Link> :
                            '[ LOREM IPSUM ]'
                    }
                    <div className='min-h-[4rem] flex justify-end items-center grow'>
                        {
                            isUserLogin && <ul>
                                <NavigationItemList href={'/protected/tic-tac-toe'}>Tic-Tac-Toe</NavigationItemList>
                                <NavigationItemList href={'/protected/todo-list'}>Todo list</NavigationItemList>
                                <NavigationItemList href={'/protected/calculator'}>Calculator</NavigationItemList>
                            </ul>
                        }
                        {
                            isUserLogin ?
                                <Button onClick={logout}>Log out</Button> :
                                <Button>
                                    <Link href="/login">Log in</Link>
                                </Button>
                        }
                    </div>
                </div>
            </Row>
        </nav>
    );
};

export default Navigation;