import styles from './Agenda.module.css';
import { gigs } from '../../Data/gigs';
import { useTranslation } from 'react-i18next';


export default function Agenda() {

  const { t } = useTranslation('agenda');

    return (

      <>
      
      <div className={styles.liveActs}>
        {t("Live Acts")}
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={styles.row}>
          <th className={styles.date}>{t("Date")}</th>
            <th className={styles.venue}>{t("Venue")}</th>
            <th className={styles.location}>{t("Location")}</th>
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
 