import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    emailError: "",
    errorConfirmePassword: "",
  });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existUser = users.find((user) => user.email === form.email);
    if (existUser) {
      setErrorMessage((prev) => ({
        ...prev,
        emailError: existUser
          ? "This email is already used, please use another."
          : "",
      }));
      return;
    } else {
      setErrorMessage((prev) => ({
        ...prev,
        emailError: "",
      }));
    }

    const confirmPassword = e.target.confirmPassword.value;
    if (form.password !== confirmPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        errorConfirmePassword: "Please confirm your password.",
      }));
      return;
    } else {
      setErrorMessage({ ...errorMessage, errorConfirmePassword: "" });
    }
    users.push({ ...form });
    localStorage.setItem("CurentUser", JSON.stringify(form));
    localStorage.setItem("users", JSON.stringify(users));

    setForm({
      userName: "",
      email: "",
      password: "",
    });
    e.target.confirmPassword.value = "";
    navigate("/homeapp");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border-2 border-black p-[15px] w-full max-w-md mx-auto">
      <h1 className=" primary-color    text-center text-[40px] font-bold">
        Register
      </h1>

      <div className="grid grid-cols-2 p-[15px] mb-[15px]">
        <label>User Name</label>
        <input
          className="border-2 border-black"
          required
          type="text"
          value={form.userName}
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 p-[15px] mb-[15px]">
        <label>Email</label>
        <input
          className="border-2 border-black"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="  min-h-[0rem] text-red-500 text-sm">
        {errorMessage.emailError}
      </div>

      <div className="grid grid-cols-2 p-[15px] mb-[15px]">
        <label>Password</label>
        <input
          className="border-2 border-black"
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 p-[15px] mb-[5px]">
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          required
          className="border-2 border-black"
          type="password"
        />
      </div>

      <div className=" min-h-[0.5rem] text-red-500 text-sm">
        {errorMessage.errorConfirmePassword}
      </div>
      <Link to="/login">
        <p className="text-center text-[#3AB09E]">
          You have already an account?
        </p>
      </Link>

      <button type="submit" className=" px-4 py-2 rounded-xl">
        Register
      </button>
    </form>
  );
};
export default Register;
