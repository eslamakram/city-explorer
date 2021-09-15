import React, { Component } from 'react';
// import NavBAR from './Components/NavBAR';
import ExploreForm from './Components/ExploreForm';
import LocationIQ from './Components/LocationIQ';
import Weather from './Components/Weather';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movies from './Components/Movies';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showData: false,
      display_name: " ",
      type: " ",
      latitude: " ",
      longitude: " ",
      mapSrc: '',
      weatherData: [],
      moviesData: []
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
        mapSrc: responseData.imgSrc,
        
      }).then(()=>{axios.get(`${process.env.BACKEND_URL}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}` || `${process.env.BACKEND_URL}/localweather?lat=${this.state.latitude}&lon=${this.state.longitude}` ).then
    res => {this.setState({
            weatherData: res.data
          });}}).then(()=>{axios.get(`${process.env.BACKEND_URL}/movies?`).then(res =>{
            this.setState({
              moviesData: res.data
            })
          })})
        })

   
  }
  render() {
    return (
      <>
        <ExploreForm
          handleLocation={this.handleLocation}
          handleSubmit={this.handleSubmit}
        />
        {this.state.showData &&
          <LocationIQ
            display_name={this.state.display_name}
            type={this.state.type}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
          />
        }

        {
          this.state.weatherData.map( day=> {
           return  <Weather  
                       date={day.date}
                       description={day.description}
            />

          })
        } 

        {
         <Movies moviesData={this.state.moviesData} />
        }

      </>
    )
  }
}

export default App

