// import { useState, useEffect } from 'react'
// import './App.css'
// import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import useStore from './book.jsx'

// //渲染列表
// import './App.css'
// const queryClient = new QueryClient();

// function App() {
//   const fetchData = async () => {
//     const response = await fetch('http://localhost:5000/books');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   };
//   //存储购物车及其操作
//   function Display() {
//     const { data, error, isLoading } = useQuery({
//       queryKey: ['data'],
//       queryFn: fetchData, // 发起网络请求生成data
//       staleTime: 1000 * 60 * 5,
//     });
  
//     const { book, addbook, removebook} = useStore();
//     const [checks, setChecks] = useState([]);
  
//     useEffect(() => {
//       if (data) {
//         setChecks(Array(data.length).fill("添加"));
//       }
//     }, [data]);
//     useEffect(() => {
//       checks.forEach((status, index) => {
//         if (status === "已添加" && !book.find(b => b.title === data[index].title)) {
//           addbook(data[index]);
//         } else if (status === "添加" && book.find(b => b.title === data[index].title)) {
//           removebook(data[index]);
//         }
//       });
//       console.log(book);
//     })
//     const  handleButtonClick = (index,) => {
//       setChecks((prevChecks) => {
//         const newChecks = [...prevChecks];
//         const newStatus = newChecks[index] === "添加" ? "已添加" : "添加";
//         newChecks[index] = newStatus;
//         return newChecks;
//       });
//     };
  
//     if (isLoading) {
//       return <span>Loading...</span>;
//     }
//     if (error) {
//       return <span>Error: {error.message}</span>;
//     }
  
//     return (
//       <ul>
//         {data.map((todo) => (
//           <li key={todo.id}>
//             <span>{todo.title}</span>
//             <button className='add' onClick={() => handleButtonClick(todo.id - 1, todo)}>
//               {checks[todo.id - 1]}
//             </button>
//           </li>
//         ))}
//       </ul>
//     );
//   }
  
//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className='list'>
//         <Display />
//       </div>
//       <div className='cart'>
//         <button className='shop'>购物车</button>
//       </div>
//     </QueryClientProvider>
//   );
// }

// export default App;