import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Home, LogIn, ProductDetailedPage,
  SellProduct, SignUp
} from './Pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="sell" element={<SellProduct />} />
        <Route path="product/:productId" element={<ProductDetailedPage />} />
      </Route>
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();