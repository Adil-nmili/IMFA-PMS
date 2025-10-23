import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
