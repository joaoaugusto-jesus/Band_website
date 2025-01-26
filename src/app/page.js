
import styles from "./page.module.css";
import Head from 'next/head';
import Navbar from "./components/Navbar/page";
import Hero from "./components/Hero";
import Footer from "./components/Footer/page";
import PageIcon from "./components/Icons/page";

export default function Home() {
  return (
   
    <div className={styles.page}>
       <Head>
        <title>Band Website - Home</title>
        <meta name="description" content="Official website of the band. Check out our latest music, videos, merchandise, and more!" />
        <meta name="keywords" content="band, music, videos, merchandise, live shows" />
        <meta name="author" content="The Band Name" />
        <meta property="og:title" content="Band Website - Home" />
        <meta property="og:description" content="Official website of the band." />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta property="og:url" content="https://yourbandwebsite.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/logo.ico" type="img/png" />
      </Head>
      <Navbar />
      
      
      <Hero />
        
    
    </div>
  );
}
