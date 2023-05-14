import { configureStore } from '@reduxjs/toolkit'
import goodsReduser from './slices/goodsSlice'

export const store = configureStore({
  reducer: {
    goods: goodsReduser,
  
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch