import React, { Component } from 'react';
import NavBAR from './Components/NavBAR';
import ExploreForm from './Components/ExploreForm';
import LocationIQ from './Components/LocationIQ';
import axios from 'axios';

 class App extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        showData: false,
        display_name: " ",
        type: " ",
        latitude: " ",
        longitude: " ",
        mapSrc:''
      };
    }
      handleLocation = (event) => {
        let selectedCity = event.target.value;
        this.setState = ({
          display_name: selectedCity
        })
      }


      handleSubmit = (e) => {
        e.preventDefault();
        let config = {
          method: 'GET',
          baseURL: `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.display_name}&format=json`

        }
      
// GET request for location info 
      axios(config).then(response => {
        let responseData = response.data[0];
        this.setState = ({
          showData: true,
          display_name: responseData.display_name,
          type: responseData.type,
          latitude: responseData.latitude,
          longitude: responseData.longitude,
          mapSrc:responseData.imgSrc
        })
      })


// GET request for map image 
axios({
  method: 'GET',
  url: `https://tiles.locationiq.com/v3/hybrid/raster?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&format=json&q=${this.state.display_name}`,
})
  .then(response => {
   let mapResponse= response.data[0];
    this.setState =({
      mapSrc: mapResponse.url
    })
  });

    }
    render() {
    return (
      <>
        <NavBAR />
        <ExploreForm handleLocation={this.handleLocation} handleSubmit={this.handleSubmit} />
        {this.state.showData && <LocationIQ   display_name={this.state.display_name}
                      type= {this.state.type}
                      latitude= {this.state.latitude}
                      longitude= { this.state.longitude} />}


      </>
    )
  }
}

export default App

