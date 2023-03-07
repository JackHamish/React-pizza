import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SortState = {
    name: string;
    sortProperty: "rating" | "price" | "title";
    order: "desc" | "asc";
};

export interface FilterSliceState {
    searchValue: string;
    category: number;
    currentPage: number;
    sort: SortState;
}

const initialState: FilterSliceState = {
    searchValue: "",
    category: 0,
    currentPage: 1,
    sort: { name: "popularity (asc)", sortProperty: "rating", order: "desc" },
};

export const filterSlice = createSlice({
    name: "fliter",
    initialState,
    reducers: {
        setActiveCategory: (state, action: PayloadAction<number>) => {
            state.category = action.payload;
        },
        setActiveSort: (state, action: PayloadAction<SortState>) => {
            state.sort = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.category = Number(action.payload.category);
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setActiveCategory, setActiveSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
