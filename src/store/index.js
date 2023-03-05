import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumApi } from "./apis/albumApi";
import { PhotosApi } from "./apis/PhotosApi";
// import { all } from "axios";
// import { fromJSON } from "postcss";

export const store = configureStore({
    reducer:{
        users: usersReducer,
        [albumApi.reducerPath]: albumApi.reducer,
        [PhotosApi.reducerPath]: PhotosApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(albumApi.middleware)
        .concat(PhotosApi.middleware);

    }
});

window.store = store;

setupListeners(store.dispatch)



export * from './thunks/fetchUsers' 
export * from './thunks/addUser'
export * from './thunks/removeUser'
export {useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} from './apis/albumApi'
export {useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation} from './apis/PhotosApi'