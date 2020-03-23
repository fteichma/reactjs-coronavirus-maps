import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import './App.css';


function Map() {
  return (
    <GoogleMap defaultZoom={1}
      defaultCenter={{ lat: 0.000000, lng: 0.000000 }}
    />
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));
const googleKey = process.env.REACT_APP_GOOGLE_KEY;


export default function App() {
  return (
    <div className="App">
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleKey}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `50px` }} />}
        mapElement={<div style={{ height: `100%` }} />} />
    </div>
  );
}
