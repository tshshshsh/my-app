import { signal } from "@preact/signals-react";

export const theme = signal('orange');

export const themedClasses = {
    orange: {
        bg: 'bg-orange-200',
        menuText: 'text-orange-400',
        bgMenu: 'bg-orange-800',
        button: 'bg-orange-500',
        buttonBright: 'bg-orange-600',
        buttonHovered: 'hover:bg-orange-700'
    },
    pink: {
        bg: 'bg-pink-200',
        menuText: 'text-pink-400',
        bgMenu: 'bg-pink-800',
        button: 'bg-pink-400',
        buttonBright: 'bg-pink-500',
        buttonHovered: 'hover:bg-pink-600'
    },
    white: {
        bg: 'bg-teal-200',
        menuText: 'text-teal-400',
        bgMenu: 'bg-teal-800',
        button: 'bg-teal-400',
        buttonBright: 'bg-teal-500',
        buttonHovered: 'hover:bg-teal-600'
    }
};