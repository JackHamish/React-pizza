import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Paginate.module.scss";

type PaginateProps = {
    currentPage: number;
    handleChangePage: (ind: number) => void;
};

const Paginate: React.FC<PaginateProps> = ({ currentPage, handleChangePage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={({ selected }) => handleChangePage(selected + 1)}
            forcePage={currentPage - 1}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
        />
    );
};

export default Paginate;
