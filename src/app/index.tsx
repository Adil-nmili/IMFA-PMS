import { Router } from "@/router/router";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <RouterProvider router={Router} />
    </div>
  );
}
export default App
