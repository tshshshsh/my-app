import { NextResponse } from 'next/server';
import usersData from '@/app/dataUsers.json';
import { cookies } from 'next/headers';

const users = usersData.users || [];


export async function POST(request) {
    const body = await request.json();
    const user = users.find(item => item.name === body.login && item.key === body.password);
    const isUserExist = !!user;
    if (isUserExist) {
        //TODO userId & isAuth дублирующая информация. 
        cookies().set('isAuth', 'true');
        cookies().set('userId', body.login)
    } else {
        cookies().delete('isAuth');
        cookies().delete('userId')
    }

    return NextResponse.json({ isSuccess: !!user });
}