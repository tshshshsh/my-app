export default function CalculatorRow(props) {
    return (
        <div className="flex h-[25vw] max-h-20">
            {props.children}
        </div>
    );
}