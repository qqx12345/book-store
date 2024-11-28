import { useQuery,useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {deletecart,fetchcart} from '../book.js';
import '../App.css';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

export default function Cart() {
  const [check,setcheck]=useState([]);
  const [sum,setsum]=useState(0);
  const clear = async ()=>{
    for (const element of check) {
      await deletecart(element.id);
    }
    setcheck([]);
    setsum(0);
    queryClient.invalidateQueries(['book']);
  };
    function Clear(){
        return (
          <button onClick={()=>{clear();}} className='add'>清空</button>
        );
    }
  function Display() {
    const { data: book=[]} = useQuery({
      queryKey: ['book'],
      queryFn: fetchcart,
      refetchOnWindowFocus: true,
    });
    
    useEffect(() => {
      if (JSON.stringify(book) !== JSON.stringify(check)) {
        setcheck(book);
        const newSum = book.reduce((acc, element) => acc + element.price, 0);
        setsum(newSum);
      }
    }, [book]);    
    return (
      <>
        {check.length === 0 ? (
          <p>购物车为空</p> // 当购物车没有书时显示提示信息
        ) : (
          check.map((element) => (
            <li key={element.id}>
              <span>{element.title}</span>
            </li>
          ))
        )}
      </>
    );
  }
  function Pay(){
    const { data: book=[]} = useQuery({
      queryKey: ['pay'],
      queryFn: fetchcart,
      refetchOnWindowFocus:true,
    });
    const mutation = useMutation({
      mutationFn: async (newData) => {
        const response = await axios.post('http://localhost:5000/order', newData);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['paybook']);
      },
    });

    const handleAddData = () => {
      if(book.length>0){
        mutation.mutate(book, {onSuccess: () => {
          alert("购买成功");
          clear();
        }},
        {onError: (error) => {
          console.error('购买失败:', error.message);
        },
      })
      }
    };
  return (
    <>
      <button onClick={handleAddData} disabled={mutation.isLoading} className='add'>
        {mutation.isLoading ? '购买中...' : '购买'}
      </button>
     </> 
  );
  }
  let Navigate =useNavigate();
  const fn=()=>{
    Navigate("/shop",{replace:true})
  }
  return (
    <QueryClientProvider client={queryClient}>
    <div className="list">
      <ul className='book-list'>
        <Display />
        <span>总价：{sum.toFixed(2)}</span>
      </ul>
      <Clear/>
       <Pay/>
    </div>
    <button onClick={fn} className='add'>返回</button>
    </QueryClientProvider>
  );
}
