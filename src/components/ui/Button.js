export default function Button({ className, children, ...other }) {

    const calculatedClassName = 'py-1.5 px-4 text-white font-bold bg-black rounded transition-all hover:scale-110' + (className ? ' ' + className : '');

    return (
        <button
            className={calculatedClassName}
            {...other}
        >
            {children}
        </button>
    )
}