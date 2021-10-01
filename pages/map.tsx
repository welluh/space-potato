import qs from 'qs';
import React from 'react';
import useSWR from 'swr';
import GoogleMapReact from 'google-map-react';

import Marker from '../components/Map/Marker/Marker';

const defaultProps = {
  center: {
    lat: 60.16952,
    lng: 24.93545,
  },
  zoom: 11,
};

export default function Map() {
  const range = .1;
  const limit = 20;
  const params = qs.stringify({
    ...defaultProps.center,
    range, 
    limit,
  });

  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/places?${params}`, fetcher);
  const places = data?.data;
  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLEMAPS_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {places.map((place: any, index: number) => {
          const { location } = place;
          const { lat, lon: lng } = location;          

          return (
            <Marker
              lat={lat}
              lng={lng}
              name={place.name.fi}
              openingHours={place.opening_hours}
              key={index}
            />
          )
        })}
      </GoogleMapReact>
    </div>
  );
}
