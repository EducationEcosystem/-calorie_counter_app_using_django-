import axios from "../axios";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import logo from "../logo.png";

export const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api-token-auth/", formData);
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", true);
    navigate("/");
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="col-4 m-auto my-5 overflow-auto"
        method="POST"
        action=""
      >
        <img className="mb-4" src={logo} alt="" width="57" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-3">
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="username"
          />
          <label for="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
        <a className="mt-3 w-100 btn btn-lg btn-primary" href="/register">
          Register
        </a>
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2017–2022</p>
      </form>
    </main>
  );
};
