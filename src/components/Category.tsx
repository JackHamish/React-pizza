import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, setActiveCategory } from "../redux/slices/filterSlice";

const categoryData: string[] = ["All", "Meat", "Vegetarian", "Grill", "Actue", "Closed"];

const Category: React.FC = () => {
    const { category: activeCategory } = useSelector(selectFilter);

    const dispatch = useDispatch();

    return (
        <div className="categories">
            <ul>
                {categoryData.map((category, ind) => (
                    <li
                        key={ind}
                        onClick={() => dispatch(setActiveCategory(ind))}
                        className={activeCategory === ind ? "active" : ""}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Category;
