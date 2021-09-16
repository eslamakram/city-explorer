import React, { Component } from 'react';
// import NavBAR from './Components/NavBAR';
import ExploreForm from './Components/ExploreForm';
import LocationIQ from './Components/LocationIQ';
import Weather from './Components/Weather';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movies from './Components/Movies';
import { Alert } from 'react-bootstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showData: false,
      showWeather: false,
      showMovie: false,
      display_name: " ",
      type: " ",
      latitude: " ",
      longitude: " ",
      mapSrc: '',
      weatherData: [],
      moviesData: [],
      error: " "
    }
  }

  handleLocation = (event) => {
    let selectedCity = event.target.value;
    console.log(selectedCity, 'hi');
     this.setState({
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
        //|| `${process.env.BACKEND_URL}/localweather?lat=${this.state.latitude}&lon=${this.state.longitude}`
      })
    }).then(()=>{
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`)
      .then( res => {
        this.setState({
            weatherData: res.data,
            showWeather:true
          });
        });
      }).then(()=>{
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies?cityName=${this.state.display_name}`)
          .then(res =>{
            this.setState({
              moviesData: res.data,
              showMovie: true
            })
          })
        }).catch((e)=>{
          console.log(e.response);
          this.setState({
            error:e.response.data.error
          });
        });
        

   
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
                       longitude={this.state.longitude} />
        }

        {this.state.error && <Alert> Kindly Check {this.state.error}</Alert>}

        { this.state.showWeather &&  this.state.weatherData.map( day=> {
           return  <Weather  
                             date={day.date}
                             description={day.description}
            />

          })
        } 

        { this.state.showMovie && this.state.moviesData.map( movie=> {
          return  <Movies 
                             title={movie.title}
                             image_url={movie.image_url}
                             overview= {movie.overview}
                             popularity= {movie.popularity}
                             released_on= {movie.released_on}
                             average_votes= {movie.average_votes}
                             total_votes= {movie.total_votes} />
        })
        
        }

      </>
    )
  }
}

export default App

