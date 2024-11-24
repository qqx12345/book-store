import { create } from 'zustand'
import { persist } from 'zustand/middleware';
const useStore = create(
  persist(
  (set) => ({
    book: [],
    sum: 0,
    clear:()=>set({book:[],sum:0}),
    addbook: (newbook) =>
      set((state) => {
        const updatedBookList = [...state.book, newbook];
        const updatedSum = updatedBookList.reduce((acc, element) => acc + element.price, 0);
        return { book: updatedBookList, sum: updatedSum };
      }),
    removebook: (pervious) =>
      set((state) => {
        const updatedBookList = state.book.filter((element) => element.title !== pervious.title);
        const updatedSum = updatedBookList.reduce((acc, element) => acc + element.price, 0);
        return { book: updatedBookList, sum: updatedSum };
      }),
  }),
  {
    name: 'book-store', // localStorage 中的 key
    partialize: (state) => ({ book: state.book,sum:state.sum}), // 持久化 sum,book 状态
  }
  )
);
export default useStore 