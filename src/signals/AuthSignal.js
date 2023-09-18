import { signal } from "@preact/signals-react";

function getCookie(name) {
    if (typeof document !== 'undefined') {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    return null;
}
export const user = signal(getCookie('isAuth'));