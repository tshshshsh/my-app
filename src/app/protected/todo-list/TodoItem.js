import Button from "@/components/ui/Button";

const TodoItem = (props) => {

    return (
        <li
            key={props.id}
            className='flex items-center mb-2'
        >
            <span
                className={'grow ' + (props.done ? ' line-through' : '')}
                onClick={props.toggleDoneHandler.bind(null, props.id)}
            >
                {props.title}
            </span>
            <Button
                onClick={props.removeItem.bind(null, props.id)}
            >
                -
            </Button>
        </li>
    );
}

export default TodoItem;