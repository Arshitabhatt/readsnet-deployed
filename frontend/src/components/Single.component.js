import React, {Component} from 'react';
import { Link, NavLink, BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './footer';
import axios from 'axios';
import '../styles/single.css'
import ScrollspyNav from "react-scrollspy-nav";

export default class SingleEvent extends Component{
    constructor(props){
        super(props);
        this.state = {
            twiceread:[],
            single: [],
        };
        
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/twiceread/${this.props.match.params.id}`)
        .then((res) =>{
            this.setState({
                twiceread: res.data,
                single:res.data.single[0]
            });
           console.log(this.state.single)
            console.log(this.state.twiceread);
    })
    .catch((err) =>{
        console.log(err)
    })
    }

    render(){

        return(
            <div>
                <div>
                    <div className="mt-5 title bkg">
                    <div>
                        <div className="col-12 col-md-6">
                            <h1 className="mb-0 mt-3 px-5 pt-3 text+">{this.state.twiceread.name}</h1>
                            <div className="bod ml-5 mt-3 mb-3"></div>
                            <div className="pl-5 text">
                                <p>{this.state.twiceread.description}</p>
                            </div>
                            <Link id="try" className="mb-2 btn btn-info" to="/">Upcoming events</Link>
                            </div>
                    </div>
                </div>
                 {/* navbar and neeche ka saman */}
                 <div id="single">
                     <div className="container">
                            <div>
                            <div className="t text-center mb-5 mt-3"><span><strong>Photos</strong></span>
                                <div>
                                    <div className="row mt-3">
                                        <div className="col-4">
                                            <img src={this.state.twiceread.sliderimg1} className="img-thumbnail imt" alt=""/>
                                        </div>
                                        <div className="col-4">
                                            <img src={this.state.twiceread.sliderimg2} className="img-thumbnail imt"  alt=""/>
                                        </div>
                                        <div className="col-4">
                                            <img src={this.state.twiceread.sliderimg3} className="img-thumbnail imt"  alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="t text-center mb-5"><span><strong>Readers</strong></span>
                                <div>
                                <div className="row mt-3">
                                    <div className="col-3"><img src={this.state.single.profile1} className="img-thumbnail imt"  alt=""/></div>
                                    <div className="col-3"><img src={this.state.single.profile2} className="img-thumbnail imt"  alt=""/></div>
                                    <div className="col-3"><img src={this.state.single.profile3} className="img-thumbnail imt"  alt=""/></div>
                                    <div className="col-3"><img src={this.state.single.profile4} className="img-thumbnail imt"  alt=""/></div>
                                </div>
                                <div>
                                <a  href={this.state.single.link1}>Redirect</a>
                                </div>
                                                            </div>
                            </div>
                            <div className="t text-center"><span><strong>Books Discussed</strong></span>
                                <div className="mt-3 mb-5">
                                <div className="row mb-3">
                                    <div className="col-4"><img src={this.state.single.book1} className="img-thumbnail imt"  alt=""/></div>
                                    <div className="col-4"><img src={this.state.single.book2} className="img-thumbnail imt"  alt=""/></div>
                                    <div className="col-4"><img src={this.state.single.book3} className="img-thumbnail imt"  alt=""/></div>
                                </div>
                                <div className="row">
                                    <div className="col-4"><img src={this.state.single.book4} className="img-thumbnail imt"  alt=""/></div>
                                    <div className="col-4"><img src={this.state.single.book5} className="img-thumbnail imt"  alt=""/></div>
                                    <div className="col-4"><img src={this.state.single.book6} className="img-thumbnail imt"  alt=""/></div>
                                </div>
                                    <a href={this.state.single.link2}>Checkout</a>
                                </div>
                            </div>
                            <div className="t text-center"><span><strong>Key Takeaways</strong></span>
                                <div>
                                    {this.state.single.blog}
                                </div>
                            </div>
                        </div>
                    </div> 
                    </div>
                 </div>
                  <Footer />
            </div>
        )
    // }
    }
}