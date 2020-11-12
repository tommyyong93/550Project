import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({
  text
}) => (
  <div style={{
    color: 'white',
    background: 'red',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
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
          defaultCenter={{lat : this.props.latitude,lng:this.props.longitude}}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={this.props.latitude}
            lng={this.props.longitude}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}