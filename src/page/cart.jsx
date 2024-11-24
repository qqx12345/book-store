import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useStore from '../book.jsx';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const queryClient = new QueryClient();

export default function Cart() {
  const {book,clear,sum}= useStore();
    function Clear(){
        return (
          <button onClick={()=>{clear();}} className='add'>清空</button>
        );
    }  
  function Display() {
    const book = useStore((state) => state.book); // 获取购物车中的书籍数据
    return (
      <>
        {book.length === 0 ? (
          <p>购物车为空</p> // 当购物车没有书时显示提示信息
        ) : (
          book.map((element) => (
            <li key={element.id}>
              <span>{element.title}</span>
            </li>
          ))
        )}
      </>
    );
  }
  function Pay(){
    const mutation = useMutation({
      mutationFn: async (newData) => {
        const response = await axios.post('http://localhost:5000/cart', newData);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['data']);
      },
    });
  
    const handleAddData = () => {
      if(book.length>0){
        mutation.mutate({book}, {onSuccess: () => {
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
