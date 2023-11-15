export default function CalculatorMenuItem(props) {
    const isActiveClasses = props.isActive ?
        'opaciy-100 font-bold' :
        'opacity-60';
    return (
        <li
            key={props.id}
            className={`relative block cursor-pointer ${isActiveClasses} before:absolute after:absolute before:bottom-0 after:bottom-0 before:block after:block before:h-[1px] after:h-[1px] hover:before:w-1/4 hover:before:opacity-100 hover:after:w-1/4 hover:after:opacity-100 before:bg-slate-200 after:bg-slate-200 after:bg-slate before:transition-all after:transition-all before:left-1/2 after:right-1/2 before:opacity-0 after:opacity-0 before:w-0 after:w-0`}
            onClick={props.onClick}
        >
            {props.children}
        </li>
    );
}