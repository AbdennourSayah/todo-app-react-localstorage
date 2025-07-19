import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    emailError: "",
    errorPassword: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    let emails = JSON.parse(localStorage.getItem("users")) || [];
    let didExists = emails.find((email) => email.email == form.email) || "";

    if (!didExists) {
      setErrorMessage((prev) => ({
        ...prev,
        emailError: "this email dosn't existe",
      }));
      return;
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        emailError: "",
      }));
      if (didExists.password == form.password) {
        setErrorMessage((prev) => ({
          ...prev,
          errorPassword: "",
        }));
        localStorage.setItem("CurentUser", JSON.stringify(form));
        navigate("/homeapp");
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          errorPassword: "plese enter the right password",
        }));
        return;
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border-2 border-black p-[20px] w-full max-w-md mx-auto">
      <h1 className="text-center text-[40px] font-bold mb-1.5 primary-color ">
        Login
      </h1>

      <div className="grid grid-cols-2 p-[1px]">
        <label>Email</label>
        <input
          className="border-2 border-black"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="  min-h-[2rem] text-red-500 text-sm">
        {errorMessage.emailError}
      </div>

      <div className="grid grid-cols-2  mb-[0px]">
        <label>Password</label>
        <input
          className="border-2 border-black"
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <div className=" min-h-[2rem]  text-red-500 text-sm">
          {errorMessage.errorPassword}
        </div>
      </div>

      <Link to="/">
        <p className="text-center text-[#3AB09E]">you don't have an account?</p>
      </Link>

      <button type="submit" className=" px-4 py-2 rounded-xl">
        Login
      </button>
    </form>
  );
};
export default Login;
