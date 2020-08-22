import React, {Component} from 'react';
import '../styles/footer.css'


export default class Footer extends Component {
  render(){
    return( 
        <div>
                <div id="footer" className="mt-5 pt-5 container-fluid">
                    <section className="container text-center">
                        <h1>Join the worldwide open library to share books!</h1>
                        <div className="my-5 d-flex  justify-content-center">
                            <a href=" http://eepurl.com/gcYDoD" className="btn btn-lg btn-success">Fullfill my wishlist now!  <i className="fas fa-arrow-right"></i></a>
                        </div>
                    </section>
                    <div className="my-5"></div>
                    <div className="row">
                    
                    <div className="col-7 col-lg-10 d-flex align-items-end">
                        <a href="https://link.medium.com/EhWiB1YiZX" ><span className="mr-5 mt-5">About us</span></a>
                    </div>
                    
                    <div className="col-5 col-lg-2 d-flex align-items-end">
                        <a href="https://www.facebook.com/readsnet/"><i className="fab fa-facebook mr-3 sz pr-3"></i></a>
                        <a href=" https://instagram.com/readsnet.app"><i className="fab fa-instagram mr-3 sz pr-3"></i></a>
                        <a href=" https://twitter.com/readsnet"><i className="fab fa-twitter mr-3 sz pr-3"></i></a>
                        <a href="https://medium.com/swapeer"><i className="fab fa-medium mr-3 sz pr-3"></i></a>
                    </div>
                    </div>
                </div>
        </div>
    );
  }
};
