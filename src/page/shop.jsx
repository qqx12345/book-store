import { useState, useEffect } from 'react'
import '../App.css'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useStore from '../book.jsx'
import { useNavigate ,Outlet, useLocation} from 'react-router-dom';
const queryClient = new QueryClient();

  export default function Shop(){
    const location = useLocation()
    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      };
      function Display() {
        const navigate = useNavigate();
        const { data, error, isLoading } = useQuery({
          queryKey: ['data'],
          queryFn: fetchData, // 发起网络请求生成data
          staleTime: 1000 * 60 * 5,
        });
      
        const {book,addbook,removebook}= useStore();
        const [checks, setChecks] = useState([]);
      
    // 初始化 checks 状态
    useEffect(() => {
      if (data) {
        const initialChecks = data.map((item) =>
          book.find((b) => b.title === item.title) ? '已添加' : '添加'
        );
        setChecks(initialChecks);
      }
    }, [data, book]);


    useEffect(() => {
      checks.forEach((status, index) => {
        if (data) {
          if (status === '已添加' && !book.find((b) => b.title === data[index].title)) {
            addbook(data[index]);
          } else if (status === '添加' && book.find((b) => b.title === data[index].title)) {
            removebook(data[index]);
          }
        }
      });
      console.log(book);
    }, [checks, data, book, addbook, removebook]);



        const  handleButtonClick = (index) => {
          setChecks((prevChecks) => {
            const newChecks = [...prevChecks];
            const newStatus = newChecks[index] === "添加" ? "已添加" : "添加";
            newChecks[index] = newStatus;
            return newChecks;
          });
        };
      
        if (isLoading) {
          return <span>Loading...</span>;
        }
        if (error) {
          return <span>Error: {error.message}</span>;
        }
        return (<>
          <ul className='book-list'>
            {data.map((todo) => (
              <li key={todo.id} >
                <span onClick={()=>{navigate(`/shop/${todo.id}`)}} className='book'>{todo.title}</span>
                {/* <Link to={`/shop/${todo.id}`}>查看详情</Link> */}
                <button className='add' onClick={() => handleButtonClick(todo.id - 1, todo)}>
                  {checks[todo.id - 1]}
                </button>
              </li>
            ))}
          </ul>
          </>
        );
      }
      let Navigate = useNavigate();
      const fn=()=>{
        Navigate("/cart")
      }
    return (
        <QueryClientProvider client={queryClient}>
          <div className='list'>
          {(location.pathname === "/shop" || location.pathname === "/shop/") && <Display />} 
            <Outlet/>
          </div>
          <div className='cart'>
            <button className='shop' onClick={fn}>购物车</button>
          </div>
        </QueryClientProvider>
      );
    }