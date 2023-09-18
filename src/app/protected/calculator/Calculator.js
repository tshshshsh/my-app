"use client";

import { useState } from 'react';
import { evaluate, round } from 'mathjs';

import { theme, themedClasses } from '@/signals/CalculatorTheme';

import CalculatorButton from './CalculatorButton';
import CalculatorRow from './CalculatorRow';
import CalculatorMenuItem from './CalculatorMenuItem';


export default function Calculator() {
    const [curValue, setCurValue] = useState('');
    const themedSettings = themedClasses[theme.value];

    const isOperator = str => /^[\*\/\-\+]$/.test(str);

    const addDigitSymbol = symbol => {
        setCurValue(curValue => curValue + symbol);
    };
    const addMinus = () => {
        setCurValue(curValue => {
            const symbol = '-';
            const lastSymbol = curValue[curValue.length - 1] || '';
            if (['-', '+'].includes(lastSymbol)) {
                return curValue.slice(0, -1) + symbol;
            }
            return curValue + symbol;
        });
    }

    const _addOperator = (curValue, symbol) => {
        if (curValue.length === 0) {
            return curValue;
        }
        const lastSymbol = curValue[curValue.length - 1] || '';

        if (curValue.length < 2 || (lastSymbol === '-' && isOperator(curValue[curValue.length - 2]))) {
            return curValue;
        }
        if (isOperator(lastSymbol)) {
            return curValue.slice(0, -1) + symbol;
        }
        return curValue + symbol;
    }

    const addPlus = () => {
        setCurValue(curValue => _addOperator(curValue, '+'));
    }

    const addMultiplier = () => {
        setCurValue(curValue => _addOperator(curValue, '*'));
    }

    const addDivider = () => {
        setCurValue(curValue => _addOperator(curValue, '/'));
    }

    const removeSymbol = () => {
        setCurValue(curValue => curValue.slice(0, -1));
    };
    const addDot = () => {
        setCurValue(curValue => {
            const numbers = curValue.split(/[\+\-\/\*]/);
            const lastNumber = numbers[numbers.length - 1];

            if (!lastNumber.includes('.')) {
                return curValue + '.'
            }

            return curValue;
        });
    }

    const cleanValue = () => { setCurValue(''); }

    const onEvaluate = () => {
        setCurValue(curValue => {
            let result = curValue;
            try {
                result = evaluate(curValue);
                result = round(result || 0, 6);
            } catch (e) { }

            return '' + result;
        })
    }

    const menuList = [
        { name: 'orange', title: 'apricot' },
        { name: 'pink', title: 'beauty bush' },
        { name: 'white', title: 'white ice' },
    ].map(({ name, title }) =>
        <CalculatorMenuItem
            key={name}
            isActive={name === theme.value}
            onClick={() => { theme.value = name }}>
            {title}
        </CalculatorMenuItem>
    )

    return (
        <div className='w-full max-w-xs mx-auto'>
            <section className={themedSettings.bg}>
                <div className='flex relative pt-7 px-7 pb-3'>
                    <div className={themedSettings.menuText}>calci</div>
                    <div className={`absolute right-7 top-7 ${themedSettings.menuText} group`}>
                        <div className='cursor-pointer'>&#9776;</div>
                        <div className={`absolute right-0 w-[calc(320px-2.25rem*2)] max-w-[calc(100vw-1.75rem*2)] z-10 p-5 text-center ${themedSettings.bgMenu} rounded transition-all origin-top-right scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100`}>
                            <span>Theme: </span>
                            <ul>
                                {menuList}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='flex relative overflow-hidden justify-end px-7 pb-7'>
                    <div className={`relative right-0 whitespace-nowrap ${themedSettings.menuText} text-5xl`}>
                        {curValue || 0}
                    </div>
                </div>
            </section>
            <section>
                <CalculatorRow>
                    <CalculatorButton width="2" onClick={cleanValue}>AC</CalculatorButton>
                    <CalculatorButton onClick={removeSymbol}>del</CalculatorButton>
                    <CalculatorButton onClick={addDivider}>/</CalculatorButton>
                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton onClick={addDigitSymbol}>7</CalculatorButton>
                    <CalculatorButton onClick={addDigitSymbol}>8</CalculatorButton>
                    <CalculatorButton onClick={addDigitSymbol}>9</CalculatorButton>
                    <CalculatorButton onClick={addMultiplier}>x</CalculatorButton>
                </CalculatorRow>
                <CalculatorRow>
                    <CalculatorButton onClick={addDigitSymbol}>4</CalculatorButton>
                    <CalculatorButton onClick={addDigitSymbol}>5</CalculatorButton>
                    <CalculatorButton onClick={addDigitSymbol}>6</CalculatorButton>
                    <CalculatorButton onClick={addMinus}>-</CalculatorButton>
                </CalculatorRow >

                <CalculatorRow>
                    <CalculatorButton onClick={addDigitSymbol}>1</CalculatorButton>
                    <CalculatorButton onClick={addDigitSymbol}>2</CalculatorButton>
                    <CalculatorButton onClick={addDigitSymbol}>3</CalculatorButton>
                    <CalculatorButton onClick={addPlus}>+</CalculatorButton>
                </CalculatorRow >
                <CalculatorRow>
                    <CalculatorButton onClick={addDigitSymbol}>0</CalculatorButton>
                    <CalculatorButton onClick={addDot}>.</CalculatorButton>
                    <CalculatorButton onClick={onEvaluate} width="2">=</CalculatorButton>
                </CalculatorRow >
            </section >
        </div >
    );
}