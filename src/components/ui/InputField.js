export default function InputField(props) {
    let errorClassName = props.hasError && 'text-rose-800 border-rose-900 focus:text-black';

    return (
        <div>
            <label className='block mb-3'>
                {props.title}
            </label>
            <input
                className={'w-full mb-4 px-6 py-4 shadow-sm border border-stone-500 rounded ' + errorClassName}
                type={props.type}
                value={props.value}
                onChange={props.changeValueHandler}
                onBlur={props.blurHandler}
            />
        </div>
    );
};