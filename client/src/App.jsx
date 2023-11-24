import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Check from "./components/Check";
import HandleNFT from "./components/HandleNFT";
import Home from "./components/Home";
import Members from "./components/Members";
import Wallet from "./components/Wallet";

function App() {
  const router = createBrowserRouter([
    {path:'/',element:<Wallet/>},
    {path:'/home',element:<Home/>},
    {path:'/members',element:<Members/>},
    {path:'/handlenft', element:<HandleNFT/>},
    {path: '/check', element:<Check/>}
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
