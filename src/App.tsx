import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { Router } from "./router/router";




function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <RouterProvider router={Router} />
    </div>
  );
}

export default App; 
