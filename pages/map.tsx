import React from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from '../components/Map/Marker';

export default function Map() {
  const defaultProps = {
    center: {
      lat: 60.16952,
      lng: 24.93545,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLEMAPS_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={60.16952}
          lng={24.93545}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
