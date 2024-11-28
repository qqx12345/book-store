const fetchbook = async () => {
    const response = await fetch('http://localhost:5000/books');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  
  const fetchcart = async () => {
    const response = await fetch('http://localhost:5000/cart');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const addcart = async (data) =>{
    const response = await fetch('http://localhost:5000/cart',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
  };

  const deletecart = async (id) => {
    const response = await fetch(`http://localhost:5000/cart/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };
  export { fetchbook, fetchcart ,addcart,deletecart};
  