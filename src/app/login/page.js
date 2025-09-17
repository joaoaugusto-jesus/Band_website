"use client";

import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import PageIcon from "../components/Icons/page";
import Button from "../components/Button";
import styles from "./Login.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export default function Login() {
  const { data: session } = useSession();
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation("login");

  // Limpa inputs e erros
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  // Alterna entre login e signup e limpa campos
  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
    resetForm();
  };

  // Função centralizada para login/signup
  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (authMode === "login") {
        // Login com credentials
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        }
        // Não chamar resetForm aqui — evita 401
      } else {
        // Signup
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (res.ok) {
          alert("Signup successful! Please log in.");
          setAuthMode("login");
          resetForm(); // Limpa campos após signup
        } else {
          setError(data.error || "Signup failed");
        }
      }
    } catch (err) {
      setError ("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Login com Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn("google");
      // resetForm aqui é seguro porque Google redireciona imediatamente
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
              <p>{t("Signed in as")} {session.user.email}</p>
              <Button onClick={() => signOut()}>{t("Sign out")}</Button>
            </>
          ) : (
            <div className={styles.loginForm}>
              {/* Social login */}
              <Button onClick={handleGoogleLogin} disabled={loading}
              className={styles.googleButton}>
                {loading ? "Redirecting..." : t("Sign in with Google")}
              </Button>
              <div className={styles.formContainer}>
                <h2 className={styles.logged}>
                {authMode === "login" ? t("login") : t("Sign Up")}
              </h2>

              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            
              {error && <p className={styles.error}>{error}</p>}
              
              <Button onClick={handleSubmit} disabled={loading}
              className={styles.submitButton}>
                {loading
                  ? authMode === "login"
                    ? t("Logging in...")
                    : t("Signing up...")
                  : authMode === "login"
                  ? t("login")
                  : t("Sign Up")}
              </Button>
              </div>
              <Button className={styles.toggleButton} onClick={toggleAuthMode}>
                {authMode === "login"
                  ? t("Don't have an account? Sign up")
                  : t("Already have an account? Login")}
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
