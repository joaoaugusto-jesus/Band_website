import styles from './Agenda.module.css';

const gigsData = [
    {
      id: 1,
      date: "2025-02-14",
      venue: "The Grand Arena",
      location: "New York, NY",
    },
    {
      id: 2,
      date: "2025-02-20",
      venue: "City Lights Theater",
      location: "Los Angeles, CA",
    },
  ];

export default function Agenda() {

 


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
          {gigsData.map((gig) => (
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
  console.log(gigsData)