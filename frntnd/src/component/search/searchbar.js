import React, { Component } from 'react'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


import Card from './cards';


export default class searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            city: "",
            subject:"",
            redirect: false,
            serverdata:null

           
        }

       
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.setRedirect=this.setRedirect.bind(this); 
        this.renderRedirect=this.renderRedirect.bind(this);
    
    }
    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = ( serverdata) => {
         
        if (this.state.redirect  && serverdata) {

            console.log("fucking started")
          return <Card serverdata={serverdata} />
        }
      }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        })
    }
    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        })
    }
    
     onSubmit(e) {
      
        e.preventDefault();
        const searchdetail = {
            
            city: this.state.city,
            subject:this.state.subject

        }


        console.log(searchdetail);


        if(this.state.redirect)
        {

        axios.post('http://localhost:8000/teacherdata', searchdetail)
            .then(res => {
   
                this.setState({
                    serverdata:res.data
                    
                }) 
               
                console.log(this.state.serverdata);         
            })
            .catch(err=>{console.log(err)})
        }

        this.setState({
    
            city: "",
            subject:""

        })

    }

    render() {
        return (
            <div> 
                <div className="container-fluid" style={{ backgroundColor: "gray", color: "white",marginTop:20}}>

                    <p style={{ color: "white", width: "100%" }}>search for teacher......</p>

                    <form  onSubmit={this.onSubmit} >
                      <div class="form-row " >

                        <div class="col" >
                            <label>City</label>
                            <input type="text"  value={this.state.city} onChange={this.onChangeCity} />
                        </div>
                        <div class="col" >
                            <label >subject</label>
                            <input type="text" value={this.state.subject} onChange={this.onChangeSubject} />
                        </div>
                        <div class="col">
                        
                        <button  class="btn-primary" onClick={this.setRedirect} > search</button>
                       
                        </div>
                        </div>

                    </form>
                    <div >
                    </div>

                </div>

                <div> {this.renderRedirect(this.state.serverdata)}</div>

            </div>
        )
    }
}