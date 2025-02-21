import styles from './Agenda.module.css';
import { gigs } from ' @/app/Data/gigs';


export default function Agenda() {


    return (

      <>
      
      <div className={styles.liveActs}>
        Live Acts
      </div>
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
      </>
    ); 
  }
 