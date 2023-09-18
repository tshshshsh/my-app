const FILTER_TYPES = [
    { id: 'all', title: 'All' },
    { id: 'active', title: 'Active' },
    { id: 'done', title: 'Done' }
];

export default function Filter(props) {

    const filters = FILTER_TYPES.map(item => {
        let className = "px-1";
        if (props.activeFilter === item.id) {
            className += " font-bold";
        }
        return (
            <span
                key={item.id}
                className={className}
                onClick={props.onFilterChange.bind(null, item.id)}
            >
                {item.title}
            </span>
        );
    });


    return (
        <div>{filters}</div>
    );
}