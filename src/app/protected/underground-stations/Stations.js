"use client";
import Row from "@/components/ui/Row";
import { useEffect, useState } from "react";
import SuggestionItem from "./StationItem";

const Stations = () => {
    const [searchString, setSearchString] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [stationName, setStationName] = useState('');

    const onInputHandler = (ev) => {
        setStationName(ev.target.value);
        setSearchString(ev.target.value.trim());
    }

    const onListClickHandler = (ev) => { ev.preventDefault(); }
    const onBlurHandler = () => { setSuggestions([]); }

    useEffect(() => {
        const _searchString = searchString;
        const timeoutId = setTimeout(async () => {
            if (!_searchString && _searchString.length < 2) {
                return;
            }
            try {
                const response = await fetch('/protected/underground-stations/api',
                    {
                        method: 'POST',
                        body: JSON.stringify({ query: _searchString.trim() }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const data = await response.json();
                setSuggestions(data.suggestions || []);
            } catch (err) {
                console.log(err);
            }
        }, 200);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [searchString]);

    return (
        <Row>
            <input
                className="border mt-9 w-full p-4 rounded"
                placeholder="Укажите название станции метро"
                value={stationName}
                onChange={onInputHandler}
                onBlur={onBlurHandler}
            />
            <ul
                className="shadow-sm"
                onMouseDown={onListClickHandler}
            >
                {suggestions.map((el, id) =>
                    <SuggestionItem
                        key={id}
                        id={id}
                        title={el.value}
                        lineColor={el.data.color}
                        lineName={el.data.line_name}
                        city={el.data.city}
                        onClickHandler={() => {
                            setStationName(el.value);
                            setSearchString('');
                            setSuggestions([]);
                        }}
                    ></SuggestionItem>
                )}
            </ul>
        </Row>
    );
}

export default Stations;