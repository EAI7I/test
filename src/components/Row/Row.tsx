import "./Row.css";

import React, {FC} from "react";

interface RowProps {
    guid: string,
    name: string,
    phone: string,
    email: string,
    address: string,
};


export const Row: FC<RowProps> = ({guid, name, phone, email, address}) => {
    return (
        <tr>
            <td>{guid}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>{address}</td>
        </tr>
    )
};