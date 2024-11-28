import { useState, useEffect } from 'react'
import '../App.css'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchbook, fetchcart, deletecart, addcart} from '../book.js'
import { useNavigate ,Outlet, useLocation} from 'react-router-dom';
const queryClient = new QueryClient();

  export default function Shop(){
    const location = useLocation()
      function Display() {
        const navigate = useNavigate();
        const { data: books, error: booksError, isLoading: booksLoading } = useQuery({
          queryKey: ['books'],
          queryFn: fetchbook,
          staleTime: 1000 * 60 * 5,
        });
      
        // 获取购物车内容
        const { data: cart, error: cartError, isLoading: cartLoading } = useQuery({
          queryKey: ['cart'],
          queryFn: fetchcart,
          refetchOnWindowFocus:true,
        });
      
        const [checks, setChecks] = useState([]);
      
    // 初始化 checks 状态
    useEffect(() => {
      if (books && cart) {
        const initialChecks = books.map((item) =>
          cart.find((b) => b.id === item.id) ? '已添加' : '添加'
        );
        setChecks(initialChecks);
      }
    }, [books,cart]);


    // useEffect(() => {
    //   checks.forEach((status, index) => {
    //     if (books && cart) {
    //       if (status === '已添加' && !cart.find((b) => b.title === books[index].title)) {
    //         addcart(books[index]);
    //       } else if (status === '添加' && cart.find((b) => b.title === books[index].title)) {
    //         deletecart(index+1);
    //       }
    //     }
    //   });
    // }, [checks,books,cart]);



    const handleButtonClick = (index) => {
      const newStatus = checks[index] === "添加" ? "已添加" : "添加";
      if (newStatus === "已添加") {
        addcart(books[index]).then(() => {
          setChecks((prevChecks) => {
            const newChecks = [...prevChecks];
            newChecks[index] = newStatus;
            return newChecks;
          });
        }).catch((error) => {
          console.error('Failed to add to cart:', error);
        });
      } else {
        deletecart(books[index].id).then(() => {
          setChecks((prevChecks) => {
            const newChecks = [...prevChecks];
            newChecks[index] = newStatus;
            return newChecks;
          });
        }).catch((error) => {
          console.error('Failed to remove from cart:', error);
        });
      }
    };
    
      
        if (booksLoading || cartLoading) {
          return <span>Loading...</span>;
        }
        if (booksError || cartError) {
          return <span>Error: {booksError.message}</span>;
        }
        return (<>
          <ul className='book-list'>
            {books.map((todo) => (
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