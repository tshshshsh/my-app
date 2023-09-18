'use client';
import useInput from '@/hooks/useInput';


import InputField from "../../components/ui/InputField";
import Card from "../../components/ui/Card";
import Button from '../../components/ui/Button';
import { useRouter } from 'next/navigation';

import { user } from '@/signals/AuthSignal';

export default function LoginForm() {
    const router = useRouter();

    const {
        value: userValue,
        isValid: userIsValid,
        hasErrorUI: userHasError,
        resetHadler: userResetHandler,
        ...userHandler
    } = useInput({ validation: value => value && value.trim().length >= 5 });


    const {
        value: pwdValue,
        isValid: pwdIsValid,
        hasErrorUI: pwdHasError,
        resetHadler: pwdResetHandler,
        changeValueHandler: pwdChangeValue,
        ...pwdHandler
    } = useInput({ validation: value => value && value.trim().length >= 5 });

    const onSubmitHandler = async (ev) => {
        ev.preventDefault();
        const userData = {
            login: userValue,
            password: pwdValue
        };
        try {
            const response = await fetch('/api/login',
                {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            const data = await response.json();
            if (!data.isSuccess) {
                throw new Error('No user');
            }
            user.value = userData;
            router.replace('/');
            return;

        } catch (error) { }
        pwdChangeValue({ target: { value: '' } })
        alert('Wrong user name or password');
    };


    const isFormValid = userIsValid && pwdIsValid;

    return (
        <Card>
            <form onSubmit={onSubmitHandler}>
                <InputField
                    title={'User name'}
                    name={'user'}
                    type={'text'}
                    value={userValue}
                    hasError={userHasError}
                    {...userHandler}
                />
                <InputField
                    title={'Password'}
                    name={'password'}
                    type={'password'}
                    value={pwdValue}
                    hasError={pwdHasError}
                    changeValueHandler={pwdChangeValue}
                    {...pwdHandler}
                />
                <Button type="submit" disabled={!isFormValid}>Login</Button>
            </form>
        </Card>
    );

}