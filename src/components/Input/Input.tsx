import "./Input.css";
import React, {ChangeEvent, FC} from "react";

interface InputProps {
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};


export const Input:FC<InputProps> = ({onSearch}) => {
    return (
        <div className="input__wrapper">
            <h4>Search:</h4>
            <input type="text" onChange={onSearch}/>
        </div>
    )
};