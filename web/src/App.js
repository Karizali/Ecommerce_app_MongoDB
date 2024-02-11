import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import { GlobalContext } from './Components/Context/Context';
import axios from 'axios';



function App() {

  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    (async()=>{
      try {
        const response = await axios.get(`${state.baseUrl}/products`);
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

  },[])


  return (
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;