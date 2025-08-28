import {
	Action,
	combineReducers,
	configureStore,
	ThunkDispatch,
} from '@reduxjs/toolkit';

import { api } from '@/shared/api/client';

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>;
