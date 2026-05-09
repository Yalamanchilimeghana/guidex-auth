import { useState } from "react";
import "./App.css";

import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
  let newErrors = {};
  if (!isLogin && formData.name.trim() === "") {
    newErrors.name = "Name is required";
  }
  if (formData.email.trim() === "") {
    newErrors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
      formData.email
    )
  ) {
    newErrors.email = "Invalid email address";
  }
  if (formData.password.trim() === "") {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password =
      "Password must be at least 6 characters";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {

  alert(
    isLogin
      ? "Login Successful 🚀"
      : "Account Created Successfully 🚀"
  );

  setFormData({
    name: "",
    email: "",
    password: "",
  });
}
  };
  return (
    <div className="container">
      <div className="card">
        <div className="left-section">
          <h1>GuidEx</h1>
          <p>Build your future with modern web development.</p>
        </div>
        <div className="right-section">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <FaUser className="icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span>{errors.name}</span>}
              </div>
            )}

            <div className="input-group">
              <FaEnvelope className="icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && <span>{errors.email}</span>}
            </div>

            <div className="input-group">
              <FaLock className="icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

              <div
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>

              {errors.password && <span>{errors.password}</span>}
            </div>

            <button type="submit">{isLogin ? "Login" : "Signup"}</button>
          </form>

          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Signup" : " Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
