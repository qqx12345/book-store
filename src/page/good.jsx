import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { addcart, deletecart, fetchcart } from '../book.js';
import { useState,useEffect } from "react";
const Good = () => {
  let Navigate = useNavigate();
  const { id } = useParams(); // 获取路由参数
  const [check,setChecks]=useState();
  const fetchdata = async () => {
    const response = await axios.get(`http://localhost:5000/books/${id}`);
    return response.data; // 使用 axios 返回的数据
  };
  // 使用 useQuery 获取数据
  const { data: book, error, isLoading } = useQuery({
    queryKey: ['book', id], // 为特定 id 设置唯一的 queryKey
    queryFn: fetchdata, // 数据获取函数
    staleTime: 1000 * 60 * 5,
  });

  // 获取购物车数据
  const { data: cart = [] } = useQuery({
    queryKey: ['cart', id],
    queryFn: fetchcart,
    refetchOnWindowFocus:true,
  });

  useEffect(() => {
    if (book && cart) {
      setChecks(() => {
        const newChecks = Array.isArray(cart) && cart.some((item) => String(item.id) === String(id));
        return newChecks;
      });
    }
  }, [book,cart,id,setChecks]);
  // 数据加载状态处理
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 确保 cart 是数组类型
  const buttonText = check ? "已添加" : "添加";

  const handlePick = () => {
    if (check) {
      deletecart(id); // 删除
      setChecks(false);
    } else {
      addcart(book); // 添加
      setChecks(true);
    }
  };

  const fn = () => {
    Navigate("/shop", { replace: true });
  };

  return (
    <div>
      <p>书名: {book.title}</p>
      <p>作者: {book.author}</p>
      <p>价格: {book.price}</p>
      <button onClick={handlePick} className="add">{buttonText}</button>
      <button onClick={fn} className="add">返回</button>
    </div>
  );
};

export default Good;
