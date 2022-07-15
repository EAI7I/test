import './App.css';

import React, {ChangeEvent, useMemo, useState} from 'react';
import Pagination from "./components/Pagination/Pagination";
import {Row} from "./components/Row/Row";
import {RowProps} from "./models/Row";
import {RecordsPage} from "./components/RecordsPage/RecordsPage";
import {Input} from "./components/Input/Input";

import gererated from "./data/gererated.json";


function App() {

    const titles = [
        {
            guid: "Guid",
            name: "Name",
            phone: "Phone",
            email: "Email",
            address: "Address",
        },
    ];

    // Флаги сделаны для сортировки в обе стороны
    const [guidFlag, setGuidFlag] = useState<boolean>(false);
    const [nameFlag, setNameFlag] = useState<boolean>(false);
    const [phoneFlag, setPhoneFlag] = useState<boolean>(false);
    const [emailFlag, setEmailFlag] = useState<boolean>(false);
    const [addressFlag, setAddressFlag] = useState<boolean>(false);

    const [pageSize, setPageSize] = useState<number>(10);
    const [search, setSearch] = useState<RowProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [notFound, setNotFound] = useState<boolean>(false);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = +firstPageIndex + +pageSize;
        if (search.length > 0)
            return search.slice(firstPageIndex, lastPageIndex);
        else
            return gererated.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, guidFlag, nameFlag, phoneFlag, emailFlag, addressFlag, search, pageSize]);

    const onSort = (id: number) => {
        switch (id) {
            case 0:
                return onSortRow(guidFlag, setGuidFlag, id)
            case 1:
                return onSortRow(nameFlag, setNameFlag, id)
            case 2:
                return onSortRow(phoneFlag, setPhoneFlag, id)
            case 3:
                return onSortRow(emailFlag, setEmailFlag, id)
            case 4:
                return onSortRow(addressFlag, setAddressFlag, id)
        }
    };

    const onSortRow = (flag: boolean, setFlag: (flag: boolean) => void, id: number) => {
        setFlag(!flag);
        return gererated.sort((a: RowProps, b: RowProps) => {
            if (id === 0)
                return flag ? a.guid < b.guid ? 1 : -1 : a.guid > b.guid ? 1 : -1
            else if (id === 1)
                return flag ? a.name < b.name ? 1 : -1 : a.name > b.name ? 1 : -1
            else if (id === 2)
                return flag ? a.phone < b.phone ? 1 : -1 : a.phone > b.phone ? 1 : -1
            else if (id === 3)
                return flag ? a.email < b.email ? 1 : -1 : a.email > b.email ? 1 : -1
            else
                return flag ? a.address < b.address ? 1 : -1 : a.address > b.address ? 1 : -1
        });
    };

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length !== 0) {
            setNotFound(false)
            const filterList = gererated.filter(item =>
                item.guid.toLowerCase().includes(e.target.value.toLowerCase()) || item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.phone.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.toLowerCase().includes(e.target.value.toLowerCase()) || item.address.toLowerCase().includes(e.target.value.toLowerCase())
            );
            if (filterList.length === 0) {
                setNotFound(true)
            } else {
                setCurrentPage(1);
                setSearch(filterList);
            }
        } else {
            setSearch([])
        }
    };

    return (
        <div className="main">
            <div className="main__wrapper">
                <div className="options">
                    <RecordsPage pageSize={pageSize} setPageSize={setPageSize}/>
                    <Input onSearch={onSearch}/>
                </div>

                <table className="table">
                    <tbody>
                    {!notFound && titles.map((title, key: number) => (
                        <tr key={key}>
                            <th onClick={() => onSort(0)}>{title.guid}</th>
                            <th onClick={() => onSort(1)}>{title.name}</th>
                            <th onClick={() => onSort(2)}>{title.phone}</th>
                            <th onClick={() => onSort(3)}>{title.email}</th>
                            <th onClick={() => onSort(4)}>{title.address}</th>
                        </tr>
                    ))}
                    {!notFound && currentTableData.map((row: RowProps, key: number) => (
                        <Row guid={row.guid} name={row.name} phone={row.phone} email={row.email} address={row.address}
                             key={key}/>
                    ))}
                    </tbody>
                </table>
                {notFound && <h2>Nothing found :(</h2>}
                <Pagination
                    currentPage={currentPage}
                    totalCount={search.length === 0 ? gererated.length : search.length}
                    siblingCount={1}
                    pageSize={pageSize}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    search={search}
                    notFound={notFound}
                />
            </div>
        </div>
    );
}

export default App;
