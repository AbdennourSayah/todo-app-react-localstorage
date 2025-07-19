import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Hederapp from "./components/Hederapp";
import ToDoList from "./components/toDoList";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <>
      <Hederapp currentPath={location.pathname} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="h-[80vh] flex justify-center items-center">
              <Register />
            </div>
          }></Route>

        <Route
          path="/login"
          element={
            <div className="h-[80vh] flex justify-center items-center">
              <Login />
            </div>
          }
        />

        <Route path="/homeapp" element={<ToDoList />} />
      </Routes>
    </>
  );
}

export default App;
