import useCalculatorThemeStore from '@/store/CalculatorThemeStore';

export default function CalculatorButton(props) {
    const getStyle = useCalculatorThemeStore((state) => state.getStyle)
    const themeSettings = getStyle();

    const widthClass = props.width ? 'w-1/2' : 'w-1/4';
    const bgClass = props.width ? themeSettings.buttonBright : themeSettings.button;


    let onClickHandler = null;
    if (props.onClick) {
        onClickHandler = props.onClick.bind(null, props.children);
    }
    return (
        <div
            className={`relative ${widthClass} ${bgClass} ${themeSettings.buttonHovered} text-white cursor-pointer`}
            onClick={onClickHandler}
        >
            <span className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-3xl">
                {props.children}
            </span>
        </div>
    );
}