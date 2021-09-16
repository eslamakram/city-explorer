import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


class Weather extends Component {
    render() {
        return (
            <Card border="success" style={{ width: '20rem', margin:'30px' , color:'gray'}}>
                <Card.Header>Date: {this.props.date}</Card.Header>
                <Card.Body>
                    <Card.Title> <img src="https://www.indivstock.com/static27/preview2/stock-vector-sunny-cloud-daylight-weather-forecast-icon-symbol-design-391262.jpg" style={{ width: '5rem'}} alt={'weather'}></img> </Card.Title>
                    <Card.Text>
                      Description: {this.props.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default Weather
