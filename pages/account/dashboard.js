import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { parseCookies } from '@/helpers/index';
import styles from '@/styles/Dashboard.module.css';
import DashboardEvent from '@/components/DashboardEvent';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardPage({ events, token }) {
  const router = useRouter();

  const deleteEvent = async (id) => {
    // Validation
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.data.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}
