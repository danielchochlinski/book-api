import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IndexPage from "./pages/IndexPage/IndexPage";
import Layout from "./components/Layout/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: "/", element: <IndexPage /> }],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
