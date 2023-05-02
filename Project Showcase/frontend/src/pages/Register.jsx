import logo from "../logo.png";
import { useState } from "react";
import axios from "../axios";

export const Register = () => {
  const [formData, setFormData] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/register/", formData);
    alert(JSON.stringify(data));
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
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <div className="form-floating mb-3">
          <input
            onChange={handleChange}
            id="username"
            className="form-control"
            type="text"
            name="username"
            placeholder="username"
          />
          <label for="username">Username</label>
        </div>

        <div className=" form-floating mb-3">
          <input
            onChange={handleChange}
            id="email"
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className=" form-floating mb-3">
          <input
            onChange={handleChange}
            id="password1"
            className="form-control"
            type="password"
            name="password1"
            placeholder="Enter Password"
          />
          <label htmlFor="password1">Enter password</label>
        </div>
        <div className=" form-floating mb-3">
          <input
            onChange={handleChange}
            id="password2"
            className="form-control"
            type="password"
            name="password2"
            placeholder="Confirm Password"
          />
          <label htmlFor="password2">Confirm Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
        <a className="mt-3 w-100 btn btn-lg btn-primary" href="/login">
          Login
        </a>
        <p className="mt-5 mb-3 text-muted text-center">&copy; 2017–2022</p>
      </form>
    </main>
  );
};
