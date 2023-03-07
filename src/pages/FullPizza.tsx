import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Pizza {
    imageUrl: string;
    title: string;
    price: number;
    rating: number;
}

const FullPizza: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pizza, setPizza] = useState<Pizza>();

    useEffect(() => {
        const getFullPizza = async () => {
            try {
                const { data } = await axios.get(
                    `https://6400cab63779a862624d13eb.mockapi.io/Pizzas/` + id
                );
                setPizza(data);
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        };
        getFullPizza();
    }, []);

    return (
        <>
            {pizza && (
                <>
                    <img src={pizza.imageUrl} alt="" />
                    <h1>{pizza.title}</h1>
                    <p>{pizza.price} $</p>
                    <p>{pizza.rating}/10</p>
                </>
            )}
        </>
    );
};

export default FullPizza;
