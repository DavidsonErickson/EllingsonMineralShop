import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import cart_itemsSlice from './cart_items/cart_itemsSlice';
import cartsSlice from './carts/cartsSlice';
import categoriesSlice from './categories/categoriesSlice';
import order_itemsSlice from './order_items/order_itemsSlice';
import ordersSlice from './orders/ordersSlice';
import productsSlice from './products/productsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    cart_items: cart_itemsSlice,
    carts: cartsSlice,
    categories: categoriesSlice,
    order_items: order_itemsSlice,
    orders: ordersSlice,
    products: productsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
