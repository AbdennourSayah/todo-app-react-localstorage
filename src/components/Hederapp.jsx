/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Hederapp = ({ currentPath }) => {
  const navigate = useNavigate();
  const [curentUser, setCurentUser] = useState(
    JSON.parse(localStorage.getItem("CurentUser")) || ""
  );

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("CurentUser"));
    setCurentUser(stored);
  }, [currentPath]);

  function Logout() {
    localStorage.removeItem("CurentUser");
    setCurentUser("");
    navigate("/");
  }

  return (
    <header className=" border-b2 p-[8px] border-[#] flex  flex-row  ju justify-between texA7]">
      <h1 className="text-2xl font-bold primary-color ">📝 To-Do Master</h1>

      {curentUser && (
        <button
          onClick={Logout}
          className=" btn  text-[#e5e4e2]  hover:text-[#ff0800] px-[15px] rounded-[8px] "
          value="Log Out">
          Log Out
        </button>
      )}
    </header>
  );
};

export default Hederapp;
