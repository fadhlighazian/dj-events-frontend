import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import Link from 'next/link';

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.data.length === 0 && <h3>No events to show.</h3>}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      {events.data.length > 0 && (
        <Link href='/events'>
          <p className='btn-secondary'>View All Events</p>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?populate=*&_sort=date:ASC&_limit=3`
  );
  const events = await res.json();

  return {
    props: {
      events,
    },
    revalidate: 1,
  };
}
