import "./RecordsPage.css";
import {ChangeEvent, FC} from "react";

interface RecordsPageProps {
    pageSize: number,
    setPageSize: (pageSize: number) => void
}

export const RecordsPage: FC<RecordsPageProps> = ({pageSize, setPageSize}) => {

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPageSize(+value);
    };

    return (
        <div className="records__count">
            <select onChange={onChange}>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
            </select>
            <h4>records per page</h4>
        </div>
    )
};