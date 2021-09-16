import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

class Movies extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <br /><br />
                        <h3>THE TOP TWENTY MOVIES</h3><br />

                        <Table striped bordered hover responsive="md">
                            <thead>
                                <tr>
                                    <th>Movie</th>
                                    <th>Movie Title</th>
                                    <th>Describtion</th>
                                    <th>Popularity</th>
                                    <th>Released on</th>
                                    <th>Average Votes</th>
                                    <th>Total Votes</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr>                                                        
                                         <td><img src={this.props.image_url} alt={'movie'}/></td>
                                         <td>{this.props.title}</td>
                                         <td>{this.props.overview}</td>
                                         <td>{this.props.popularity}</td>
                                         <td>{this.props.released_on}</td>
                                         <td>{this.props.average_votes}</td>
                                         <td>{this.props.total_votes}</td>
                                        
                                 </tr>
    
                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>
        )
    }
}

export default Movies
