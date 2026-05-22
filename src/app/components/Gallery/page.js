import Image from 'next/image';
import styles from './gallery.module.css';

const images = [
 
  { src: '/assets/img/disneyland.jpeg', alt: 'Band Image 1' },
  { src: '/assets/img/tiagão e beto.jpg', alt: 'Band Image 2' },
  { src: '/assets/img/cartel-band-moshpit.jpg', alt: 'Band Image 3' },
  { src: '/assets/img/CVartel moshpit.jpeg', alt: 'Band Image 5' },
  { src: '/assets/img/Cartel logo.jpeg', alt: 'Band Image 6' },
  { src: '/assets/img/theband at musiclight.jpg', alt: 'Band Image 7' },
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