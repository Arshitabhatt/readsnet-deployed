import React, { Component } from 'react';
import axios from 'axios';
import Footer from './footer';
import '../styles/upcoming.css'

export default class UpcomingList extends Component{
    constructor(props){
        super(props);
        this.updateSearch = this.updateSearch.bind(this);
        this.state = {
            events: [],
            cara: [],
            search: '',
            loading: true
        };
    }
    // componentDidMount() {
       
    //     axios.get('http://localhost:5000/')
    //     .then(res =>{this.setState({
    //         events: res.data,
    //         });
    //     }).catch((err) =>{
    //         console.log(err)
    //      })
    // }

    componentDidMount() {
       Promise.all([
        axios.get('http://localhost:5000/upcoming'),
        axios.get('http://localhost:5000/caraousel')
       ]).then(([res1, res2]) =>{
           this.setState({
            events: res1.data,
            cara: res2.data
            });
            console.log(this.state.events)
           console.log(this.state.cara);

        }).catch((err) =>{
            console.log(err)
         })
    }

    updateSearch(e){
        console.log(e.target.value)
        this.setState({
            search: e.target.value
        })
       
    }
    
    render(){
        
        let filterEvents = this.state.events.filter((evt) => 
           {
               return evt.city.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
           }
        )

        return(
            <div>
                {this.state.cara.map((caraousel) => {
                    return(
                                <div className="mt-0 mb-5">
                                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel" data-interval="5000">
                                <div className="carousel-inner">

                                <div className="carousel-item active">
                                    <img src={require('../uploads/Cover image.png')} className="d-block w-100" alt="1"></img>
                                </div>
                                
                                <div className="carousel-item">
                                    <img src={caraousel.cara1} className="d-block w-100" alt="2"></img>
                                </div>

                                <div className="carousel-item">
                                    <img src={caraousel.cara2} className="d-block w-100" alt="3"></img>
                                </div>

                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                                <span aria-hidden="true"><i className="fas fa-chevron-left fa-5x"></i></span>
                                {/* <span className="sr-only">Previous</span> */}
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                                <span aria-hidden="true"><i className="fas fa-chevron-right fa-5x"></i></span>
                                {/* <span className="sr-only">Next</span> */}
                                </a>
                                </div>
                                </div>
                        )}
                    )} 

                <div className="input-group mt-5 mb-3 container">
                    <div className="input-group-prepend">
                        <span className="input-group-text fw" id="basic-addon3">Search your city</span>
                    </div>
                    <input type="text"  value = {this.state.search} onChange = {this.updateSearch} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                </div>

            
            <div>
                <div className="row ">
                { filterEvents.map((event) => { 
                    return( 
                            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-around" key={event._id}>
                                <div className="card m-5 border-0 p-4">
                                <p className="display-5 mb-1 text-left">{event.date}, {event.time}</p>
                                <img src={event.file} className="card-img-top border" alt=''></img>
                                    <div className="card-body">
                                    { Boolean(event.payment) === true ? <h3 className="card-title text-center fw"><a href = {event.payment}> {event.name} </a></h3> : <h3 className="card-title text-center fw">{event.name}</h3> }
                                        <p className="card-text text-justify">{event.description}</p>
                                        <hr className="b" />
                                        <h5 className="d-inline"> <a href={event.orgurl}> {event.org} </a></h5>
                                    </div>
                                </div>
                            </div>
                        )} 
                    )}
                </div> 
                </div>

                <Footer />
            </div>
        );
    }
}

