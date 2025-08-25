import Signin from '../components/Signin'
import App from '../App'
import { createBrowserRouter } from 'react-router-dom';


const routes = [
    {
        path : '/',
        element: <Signin/>
    },
    {
        path: '/dashboard',
        element : <App/>
    },
];
export const router = createBrowserRouter(routes)