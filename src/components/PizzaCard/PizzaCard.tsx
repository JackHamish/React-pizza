import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart, CartItem, SelectCartItemByID } from "../../redux/slices/cartSlice";

const typesName: string[] = ["Traditional", "Thin"];

type PizzaCardProps = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
};

const PizzaCard: React.FC<PizzaCardProps> = ({ title, price, imageUrl, id, types, sizes }) => {
    const dispatch = useDispatch();

    const cartItem = useSelector(SelectCartItemByID(id));

    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);

    const addedCount = cartItem ? cartItem.count : 0;

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            id,
            title,
            price,
            imageUrl,
            type: typesName[activeType],
            size: sizes[activeSize],
            count: addedCount,
        };
        dispatch(addToCart(cartItem));
    };

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <Link to={"/pizza/" + id}>
                    <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
                </Link>
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((type) => (
                            <li
                                key={type}
                                className={activeType === type ? "active" : ""}
                                onClick={() => setActiveType(type)}
                            >
                                {typesName[type]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((size, ind) => (
                            <li
                                className={activeSize === ind ? "active" : ""}
                                key={size}
                                onClick={() => setActiveSize(ind)}
                            >
                                {size} cm.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">
                        <span>from</span> {price} $
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="button button--outline button--add"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Add</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaCard;
