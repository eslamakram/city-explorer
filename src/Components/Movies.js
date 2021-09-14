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
                                { this.props.moviesData.map(movie => {
                                <tr>                                                        
                                         <td><img src='{movie.image_url}'/></td>
                                         <td>{movie.title}</td>
                                         <td>{movie.overview}</td>
                                         <td>{movie.popularity}</td>
                                         <td>{movie.released_on}</td>
                                         <td>{movie.average_votes}</td>
                                         <td>{movie.total_votes}</td>
                                        
                                 </tr>
    })}
                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>
        )
    }
}

export default Movies
