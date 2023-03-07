import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SortState, selectFilter, setActiveSort } from "../redux/slices/filterSlice";

export const menue: SortState[] = [
    { name: "popularity (asc)", sortProperty: "rating", order: "asc" },
    { name: "popularity (desc)", sortProperty: "rating", order: "desc" },
    { name: "price (asc)", sortProperty: "price", order: "asc" },
    { name: "price (desc)", sortProperty: "price", order: "desc" },
    { name: "a-z (asc)", sortProperty: "title", order: "asc" },
    { name: "a-z (desc)", sortProperty: "title", order: "desc" },
];

const Sort: React.FC = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const { sort: activeSort } = useSelector(selectFilter);
    const sortRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const handleClickMenueItem = (sort: SortState) => {
        dispatch(setActiveSort(sort));
        setIsOpened(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                setIsOpened(false);
            }
        };
        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>By:</b>
                <span onClick={() => setIsOpened(!isOpened)}>{activeSort.name}</span>
            </div>
            {isOpened && (
                <div className="sort__popup">
                    <ul>
                        {menue.map((sort, ind) => (
                            <li
                                key={ind}
                                onClick={() => handleClickMenueItem(sort)}
                                className={activeSort.name === sort.name ? "active" : ""}
                            >
                                {sort.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;
