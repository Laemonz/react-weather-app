import { Component } from "react";
import {Tabs, Tab, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import CurrentWeather from './CurrentWeather.js'


class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            city: null,
            lat: null,
            long: null,
            submitType: 'none',
            submitted: false
        }
    }

    submitCity = (event) =>{
        event.preventDefault();
        this.setState({submitted: true})
        this.setState({submitType: 'city'})
    }
    
    submitCoords = (event) =>{
        event.preventDefault();
        this.setState({submitted: true})
        this.setState({submitType: 'coords'})
    }

    componentDidUpdate(prevProps, prevState){
        if (this.state.submitted === true && prevState.submitted !== this.state.submitted){
            this.setState({submitted: false})
        }
    }

    render(){
        return(
            <div>
                <div id='search'>
                    <Tabs defaultActiveKey="city" id="uncontrolled-tab-example">
                        <Tab eventKey="city" title="Enter a City">
                            <Form onSubmit={this.submitCity}>
                                <Form.Group controlId="formCity">
                                    <Form.Label>City Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter City" onChange={(event)=>this.setState({city: event.target.value})}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Tab>
                        <Tab eventKey="coord" title="Coordinates">
                            <Form onSubmit={this.submitCoords}>
                                <Form.Group controlId="formLatLong">
                                    <Form.Label>Latitude</Form.Label>
                                    <Form.Control type="text" placeholder="Latitude" onChange={(event)=>this.setState({lat: event.target.value})}/>
                                    <Form.Label>Longitude</Form.Label>
                                    <Form.Control type="text" placeholder="Longitude" onChange={(event)=>this.setState({long: event.target.value})}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Tab>
                    </Tabs>
                    {/* {console.log(this.state.city+' '+this.state.lat+' '+this.state.long+' '+this.state.submitted+' '+this.state.submitType)} */}
                    <CurrentWeather city={this.state.city} lat={this.state.lat} long={this.state.long} submitType={this.state.submitType} submitted={this.state.submitted} />
                </div>
                
            </div>
            
        )
    }
}

export default Search