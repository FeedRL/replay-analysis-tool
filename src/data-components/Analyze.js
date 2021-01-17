import React from 'react';
import '../App.css';
import './Analyze.css';
import Ranks from './Ranks'
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

const token = 'YYnAMB7jvHL6t5DnY7VkWrj7wuriCnff5UBTbUeK';

//example replay input:  f471cb81-74d5-4376-becb-368d996b5b5f  Feed vs DraLi
//                       9d03f4bd-a853-4bda-867c-3f57c04904e6  AyyJayy vs Spider

class Analyze extends React.Component {

    constructor(props) {
        super(props);
        this.state = {key : '', message : '', replayData: null};
    }

    handleChange = (event) => {
        this.setState({key: event.target.value});
    }

    fetchReplayData = () => { 
        const url = "https://ballchasing.com/api/replays/";
        const key = this.state.key;

        if(key !== '') {
            axios.get(url + key, {
                headers: {
                    Authorization: `${token}`
                }
            })
            .then(function (response) {
                // handle success
                 this.setState({message: "Data fetch successful.", replayData: response.data});
            }.bind(this))
            .catch(function (error) {
                // handle error
                console.log(error);
                this.setState({message: "Please enter a valid replay ID."});
             }.bind(this))
              .then(function () {
                 // always executed
             });
        }
        else {
            //make sure user puts in a value
            this.setState({message: "Replay ID field cannot be empty."});
        }
    }

    render(){
        return(
            <div>
                <hr className="Header-hr"/>
                <h1 className="title"> Enter your replay ID: </h1>
                 <Form.Group className="Replay-form">
                    <Form.Control type="textarea" placeholder="Replay ID" onChange={this.handleChange}/>
                 </Form.Group>
                <div />
                <Button className="Menu-button" onClick={this.fetchReplayData} > Analyze </Button> 
                <hr className="Header-hr"/>
                <h1 className="title"> {this.state.message} </h1>
                <GetReplayTitle data={this.state.replayData} />
                <Ranks data={this.state.replayData} />
            </div>
        );
    } 
}

    //sample component that returns submitted replay title
    function GetReplayTitle(data){
        if(data.data != null) {
            //console.log(data);
            const title = data.data.title.toString();
            return <h1 className="title"> Replay title: {title} </h1>;
        }
        else {
            return(null);
        }  
    }

export default Analyze;