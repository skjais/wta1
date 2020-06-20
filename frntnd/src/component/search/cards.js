import React, { Component } from 'react'
import CardsUI from './cardsUI';
import cardsUI from './cardsUI';

export default class cards extends Component {
    constructor(props) {
        super(props);

        this.state={
            names:props.serverdata
        }
        console.log("cards");
        console.log(props.serverdata);
    
    }
   
    

    render() {
        
        let teacherCards=this.state.names.map(names=>{
            return(
                <div className="col-md-3">
                <CardsUI names={names} />
               </div>
            )
        })
       
        return (

            <div className="container-fluid justify-content-center">
                <div className="row">        
                       {teacherCards}
                       {/* <cardsUI/>
                       <cardsUI/>
                        <cardsUI/> */}
                </div>

            </div>
        );
    }
}

