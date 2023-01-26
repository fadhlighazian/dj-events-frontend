import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from '@/styles/DasboardEvent.module.css';

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.attributes.slug}`}>
          <span>{evt.attributes.name}</span>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <span className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
        </span>
      </Link>
      <a
        href='#'
        className={styles.delete}
        onClick={() => handleDelete(evt.id)}
      >
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
}
