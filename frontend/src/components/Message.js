import React, {Component} from 'react';
import Success from './msgsuccess';


export default class Message extends Component {
  render(){
    return( 
    <div>
      { this.props.message === "Upload images of type jpg or png only" ? 
        
        <div className='alert alert-danger alert-dismissible fade show' role='alert'>
        {this.props.message}
        <button
          type='button'
          className='close'
          data-dismiss='alert'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
     : <Success message={this.props.message} />
          }
          </div>
    );
  }
};




