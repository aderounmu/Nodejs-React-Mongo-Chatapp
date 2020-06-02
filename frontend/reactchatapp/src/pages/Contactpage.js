import React, { Component } from 'react'
 import ChatTile from '../components/ChatTile'
//import { func } from 'prop-types';


export default class Contactpage extends Component {
    constructor(props){
        super(props)
        this.state = {
            //fake state
        }
    }

    checkchatsData(){
        if(this.props.chats === undefined || this.props.chats === null){
            return "Loading......."
        }else if(this.props.chats.length < 1){
            return "Add a chat please"
        }else{
           return this.props.chats.map((item)=>{
                return <ChatTile 
                openMessages={this.props.openMessages} 
                chat={item} user={this.props.user}
                current_chat={this.props.current_chat}
                ></ChatTile>
            })
        }
    }

    render() {
        
        return (
            <div className="contactpanel">
               <div className= "contactpanel-content">
                    <div className= "contactpanel-header">
                        <div className="contactpanel-title"><b> Chats</b></div>
                        <div className= "contactpanel-searchbar">
                        </div>
                    </div>

                    <div className="contactpanel-body">
                        <div className="contactpanel-body-content" style={{color :"white"}}>
                            {this.checkchatsData()}
                        </div>
                    </div>
               </div>
            </div>
        )
    }

    //PropTypes

    // Contactpage.PropTypes = {

    // }


}


