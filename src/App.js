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
        
      }).then(()=>{axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API_KEY}&lat=${this.state.latitude}&lon=${this.state.longitude}`).then
    res => {this.setState({
            weatherData: res.data
          });}}).then(()=>{axios.get(`https://api.themoviedb.org/3/movie/550?key=${process.env.REACT_APP_MOVIES_API_KEY}
          `).then(res =>{
            this.setState({
              moviesData: res.data
            })
          })})
    
      

    });

//axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/movies?`).then( res =>{
//   this.setState({
//     moviesData: res.data
//   });
// });

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

