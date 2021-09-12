import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

class LocationIQ extends Component {
    render() {
        return (
            <>
                <Card border="warning" style={{ width: '18rem' }}>
                    <Card.Header>Welcome to Exploer City! </Card.Header>
                    <Card.Img variant="top" src={this.props.mapSrc} />

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
                <br />
            </>
        )
    }
}

export default LocationIQ
