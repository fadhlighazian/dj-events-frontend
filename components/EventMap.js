import Image from 'next/image';
import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(70.89831);
  const [lng, setLng] = useState(-80.2313);

  useEffect(() => {
    async function fetchDataGeocoding() {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${evt.attributes.address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
      );

      const geo = await res.json();
      setLng(geo.features[0].geometry.coordinates[0]);
      setLat(geo.features[0].geometry.coordinates[1]);
    }

    fetchDataGeocoding();
  }, []);

  return (
    <div>
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          center: [lng, lat],
          zoom: 1,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle='mapbox://styles/mapbox/light-v10'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      >
        <Marker longitude={lng} latitude={lat}>
          <Image src='/images/pin.svg' alt='pin' width={30} height={30} />
        </Marker>
      </Map>
      {lat}
      {lng}
    </div>
  );
}
