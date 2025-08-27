import Signin from '../components/Signin'
import App from '../App'
import { createBrowserRouter } from 'react-router-dom';
import Signup from '../components/Signup';


const routes = [
    {
        path : '/',
        element: <Signin/>
    },
    {
        path: '/signup',
        element: <Signup></Signup>
    },
    {
        path: '/dashboard',
        element : <App/>
    },
];
export const router = createBrowserRouter(routes)