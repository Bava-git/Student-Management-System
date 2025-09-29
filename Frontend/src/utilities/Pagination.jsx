import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

function Pagination({ itemsPerPage, items, onPageChange }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        resetPageNo();
    }, [items]);

    const resetPageNo = () => {
        setItemOffset(0);
        setCurrentPage(0);
    }

    useEffect(() => {
        ItemsGenerator();
    }, [itemOffset, itemsPerPage, items]);

    const ItemsGenerator = () => {
        const endOffset = itemOffset + itemsPerPage;
        onPageChange(items.slice(itemOffset, endOffset));
    }

    const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage)); // Ensure at least 1

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
        setCurrentPage(event.selected);
    };

    return (
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            forcePage={Math.min(currentPage, pageCount - 1)} // Prevent invalid index
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            activeClassName={"selected"}
            disabledClassName={"disabled"}
        />
    );
}

export default Pagination;


