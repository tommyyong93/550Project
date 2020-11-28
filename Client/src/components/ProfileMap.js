import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({
  text
}) => (
  <div style={{
    color: 'white',
    background: 'blue',
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
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_API_KEY}}
          center={{lat : this.props.latitude,lng:this.props.longitude}}
          defaultZoom={11}
        >
          {this.props.latitude && this.props.longitude ?
            <AnyReactComponent
              lat={this.props.latitude}
              lng={this.props.longitude}
            /> : null}
        </GoogleMapReact>
      </div>
    );
  }
}