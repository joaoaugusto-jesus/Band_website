import styles from './Agenda.module.css';
import { gigs } from "../../Data/gigs"; 


export default function Agenda({ gigs }) {
    return (
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.row}>
          <th className={styles.date}>Date</th>
            <th className={styles.venue}>Venue</th>
            <th className={styles.location}>Location</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {gigs.map((gig) => (
            <tr key={gig.id} className={styles.row}>
              <th className={styles.date}>{gig.date}</th>
            <th className={styles.venue}>{gig.venue}</th>
            <th className={styles.location}>{gig.location}</th>
            </tr>
          ))}
        </tbody>
      </table>
    ); 
  }
  console.log(gigs)