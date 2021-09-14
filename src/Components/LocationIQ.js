import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

class LocationIQ extends Component {
    render() {
        return (
            <>
            {/* <h1>hello</h1> */}
                 <Card border="warning" style={{ width: '20rem', margin:'30px' , color:'gray'} }>
                    <Card.Header>Welcome to Exploer City! </Card.Header>
                    <Card.Img  style={{ width: '19rem', margin: '10px' }} variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY} &center=${this.props.latitude},${this.props.longitude}&zoom=1-18`}/>

                    <Card.Body>
                        <Card.Title>{this.props.display_name}</Card.Title>
                        <Card.Text>

                            <ListGroup variant="flush">
                                <ListGroup.Item>City Name: {this.props.display_name}</ListGroup.Item>
                                <ListGroup.Item>Type: {this.props.type}</ListGroup.Item>
                                <ListGroup.Item>Latitude: {this.props.latitude}</ListGroup.Item>
                                <ListGroup.Item>Longitude: {this.props.longitude}</ListGroup.Item>
                            </ListGroup>

                        </Card.Text>
                    </Card.Body>
                </Card> 
            </>
        )
    }
}

export default LocationIQ
