import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../utilitys/sweetAlert";
import { loginUser } from "../utilitys/auth";
import CryptoJS from "crypto-js";
import { AuthContext } from "../utilitys/authContext";

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load remembered credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail) setEmail(savedEmail);

    if (savedPassword && ENCRYPTION_KEY) {
      try {
        const bytes = CryptoJS.AES.decrypt(savedPassword, ENCRYPTION_KEY);
        setPassword(bytes.toString(CryptoJS.enc.Utf8));
      } catch (err) {
        console.error("Error decrypting password", err);
      }
    }

    if (savedEmail || savedPassword) setRememberMe(true);
  }, []);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) return SweetAlert.alert("Error", "Email field cannot be empty.", "error", "OK");
    if (!validateEmail(email)) return SweetAlert.alert("Error", "Please enter a valid email address.", "error", "OK");
    if (!password.trim()) return SweetAlert.alert("Error", "Password field cannot be empty.", "error", "OK");
    if (password.length < 6) return SweetAlert.alert("Error", "Password must be at least 6 characters long.", "error", "OK");

    setLoading(true);

    try {
      console.log("Attempting login with:", { email, password, rememberMe });

      const response = await loginUser(email.trim(), password);
      console.log("Login API response:", response);

      if (response?.success) {
        SweetAlert.alert("Success", response.message, "success", "OK");

        if (response.data?.token) {
          console.log("Sending token to AuthContext login:", response.data.token);
          login(response.token); // store token in context
        }

        // Save credentials if rememberMe is checked
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email.trim());
          if (ENCRYPTION_KEY) {
            const encryptedPassword = CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
            localStorage.setItem("rememberedPassword", encryptedPassword);
          }
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }

        console.log("Navigation to /store");
        navigate("/store");
      } else {
        SweetAlert.alert("Error", response.message || "Login failed", "error", "OK");
      }
    } catch (error) {
      const apiMessage = error?.response?.data?.message || error?.message || "Something went wrong";
      SweetAlert.alert("Error", apiMessage, "error", "OK");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-yellow-500/70 to-primary-900 p-4">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-md">
        <div className="flex justify-center">
          <img src="/image/favicon.png" alt="Logo" className="w-20 h-20 sm:w-36 sm:h-36" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-primary-500 mb-8 text-sm sm:text-base">
          Sign in to continue to your account
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/35 backdrop-blur-md p-4 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/35 backdrop-blur-md p-4 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 text-sm sm:text-base">
            <label className="flex items-center text-gray-600 mb-2 sm:mb-0">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 accent-primary-500"
              />
              Remember Me
            </label>
            <a href="#" className="text-primary-500 font-semibold hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 text-primary-100 py-3 rounded-xl font-semibold shadow-lg hover:bg-primary-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
