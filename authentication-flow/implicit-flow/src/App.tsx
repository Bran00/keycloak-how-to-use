import { createBrowserRouter } from "react-router-dom"


const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
  },
  {
    path: "callback",
    element: <Callback />,
  },
]);

function App() {
  return (
    <div>
      <h1>Implicit flow</h1>
    </div>
  )
}

export default App
