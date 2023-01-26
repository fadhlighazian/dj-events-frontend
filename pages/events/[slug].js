import Layout from '@/components/Layout';
import EventMap from '@/components/EventMap';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
//import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({ evt }) {
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString('en-US')} at{' '}
          {evt.attributes.time}
        </span>

        <h1>{evt.attributes.name}</h1>

        <ToastContainer />

        {evt.attributes.image.data ? (
          <div className={styles.image}>
            <Image
              src={evt.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={960}
              alt={evt.attributes.slug}
            />
          </div>
        ) : (
          <div className={styles.image}>
            <Image
              src={'/images/event-default.png'}
              width={960}
              height={960}
              alt={evt.attributes.slug}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>

        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>

        <h3>Venue: {evt.attributes.value}</h3>
        <p>{evt.attributes.address}</p>

        <EventMap evt={evt} />

        <Link href='/events'>
          <p className={styles.back}>{'<'} Go Back</p>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();

//   const paths = events.data.map((evt) => ({
//     params: { slug: evt.attributes.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(
//     `${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`
//   );
//   const events = await res.json();

//   return {
//     props: {
//       evt: events.data[0],
//     },
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  );
  const events = await res.json();
  return {
    props: {
      evt: events.data[0],
    },
  };
}
