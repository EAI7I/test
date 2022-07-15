import "./Pagination.css";

import React, {FC} from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import {RowProps} from "../../models/Row";

interface PaginationProps {
    onPageChange: (page: number) => void,
    totalCount: number,
    siblingCount: number,
    currentPage: number,
    pageSize: number,
    search: RowProps[],
    notFound: boolean
};


const Pagination:FC<PaginationProps> = ({onPageChange, totalCount, siblingCount, currentPage, pageSize, search, notFound}) => {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    return (
        <ul>
            <li onClick={() => currentPage === 1 ? null : onPrevious()}>
                <div className="arrow_left">←</div>
            </li>
            {!notFound && paginationRange && paginationRange.map((pageNumber: string | number) => {
                if (search.length !== 0 && search.length < pageSize) {
                    return <></>
                } else {
                    if (pageNumber === DOTS) {
                        return <li className="pagination-item dots">&#8230;</li>;
                    }
                    return (
                        <>
                            <li className={currentPage === +pageNumber ? "active" : ""} onClick={() => onPageChange(+pageNumber)}>
                                {pageNumber}
                            </li>
                        </>
                    )
                }
            })}
            <li onClick={() => currentPage === totalCount/pageSize ? null : onNext()}>
                <div className="arrow_right">→</div>
            </li>
        </ul>
    );
};

export default Pagination;
