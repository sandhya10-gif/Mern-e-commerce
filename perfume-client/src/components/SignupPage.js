import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Firebase email/password signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("auth", "true");
      localStorage.setItem("userEmail", email);
      navigate("/"); // redirect to Home
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
    }
  };

  // Google signup/login
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("auth", "true");
      localStorage.setItem("userEmail", result.user.email);
      navigate("/"); // redirect to Home
    } catch (error) {
      console.error("Google signup error:", error);
      alert("Google signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form className="bg-white p-8 rounded-2xl shadow-2xl w-96 flex flex-col gap-4" onSubmit={handleSignup}>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Electromart Signup</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Sign Up
        </button>

        <p className="text-center text-gray-500 my-2">OR</p>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Sign up with Google
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
