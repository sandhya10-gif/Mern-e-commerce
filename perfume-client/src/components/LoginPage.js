import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import bgImage from "../assets/login.webp"; // make sure this image exists in src/assets

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email/password login
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("userEmail", user.email);
      navigate("/");
    } else {
      alert("Invalid credentials!");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("auth", "true");
      localStorage.setItem("userEmail", result.user.email);
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black p-8 rounded-2xl shadow-2xl w-96 backdrop-blur-md bg-opacity-80">
       <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
          AromaScent Login
        </h2>

        {/* Email/password login form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-navy-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-navy-500"
          />
          <button
            type="submit"
            className="w-full bg-navy-500 text-white p-3 rounded-lg font-semibold hover:bg-navy-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 my-2">OR</p>

        {/* Google login button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-gray-800 text-white p-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Sign in / Sign up with Google
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-navy-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
