import Signin from '../components/Signin'
import { createBrowserRouter } from 'react-router-dom';
import Signup from '../components/Signup';
import TrackAuth from './TrackAuth';
import Wrapper from './Wrapper';


const routes = [
    {
        path:"/",
        element:<Wrapper/>
    },
    {
        path : '/signin',
        element: <Signin/>
    },
    {
        path: '/signup',
        element: <Signup></Signup>
    },
    {
        path: '/dashboard',
        element : <TrackAuth/>
    },
];
export const router = createBrowserRouter(routes)