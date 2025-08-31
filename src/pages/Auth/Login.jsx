import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "./Layout";
import Logo from "../../assets/logo_auth.png";
import { login } from "../../api/api";
import Cookies from "js-cookie";

export default function Login() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (token && role) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value) validatePassword(value);
  };

  const isFormValid = () =>
    emailRegex.test(email) && password.length >= 8 && !emailError && !passwordError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (validateEmail(email) && validatePassword(password)) {
      try {
        setLoading(true);
        const res = await login(email, password);

        if (res?.meta?.status && res?.data?.token) {
          // ✅ Save token + role in cookies
          Cookies.set("token", res.data.token, { expires: 7 });
          Cookies.set("role", res.data.role || "user", { expires: 7 });

          navigate("/dashboard");
        } else {
          setApiError(res?.meta?.message || "Invalid email or password");
        }
      } catch (err) {
        setApiError(err.message || "Login failed. Try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (showForm) {
    return (
      <AuthLayout>
        <motion.div
          className="w-full space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.img
              src={Logo}
              alt="Sunset Rocks Logo"
              className="h-12 sm:h-14 md:h-16 mx-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowForm(false)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Sign in to your account
              </p>
            </motion.div>
          </div>

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email)}
                className={`w-full px-4 py-3 text-base border rounded-lg 
                  focus:ring-2 focus:ring-[#F9298C] focus:border-transparent 
                  transition-all duration-200 placeholder-gray-400
                  ${emailError
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                  }`}
                placeholder="Enter your email"
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => validatePassword(password)}
                className={`w-full px-4 py-3 text-base border rounded-lg 
                  focus:ring-2 focus:ring-[#F9298C] focus:border-transparent 
                  transition-all duration-200 placeholder-gray-400
                  ${passwordError
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                  }`}
                placeholder="Enter your password"
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}

              <div className="text-right">
                <Link
                  to="#"
                  className="text-sm text-[#F9298C] hover:text-[#e0257e] font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* API Error */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{apiError}</p>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isFormValid() || loading}
              className={`w-full py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg 
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F9298C] focus:ring-offset-2
                ${isFormValid() && !loading
                  ? "bg-[#F9298C] hover:bg-[#e0257e] text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              whileHover={
                isFormValid() && !loading
                  ? { scale: 1.02 }
                  : {}
              }
              whileTap={isFormValid() && !loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </motion.form>

          {/* Sign Up Link */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm sm:text-base text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#F9298C] hover:text-[#e0257e] font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </AuthLayout>
    );
  }

  // Landing/Welcome Screen
  return (
    <AuthLayout>
      <motion.div
        className="w-full text-center space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Logo */}
        <motion.img
          src={Logo}
          alt="Sunset Rocks Logo"
          className="h-12 sm:h-16 md:h-20 mx-auto hover:opacity-80 transition-opacity"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Main Heading */}
        <motion.div
          className="space-y-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Ready to Rock with SUNSET?
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl leading-tight text-gray-600  max-w-lg mx-auto">
            Your command center for creating extraordinary events that people will never forget
          </p>
        </motion.div>

        {/* CTA Button */}
       <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
>
  <motion.button
    onClick={() => setShowForm(true)}
    className="w-full max-w-sm mx-auto block 
      bg-gradient-to-r from-[#F9298C] via-[#FF5CA7] to-[#F9298C]
      text-white font-semibold py-4 px-8 rounded-xl shadow-lg
      transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
      relative overflow-hidden"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{
      boxShadow: [
        "0 4px 20px rgba(249, 41, 140, 0.3)",
        "0 8px 25px rgba(249, 41, 140, 0.4)",
        "0 4px 20px rgba(249, 41, 140, 0.3)"
      ],
    }}
    transition={{
      scale: { duration: 0.2 },
      boxShadow: { repeat: Infinity, duration: 2 },
    }}
  >
    <span className="text-base sm:text-lg tracking-wide drop-shadow-sm">
     Login
    </span>
    {/* Subtle glow overlay */}
    <span
      className="absolute inset-0 bg-white/10 opacity-20 blur-md pointer-events-none"
      aria-hidden="true"
    ></span>
  </motion.button>
</motion.div>

      </motion.div>
    </AuthLayout>
  );
}
