import { NextResponse } from 'next/server';
import usersData from '@/app/dataUsers.json';
import { cookies } from 'next/headers';

const users = usersData.users || [];


export async function POST(request) {
    const body = await request.json();
    const user = users.find(item => item.name === body.login && item.key === body.password);
    const isUserExist = !!user;
    if (isUserExist) {
        cookies().set('isAuth', 'true');
    } else {
        cookies().delete('isAuth')
    }

    return NextResponse.json({ isSuccess: !!user });
}