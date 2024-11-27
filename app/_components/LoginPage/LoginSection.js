"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import apiClient from "@/lib/axiosInstance";
import { setIsLoggedIn, setUser } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";

function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before making a new request

    try {
      setLoading(true);
      const res = await apiClient.post("/user/login", { email, password });
      const user = res.data.envelop.currentUser;
      console.log(user, "user");
      // Update Redux state
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(user));

      // Navigate to dashboard on successful login
      router.push("/dashboard");
    } catch (e) {
      // Log out the user and set an error message
      dispatch(setIsLoggedIn(false));
      dispatch(setUser({ name: null, email: null }));
      setError("Login Failed. Please check your credentials.");
      console.error("Error logging in:", e);
    } finally {
      setLoading(false);
    }
  };

  // Display a toast notification if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 3000,
        position: "top-center",
        style: {
          background: "white",
          color: "red",
          fontSize: "1.5rem",
          zIndex: 1000,
        },
      });
    }
  }, [error]);

  return (
    <div className="signup-section">
      <form onSubmit={handleSubmit}>
        <label htmlFor="chk" aria-hidden="true">
          Login
        </label>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          type="submit"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginSection;
