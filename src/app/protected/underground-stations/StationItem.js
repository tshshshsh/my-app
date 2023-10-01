"use client";
const StationItem = ({ id, title, onClickHandler, lineColor, lineName, city }) => {
    return (
        <li
            className="px-4 py-2 cursor-pointer border-slate-100 border-b"
            key={id}
            onClick={onClickHandler}
        >
            <div>
                {title}
                <span
                    className="inline-block h-0.5 w-10 mb-1 ml-3"
                    style={{ background: '#' + lineColor }}
                />
            </div>
            <div className="text-xs text-slate-400">
                {lineName}, {city}
            </div>
        </li >
    );
};
export default StationItem;