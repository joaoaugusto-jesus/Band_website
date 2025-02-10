"use client";

import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import styles from "./Login.module.css";
import PageIcon from "../components/Icons/page";
import LayoutBg from "../components/LayoutBg/page";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "../components/Button";
import { useState } from "react";

export default function Login() {

  const { data: session } = useSession();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message || data.error);
    console.log("Session:", session);
  };

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert(result.error);
    }
  };

  return (
    <>
      <Navbar />
      <LayoutBg />

      <div className={styles.loginContainer}>
      {session ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <div className={styles.loginForm}>
            <h2>Login</h2>
            <Button onClick={() => signIn("google")}>Sign in with Google</Button>     
              <input className={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
             <input className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isLogin ? (
                <Button onClick={handleLogin}>Login</Button>
              ) : (
                <Button onClick={handleSignup}>Sign up</Button>
              )}  
               <Button
                  className={styles.toggleButton}
                  onClick={() => setIsLogin(!isLogin)}
                  >
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </Button>
               
              
              
          </div>
      
      )}
    </div>

      <PageIcon />
      <Footer />
    </>
  );
}
