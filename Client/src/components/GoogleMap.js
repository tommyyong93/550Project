import React from 'react';
import GoogleMapReact from 'google-map-react';

const MarkerComponent = ({
  text
}) => (
  <div style={{
    color: 'white',
    background: 'red',
    width: '23px',
    height: '23px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: 'solid black 2px'
  }}>
    {text}
  </div>
);

export default class GoogleMap extends React.Component {


  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_API_KEY}}
          center={{lat : this.props.latitude,lng: this.props.longitude}}
          zoom={11}
        >
          {this.props.markers && this.props.markers.length > 0 &&
            this.props.markers.map((marker,i) => (
              <MarkerComponent
                key={marker.title}
                lat={marker.lat}
                lng={marker.long}
                text={i+1}
              />
            ))}
        </GoogleMapReact>
      </div>
    );
  }
}