import React, { Component } from 'react';
// import NavBAR from './Components/NavBAR';
import ExploreForm from './Components/ExploreForm';
import LocationIQ from './Components/LocationIQ';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    
      handleLocation = async (event) => {
        let selectedCity = event.target.value;
        console.log(selectedCity, 'hi');
        await this.setState({
          display_name: selectedCity
        })
      }


      handleSubmit = (e) => {
        e.preventDefault();
        console.log('i sended data')

        let config = {
                    method: 'GET',
          // baseURL: `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.display_name}&format=json`
          baseURL: `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.display_name}`
        }
        console.log(config)
        console.log(this.state)
      
// GET request for location info 
      axios(config).then(response => {
        let responseData = response.data[0];
        this.setState({
          showData: true,
          display_name: responseData.display_name,
          type: responseData.type,
          latitude: responseData.lat,
          longitude: responseData.lon,
          mapSrc:responseData.imgSrc
        })
      })


//GET request for map image 
// axios({
//   method: 'GET',
//   url: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&zoom=1-18&q=${this.state.display_name}`,
// })
//   .then(response => {
//    let mapResponse= response.data[0];
//     this.setState({
//       mapSrc: mapResponse.url
//     })
//   });

    }
    render() {
    return (
      <>
        {/* <NavBAR /> */}
        <ExploreForm 
                     handleLocation={this.handleLocation} 
                     handleSubmit={this.handleSubmit} 
                    />
         {this.state.showData && 
          <LocationIQ    
                       display_name = {this.state.display_name}
                       type = {this.state.type}
                       latitude = {this.state.latitude}
                       longitude = { this.state.longitude} 
                        />  
 }

      </>
    )
  }
}

export default App

