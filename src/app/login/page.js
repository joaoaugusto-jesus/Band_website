"use client";

import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import styles from "./Login.module.css";
import PageIcon from "../components/Icons/page";
import LayoutBg from "../components/LayoutBg/page";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "../components/Button";


export default function Login() {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      <LayoutBg />

      <div className={styles.loginContainer}>
        {session ? (
          <>
            <p className={styles.userSignedIn}>Signed in as {session.user.email}</p>
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <>
            <p className={styles.userNotSignedIn}>Not signed in</p>
            <Button onClick={() => signIn()}>Sign in</Button>
          </>
        )}
      </div>

      <PageIcon />
      <Footer />
    </>
  );
}
