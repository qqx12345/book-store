import {createBrowserRouter} from "react-router-dom";
import Shop from "../page/shop.jsx"
import Index from "../page/index.jsx";
import Cart  from "../page/cart.jsx";
import Good from "../page/good.jsx"
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index/>,
    },
    {
        path: "/shop",
        element: <Shop/>,
        children:[
          {
          path:"/shop/:id",
          element:<Good/>
        },
      ]
    },
    {
      path: "/cart",
      element: <Cart/>,
    },
  ]);
  export default router 