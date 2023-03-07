import { RootState } from "./../store";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type ActiveSort = {
    sortProperty: string;
    order: string;
};

type Item = {
    category: number;
    id: string;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number[];
    title: string;
    types: number[];
};

interface FetchPizza {
    search: string;
    category: string;
    activeSort: ActiveSort;
    currentPage: number;
}

interface PizzaSliceState {
    items: Item[];
    status: "loading" | "error" | "succes";
}

export const getPizzaData = createAsyncThunk<Item[], FetchPizza>(
    "pizza/getPizzaDataStatus",
    async ({ search, category, activeSort, currentPage }) => {
        const { data } = await axios.get<Item[]>(
            `https://6400cab63779a862624d13eb.mockapi.io/Pizzas?page=${currentPage}&limit=4&${category}&sortBy=${activeSort.sortProperty}&order=${activeSort.order}${search}`
        );

        return data;
    }
);

const initialState: PizzaSliceState = {
    items: [],
    status: "loading",
};

export const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setPizzaData(state, action: PayloadAction<Item[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPizzaData.pending, (state) => {
            state.status = "loading";
            state.items = [];
        });
        builder.addCase(getPizzaData.fulfilled, (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
            state.status = "succes";
        });
        builder.addCase(getPizzaData.rejected, (state) => {
            state.status = "error";
            state.items = [];
        });
    },
});

export const SelectPizza = (state: RootState) => state.pizza;

export const { setPizzaData } = pizzaSlice.actions;

export default pizzaSlice.reducer;
