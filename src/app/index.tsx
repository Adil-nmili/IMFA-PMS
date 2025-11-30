import { Router } from "@/router/router";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";
function App() {
  return (
    <ErrorBoundary>
      <div>
        <Toaster position="top-right" />
        <RouterProvider router={Router} />
      </div>
    </ErrorBoundary>
  );
}
export default App
