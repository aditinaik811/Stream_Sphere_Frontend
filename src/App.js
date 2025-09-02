import './App.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './Dashboard/Dashboard';
import Home from './Dashboard/Home';
import MyVideos from './Dashboard/MyVideos';
import UploadVideo from './Dashboard/UploadVideo';
function App() {
  const myRouter = createBrowserRouter([
    {path:'',element:<Signup/>},
    {path:'/signup',element:<Signup/>},
    {path:'/login',element:<Login/>},
    {path:'/dashboard',element:<Dashboard/>,children:([
      {path:'',element:<Home/>},
      {path:'home',element:<Home/>},
      {path:'my-videos',element:<MyVideos/>},
      {path:'upload',element:<UploadVideo/>}
    ])}
  ])
  return (
    <div className="App">
     <RouterProvider router = {myRouter}/>
     <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
