import { useReducer } from "react";


const initialValue = {
    value: '',
    isValid: false,
    isTouched: false
};

export default function useInput({ validation = () => true }) {


    const [state, dispatch] = useReducer(reducer, initialValue);

    function reducer(state, { type, value }) {
        switch (type) {
            case 'blur':
                return {
                    ...state,
                    isTouched: true
                };
            case 'set-value':
                return {
                    ...state,
                    isValid: validation(value),
                    value: value
                };
            case 'reset':
                return initialValue;
            default:
                return initialValue;
        }
    }

    function blurHandler() {
        dispatch({ type: 'blur' });
    }

    function changeValueHandler(event) {
        dispatch({ type: 'set-value', value: event.target.value })
    }

    function resetHadler() {
        dispatch({ type: 'reset' });
    }


    return {
        value: state.value,
        isValid: state.isValid,
        hasErrorUI: state.isTouched && !state.isValid,
        blurHandler,
        changeValueHandler,
        resetHadler
    }
}