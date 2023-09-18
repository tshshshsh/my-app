'use client';

import { useState, useEffect } from "react";

import TodoItem from './TodoItem';
import AddNewItem from './AddNewItem';
import Filter from './Filter';
import Card from "@/components/ui/Card";

export default function Todo() {

    const [todoListData, setTodoListData] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = localStorage.getItem('todoList');
        if (data) {
            try {
                setTodoListData(JSON.parse(data));
            } catch (e) {

            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoListData));
    }, [todoListData])

    const toggleDoneHandler = (itemId) => {
        setTodoListData(current => {
            const item = current.find(({ id }) => id === itemId);
            item.done = !item.done;
            return [...current];
        });
    }

    const removeItemHandler = (itemId) => {
        setTodoListData(current => {
            return [...current.filter(({ id }) => id !== itemId)];
        });
    }

    const addNewItemHandler = (newValue) => {
        setTodoListData((current) => {
            return [...current, {
                id: (+new Date()).toString(),
                title: newValue,
                done: false
            }];
        });
    }

    const onFilterChangeHandler = (filterId) => {
        setActiveFilter(filterId);
    }

    const getFilteredTodoListData = () => {
        switch (activeFilter) {
            case 'active':
                return todoListData.filter(({ done }) => !done);
            case 'done':
                return todoListData.filter(({ done }) => done);
        }
        return todoListData;
    }

    const listItems = getFilteredTodoListData()
        .map(item => (<TodoItem key={item.id} {...item} toggleDoneHandler={toggleDoneHandler} removeItem={removeItemHandler} />));

    const listContent = (
        <>
            <AddNewItem addNewItem={addNewItemHandler} />
            <ul className="">{listItems}</ul>
        </>
    );
    return (
        <Card>
            <div className='flex'>
                <h2 className='grow'>Todo app</h2>
                <Filter activeFilter={activeFilter} onFilterChange={onFilterChangeHandler} />
            </div>
            {isLoading ? <p>Loading...</p> : listContent}
        </Card>
    );
}