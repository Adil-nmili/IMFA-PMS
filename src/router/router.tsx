import { createBrowserRouter } from "react-router-dom";

export const HOME = "/";


const Router = createBrowserRouter([
    {
        path: HOME,
        element: <div>Home Page</div>,
    },
  
]);

export default Router;