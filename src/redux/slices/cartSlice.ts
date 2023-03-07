import { RootState } from "./../store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};

interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}

const initialState: CartSliceState = {
    totalPrice: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((item) => item.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            state.totalPrice = state.items.reduce((acc, curr) => acc + curr.price * curr.count, 0);
        },
        plusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((item) => item.id === action.payload);

            if (findItem) {
                findItem.count++;
            }
            state.totalPrice = state.items.reduce((acc, curr) => acc + curr.price * curr.count, 0);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((item) => item.id === action.payload);

            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = state.items.reduce((acc, curr) => acc + curr.price * curr.count, 0);
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
            state.totalPrice = state.items.reduce((acc, curr) => acc + curr.price * curr.count, 0);
        },
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
        },
        setCart(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload;
            state.totalPrice = state.items.reduce((acc, curr) => acc + curr.price * curr.count, 0);
        },
    },
});

export const SelectCart = (state: RootState) => state.cart;
export const SelectCartItemByID = (id: string) => (state: RootState) => {
    return state.cart.items.find((item) => item.id === id);
};

export const { addToCart, removeFromCart, clearCart, minusItem, plusItem, setCart } =
    cartSlice.actions;

export default cartSlice.reducer;
