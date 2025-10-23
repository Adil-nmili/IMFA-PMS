import { createBrowserRouter } from "react-router-dom";
import Login from '@/pages/loginPage'
export const HOME = "/";
export const LOGIN = "/login"

const Router = createBrowserRouter([
    {
        path: HOME,
        element: <div>Home Page</div>,
    },
    {
        path: LOGIN,
        element: <Login/>,
    },
    {
        path:'/dashboard',
        element:
        <Protector>
            <Layout/>
        </Protector>,
        children:[
            {
                path:'/chambres',
                element:<Chambre/>
            }
        ]
    }
  
]);

export default Router;