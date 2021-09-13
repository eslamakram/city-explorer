import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

class ExploreForm extends Component {
    render() {
        return (
            <>

                <Row className="g-2">
                    <Form onSubmit={this.props.handleSubmit}>
                        <Col md>
                            <Form.Label>City Name</Form.Label>
                            <input type="text" onChange={this.props.handleLocation} />
                        </Col>
                        <Col md>
                            <Button variant="warning" size="lg" type="submit">Exploer</Button>
                        </Col>
                    </Form>
                </Row>
            </>
        )
    }
}

export default ExploreForm
