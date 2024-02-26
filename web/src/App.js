import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { GlobalContext } from './Components/Context/Context';
import axios from 'axios';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider, Navigate
} from "react-router-dom";
import {
  Home, LogIn, ProductDetailedPage,
  SellProduct, SignUp,
} from './Pages'
import Layout from './Components/Layout/Layout';
import Loader from './Components/Loader';



function App() {

  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${state.baseUrl}/api/v1/products`,
          {
            withCredentials: true,
          });
        console.log(response.data.data)
        dispatch({
          type: 'USER_LOGIN',
          payload: response.data
        })

      } catch (error) {
        console.log(error)

        dispatch({
          type: 'USER_LOGOUT'
        })
      }
    })()

  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {state.isLogin === true ?
          <Route path="" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="sell" element={<SellProduct />} />
            <Route path="product/:productId" element={<ProductDetailedPage />} />
            <Route path="*" element={<Home />} />
          </Route>
          :
          null
        }
        {state.isLogin === false ?
          <Route path="/" >
            <Route path="" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<LogIn />} />
          </Route>
          :
          null
        }
        {state.isLogin === null ?
          <Route path="*" element={<Loader />} />
          :
          null
        }

      </Route>
    )
  );


  return (
    <RouterProvider router={router} />
  );
}

export default App;