
import styles from "./page.module.css";
import Head from 'next/head';
import Navbar from "./components/Navbar/page";
import Hero from "./components/Hero";


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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
      </Head>
      <Navbar />
      
      
      <Hero />
        
    
    </div>
  );
}
