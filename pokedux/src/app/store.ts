import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import detailReducer from '../features/detail/detailSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    detail: detailReducer,
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
