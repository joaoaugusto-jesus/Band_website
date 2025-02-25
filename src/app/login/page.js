"use client";

import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import styles from "./Login.module.css";
import PageIcon from "../components/Icons/page";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "../components/Button";
import { useState } from "react";

export default function Login() {
  const { data: session } = useSession();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");
  
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Signup successful! Please log in.");
        setIsLogin(true); // Switch to login form after successful signup
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
  
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
  
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className={styles.layout}>
      <div className={styles.loginContainer}>
        {session ? (
          <>
            <p>Signed in as {session.user.email}</p>
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <div className={styles.loginForm}>
          
           
            <Button onClick={() => signIn("google")}>Sign in with Google</Button> 
             <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className={styles.error}>{error}</p>}
            {isLogin ? (
              <Button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            ) : (
              <Button onClick={handleSignup} disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            )} 
             
            <Button
              className={styles.toggleButton}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </Button>
          
          </div>
        )}
      </div>
   </div>
      <PageIcon />
      <Footer />
    </>
  );
}