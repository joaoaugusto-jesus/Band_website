import Image from 'next/image';
import styles from './gallery.module.css';

const images = [
  { src: '/assets/img/snazi 2.jpg', alt: 'Band Image 1' },
  { src: '/assets/img/snazi 5.jpg', alt: 'Band Image 2' },
  { src: '/assets/img/snazi 3.jpg', alt: 'Band Image 3' },
  { src: '/assets/img/snazi 4.jpg', alt: 'Band Image 4' },
  { src: '/assets/img/cortez na disneyland.jpg', alt: 'Band Image 4' },
  { src: '/assets/img/timebomb.jpg', alt: 'Band Image 4' },
  { src: '/assets/img/tiagão e beto.jpg', alt: 'Band Image 4' },
  
  { src: '/assets/img/the band.jpg', alt: 'Band Image 4' },
  { src: '/assets/img/theband at musiclight.jpg', alt: 'Band Image 4' },
  // Add more images as needed
];

export default function Gallery() {
  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div key={index} className={styles['gallery-item']}>
          <Image 
            src={image.src} 
            alt={image.alt} 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
      ))}
    </div>
  );
}