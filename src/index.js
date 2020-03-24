import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map as LeafletMap, GeoJSON, Marker, Popup } from 'react-leaflet';
import worldGeoJSON from 'geojson-world-map';
import './styles.css';
import countryCode from './countrycode-latlong';
import "leaflet/dist/leaflet.css";

import L from "leaflet";

const customMarker = (ratio) => new L.icon({
  iconUrl: "https://cdn.pixabay.com/photo/2020/03/19/15/09/coronavirus-4947717_1280.png",
  iconSize: 20 * ratio,
  iconAnchor: [10 * ratio, 10 * ratio],
});

const customMarker2 = (ratio) => 

const axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      data: [],
      center: [0, 0],
      zoom: 3,
    };
  }

  getData() {
    axios.get("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
      "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "80e047913amsh644f35962c028e6p1aa841jsn7e10886a1614"
      }
    })
      .then(response => {
        this.setState({
          data: response.data.countries_stat
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <LeafletMap
        center={[0, 0]}
        zoom={3}
        maxZoom={5}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
        style={{ height: "100vh" }}
      >
        <GeoJSON
          data={worldGeoJSON}
          style={() => ({
            weight: 0.5,
            fillColor: "#2A2A28",
            fillOpacity: 1,
            strokeColor: "black",
          })}
        />
        {this.state.data.map((value, index) => {
          let cases = value.cases.replace(/,/g, "");
          let cases_ratio = (cases / 20000).toFixed(2) ? (cases / 20000).toFixed(2) : 0;
          cases_ratio++;
          let m1 = value.total_cases_per_1m_population.replace(/,/g, "");
          let percentage = (m1 / 1000).toFixed(2);
          return (
            (countryCode.find((el) => el.name === value.country_name)) &&
            (<Marker key={index} position={
              countryCode.find((el) => el.name === value.country_name) &&
              countryCode.find((el) => el.name === value.country_name).latlng
            } icon={customMarker(cases_ratio)}>
              <Popup>
                <p style={{ margin: 0, padding: "0 0 5px", lineHeight: 1.2 }}><b>{value.country_name}</b></p>
                <p style={{ margin: 0, padding: 0, lineHeight: 1.2 }}><b>Cases: </b> {value.cases}</p>
                <p style={{ margin: 0, padding: 0, lineHeight: 1.2 }}><b>Today cases: </b> {value.new_cases}</p>
                <p style={{ margin: 0, padding: 0, lineHeight: 1.2 }}><b>Deaths: </b> {value.deaths}</p>
                <p style={{ margin: 0, padding: 0, lineHeight: 1.2 }}><b>Today deaths: </b> {value.new_deaths}</p>
                <p style={{ margin: 0, padding: 0, lineHeight: 1.2 }}><b>Recovered: </b> {value.total_recovered}</p>
                <p style={{ margin: 0, padding: 0, lineHeight: 1.2 }}><b>Active: </b> {value.active_cases}</p>
                <p style={{ margin: 0, padding: 0, lineHeight: 1.2 }}><b>Critical: </b> {value.serious_critical}</p>
                <p style={{ margin: 0, padding: 0, lineHeight: 1.2 }}><b>Per 1m: </b>{value.total_cases_per_1m_population} (%{percentage})</p>
              </Popup>
            </Marker>)
          )
        })
        }
      </LeafletMap>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);