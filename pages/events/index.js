import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import { API_URL, PER_PAGE } from '@/config/index';

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 && <h3>No events to show.</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  //calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //fetch total count
  const totalRes = await fetch(`${API_URL}/api/events?populate=*`);
  const total = await totalRes.json();

  //fetch event
  const eventRes = await fetch(
    `${API_URL}/api/events?populate=*&_sort=date:ASC&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`
  );
  const events = await eventRes.json();

  return {
    props: {
      events: events.data,
      page: +page,
      total: total.meta.pagination.total,
    },
  };
}
