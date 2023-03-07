import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from "qs";

import Category from "../components/Category";
import Paginate from "../components/Paginate/Paginate";
import PizzaCard from "../components/PizzaCard/PizzaCard";
import { Skeleton } from "../components/PizzaCard/Skeleton";
import Sort, { menue } from "../components/Sort";

import {
    FilterSliceState,
    selectFilter,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filterSlice";
import { SelectPizza, getPizzaData } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {
        category: activeCategory,
        sort: activeSort,
        currentPage,
        searchValue,
    } = useSelector(selectFilter);

    const { items: pizzasData, status: isLoading } = useSelector(SelectPizza);

    const fetchPizza = () => {
        const search = searchValue ? `&search=${searchValue}` : "";
        const category = activeCategory > 0 ? `category=${activeCategory}` : ``;

        dispatch(getPizzaData({ search, category, activeSort, currentPage }));
    };

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy: activeSort.sortProperty,
                order: activeSort.order,
                category: activeCategory,
                currentPage,
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [activeCategory, activeSort, currentPage]);

    useEffect(() => {
        if (!isSearch.current) {
            fetchPizza();
        }

        isSearch.current = false;
    }, [activeCategory, activeSort, searchValue, currentPage]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = menue.find(
                (el) => el.sortProperty === params.sortBy && el.order === params.order
            );

            if (sort) {
                dispatch(
                    setFilters({
                        searchValue: "",
                        category: Number(params.category),
                        currentPage: Number(params.currentPage) || 1,
                        sort: sort,
                    })
                );
            }
        }
        isSearch.current = true;
    }, []);

    const skeleton = [...Array(6)].map((_, i) => <Skeleton key={i} />);

    const pizzas = pizzasData.map((pizza: any) => <PizzaCard key={pizza.id} {...pizza} />);

    return (
        <div className="container">
            <div className="content__top">
                <Category />
                <Sort />
            </div>
            <h2 className="content__title">All pizzas</h2>
            {isLoading === "error" ? (
                <div className="cart cart--empty">
                    <h2>Error 😕</h2>
                    <p>
                        Bad request
                        <br />
                        Please try again
                    </p>
                </div>
            ) : (
                <div className="content__items">{isLoading === "loading" ? skeleton : pizzas}</div>
            )}
            <Paginate
                currentPage={currentPage}
                handleChangePage={(num: number) => dispatch(setCurrentPage(num))}
            />
        </div>
    );
};

export default Home;
