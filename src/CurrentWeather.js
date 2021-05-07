import axios from 'axios';
import { Component } from "react";
import {Spinner, Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class CurrentWeather extends Component{

  constructor(props){
      super(props)
      this.state={
        temperatureK: null,
        feels_likeK: null,
        temperatureC: null,
        feels_likeC: null,
        temperatureF: null,
        feels_likeF: null,
        humidity: null,

        windSpeedK: null,
        windSpeedKPH: null,
        windSpeedMPH: null,
        windDeg: null,

        cityName: null,
        countryName: null,
        description: null,
        iconURL: null,

        city: null,
        lat: null,
        long: null,
        submitType: 'none',
        submitted: false,
        loading: false,
        error: false
      }
  }

  getWeatherCity(city, units){
    // https://openweathermap.org/current

    console.log("Weather City API called")

    const API_URL       = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY       =  process.env.REACT_APP_API_KEY;
    const URL           = `${API_URL}?q=${city}&appid=${API_KEY}&units=${units}`;

    axios
    .get(URL)
    .then((response) => {
      this.assignStates(response, units)
      console.log("Weather City API data loaded")
      this.setState({loading: false})
    })
    .catch(err =>{
      console.log(err)
      this.setState({error: true})
    });
  }

  getWeatherCoords(lat, long, units){
     // https://openweathermap.org/current

     console.log("Weather Coords API called")

     const API_URL       = 'https://api.openweathermap.org/data/2.5/weather';
     const API_KEY       =  process.env.REACT_APP_API_KEY;
     const URL           = `${API_URL}?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${units}`;
  
     axios
     .get(URL)
     .then((response) => {
       this.assignStates(response, units)
       console.log("Weather Coords API data loaded")
       this.setState({loading: false})
     })
     .catch(err =>{
       console.log(err)
       this.setState({error: true})
     });
  }

  assignStates = (response, units) => {
    this.setState({cityName:        response.data.name})
    this.setState({countryName:     response.data.sys.country})
    this.setState({description:     response.data.weather[0].description})
    this.setState({iconURL:         "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"})
    this.setState({humidity:        response.data.main.humidity})
    this.setState({windDeg:         response.data.wind.deg})
    this.setState({windDireciion: this.getWindDirection(this.state.windDeg)})

    if (units === 'metric'){
      this.setState({temperatureC:    response.data.main.temp})
      this.setState({feels_likeC:     response.data.main.feels_like})
      this.setState({windSpeedKPH:    response.data.wind.speed})
      
    }
    else if (units === "imperial"){
      this.setState({temperatureC:    response.data.main.temp})
      this.setState({feels_likeC:     response.data.main.feels_like})
      this.setState({windSpeedMPH:    response.data.wind.speed})
    }
    else if (units === 'standard'){
      this.setState({temperatureK:    response.data.main.temp})
      this.setState({feels_likeK:     response.data.main.feels_like})
      this.setState({windSpeedK:      response.data.wind.speed})
    }
  }

  getWindDirection(d) {
      d = d % 360;

      if (11.25 <= d && d < 33.75) {
        return "NNE";
      } else if (33.75 <= d && d < 56.25) {
        return "NE";
      } else if (56.25 <= d && d < 78.75) {
        return "ENE";
      } else if (78.75 <= d && d < 101.25) {
        return "E";
      } else if (101.25 <= d && d < 123.75) {
        return "ESE";
      } else if (123.75 <= d && d < 146.25) {
        return "SE";
      } else if (146.25 <= d && d < 168.75) {
        return "SSE";
      } else if (168.75 <= d && d < 191.25) {
        return "S";
      } else if (191.25 <= d && d < 213.75) {
        return "SSW";
      } else if (213.75 <= d && d < 236.25) {
        return "SW";
      } else if (236.25 <= d && d < 258.75) {
        return "WSW";
      } else if (258.75 <= d && d < 281.25) {
        return "W";
      } else if (281.25 <= d && d < 303.75) {
        return "WNW";
      } else if (303.75 <= d && d < 326.25) {
        return "NW";
      } else if (326.25 <= d && d < 348.75) {
        return "NNW";
      } else {
        return "N";
      }
  }

  loading(){
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only"></span>
        </Spinner>
    )
  }

  displayWeather = () =>{
    let place;
    if (this.state.cityName == null || this.state.countryName == null)
      place=<p></p>
    else
      place = <p>{this.state.cityName}, {this.state.countryName}</p>
    return(
      <div>
        {place}
        <p>{this.state.temperatureC.toFixed(1)}&#176;C <img src={this.state.iconURL} alt=''></img></p>
        <p>Humidity: {this.state.humidity.toFixed(1)}% </p>
        <p>Feels Like {this.state.feels_likeC.toFixed(1)}&#176;C</p>
        <p>Wind: {this.state.windSpeedKPH.toFixed(1)} {this.state.windDireciion} </p>
        <p>Conditions: {this.state.description}</p>
      </div>  
    )
  }

  static getDerivedStateFromProps(props, state){
    return{
      city: props.city,
      lat: props.lat,
      long: props.long,
      submitted: props.submitted,
      submitType: props.submitType
    };
  }

  componentDidUpdate(prevProps, prevState){
    if ((prevProps.submitted !== this.props.submitted) && this.props.submitted!== false){
      if (this.state.submitted === true){
        // search has sent us our quiery, lets get its weather!
        this.setState({submitted: false})
        this.setState({loading: true})

        if (this.state.submitType === 'city'){
          this.getWeatherCity(this.state.city, 'metric')
        }
        else if (this.state.submitType === 'coords'){
          this.getWeatherCoords(this.state.lat, this.state.long, 'metric')
        }
      }
    }
    if ((prevState.error !== this.state.error) && this.state.error!== true){
      this.setState({error: false})
    }
    
  }

  render(){
    if (!this.state.loading && this.state.cityName!= null){
      return this.displayWeather()
      //return (<p>Some weather</p>)
    }
    else if (this.state.error){
      return (<Alert id='error-alert' variant='danger'>Please enter a valid city or pair of coordinates!</Alert>)
    }
    else if (this.state.loading){
      return this.loading()
    }
    else{
      return null
    }
  }

}

export default CurrentWeather