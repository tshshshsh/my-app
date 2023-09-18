import { useState, createRef } from "react";

export default function AddNewItem(props) {
    const [value, setValue] = useState('');
    const inputRef = createRef(null);

    const onBlurHandler = () => {
        if (value.trim().length) {
            props.addNewItem(value.trim());
        }
        setValue('');
    }

    const onChangeHandler = (event) => {
        setValue(event.target.value);
    }

    const onKeyDownHandler = (event) => {
        if (event.code === 'Enter') {
            inputRef.current.blur();
        }
    }

    return (
        <input
            ref={inputRef}
            className='my-5 py-4 w-full outline-0'
            type="text"
            placeholder="Add a todo..."
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            value={value}
            onBlur={onBlurHandler} />
    );
}