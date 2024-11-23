import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import useStore from '../book.jsx';

const Good = () => {
  let Navigate =useNavigate();
  const { id } = useParams(); // 获取路由参数
  const {addbook,removebook,book}=useStore();
  const fetchdata = async () => {
    const response = await axios.get(`http://localhost:5000/books/${id}`);
    return response.data; // 使用 axios 返回的数据
  };

  // 使用 useQuery 获取数据
  const { data, error, isLoading } = useQuery({
    queryKey: ['book', id], // 为特定 id 设置唯一的 queryKey
    queryFn: fetchdata, // 数据获取函数
    staleTime: 1000 * 60 * 5,
  });

  // 数据加载状态处理
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const isAdded = book.some((item) => String(item.id) === String(id));
  const buttonText = isAdded ? "已添加" : "添加";

  const handlePick = () => {
    if (isAdded) {
      removebook(data);
    } else {
      addbook(data);
    }
  };
  const fn=()=>{
    Navigate("/shop",{replace:true})
  }
  return (
    <div>
      <p>书名: {data.title}</p>
      <p>作者: {data.author}</p>
      <p>价格: {data.price}</p>
      <button onClick={handlePick} className="add">{buttonText}</button>
      <button onClick={fn} className="add">返回</button>
    </div>
  );
};

export default Good;

