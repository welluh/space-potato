import qs from 'qs';
import React, { useReducer } from 'react';
import useSWR from 'swr';
import GoogleMapReact from 'google-map-react';
import Head from 'next/head';

import Drawer from '../components/Drawer/Drawer';
import Marker from '../components/Map/Marker/Marker';

const defaultProps = {
  center: {
    lat: 60.16952,
    lng: 24.93545,
  },
  zoom: 16,
};

const range = 20;
const limit = 100;

const params = qs.stringify({
  ...defaultProps.center,
  range,
  limit,
});

export default function Map() {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/places?${params}`, fetcher);
  const places = data?.data;

  function drawerReducer(state: Object, action: { type: String, payload: Object }) {
    switch (action.type) {
      case 'open':
        return action.payload;
      default:
        return { active: false, place: null };
    }
  }

  const initialState = {
    active: false,
  };
  const [ state, dispatch ] = useReducer(drawerReducer, initialState);
  const { active, place } = state;
  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <Head>
        <title>{place ? place.name.fi : 'Place locator'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

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
                place={place}
                name={place.name.fi}
                openingHours={place.opening_hours}
                key={place.name.fi}
                dispatch={dispatch}
              />
            )
          })}
        </GoogleMapReact>
      </div>

      <Drawer active={active} place={place} dispatch={dispatch} />
    </>
  );
}
