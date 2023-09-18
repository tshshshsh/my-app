export default function Square({ value, onSquareClick, isActive }) {

    const className = 'w-20 h-20 border-black text-4xl border' + (isActive ? ' text-rose-600' : '');

    return (
        <button className={className} onClick={onSquareClick}>{value}</button>

    )
}