import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../styles/showevent.css'
import Footer from './footer';

export default class ShowEvent extends Component{
    constructor(props){
        super(props);
        this.updateSearch = this.updateSearch.bind(this);
        this.state = {
            twiceread: [],
            search: ''
        };
        
    }
    componentDidMount() {
        axios.get('http://localhost:5000/twiceread/')
        .then(res =>{this.setState({twiceread: res.data});
    })
    .catch((err) =>{
        console.log(err)
    })
    }

    updateSearch(e){
        console.log(e.target.value)
        this.setState({
            search: e.target.value
        })
       
    }

    render() {
        let filtertwr  = this.state.twiceread.filter((evt) => 
        {
            return evt.location.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })

        return (
            <div id="show" className="mt-5">
                <div className="volunteer">
                    <div className="row">
                        <div className="col-6 col-md-6 m-5">
                            <p className="display-4 mb-0 p-3">What is Twice Read ?</p>
                            <div className="bd ml-3"></div>
                            <div className="col-6 col-md-10 p-3">
                                <h5>A fun yet enriching experience to re-discover your old reads and reconnect with your thoughts you had by reconnecting with fellow readers!</h5>
                            </div>
                             <a href="https://docs.google.com/forms/d/e/1FAIpQLSc8VESXzO-UmC0g3pDfSFoWkYWuCvfhkGAGUkNxwtDj7h3QdQ/viewform?usp=sf_link" 
                             className="btn btn-lg btn-info">Volunteer to bring Twice Read to your city</a>
                        </div>
                    </div> 
                </div>

                 <div className="input-group mt-5 mb-3 container">
                    <div className="input-group-prepend">
                    <span className="input-group-text fw" id="basic-addon3">Search your city</span>
                    </div>
                <input type="text"  value = {this.state.search} onChange = {this.updateSearch} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                </div>


                <div className="row">
                {filtertwr.map( (twr) =>{
                    return(
                        <div className="container" key={twr._id}>
                            <div className="media my-5">
                                <div className="col-7 ml-5" key={twr._id}>
                                    <h3 className="pb-3 "><Link to={`/twiceread/${twr._id}`} className ="name">{twr.name}</Link></h3>
                                    <div className="col-10">
                                        <p>{twr.description.substring(0,250)}</p>
                                    </div>
                                    <div>
                                    {/*to={`/twiceread/${twr.name}`} */}
                                     <Link  to={`/twiceread/${twr._id}`} className="btn btn-lg btn-info">Learn More</Link>
                                     </div>
                                </div>

                            <div className="col-5 wd">                   
                                <div id={twr.href} className="carousel slide" data-ride="carousel" data-interval="5000">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src={twr.sliderimg1} className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="carousel-item">
                                            <img src={twr.sliderimg2} className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="carousel-item">
                                            <img src={twr.sliderimg3} className="d-block w-100" alt="..." />
                                        </div>
                                    </div>
                                    <a className="carousel-control-prev" href={"#" + twr.href} role="button" data-slide="prev">
                                        <span  aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href={"#" + twr.href} role="button" data-slide="next">
                                        <span aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                            </div>
                        </div>
                    )
                })}
                </div>
                <Footer />
            </div>
        )
    }
} 


