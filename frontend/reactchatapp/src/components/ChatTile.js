import React, { Component } from 'react'

export default class ChatTile extends Component {

    getTime(){
        let today = new Date()
        let last_date = new Date(this.props.chat.last_chat.created)

        if (today.getDate() === last_date.getDate() 
        && today.getMonth() === last_date.getMonth()
        && today.getFullYear() === last_date.getFullYear()
        ) {
            return last_date.getHours()+":"+ last_date.getMinutes()
        }else{
            return last_date.getDate()+"/"+last_date.getMonth()+"/"+last_date.getFullYear()
        }
    }

    getContactName(){
        if(this.props.chat.chatname === "" || this.props.chat.chatname === " "){
            let contact = this.props.chat.recipient.filter((element)=>{
                if(element.id !== this.props.user.id){
                    return true
                }else{
                    return false
                }
            })
            return contact[0].name
        }else{
            return this.props.chat.chatname
        }
    }

    sendMessageData(){
        return this.props.chat
        //     id: this.props.chat._id,
        //     name : this.props.chat.chatname,
        //     type: this.props.chat.chat_type,
        //     recipient: this.props.chat.recipient,
        // }
    }
    render() {
        return (
            <div className ={`chatTile ${ this.props.chat._id === this.props.current_chat._id ? "chatTile_selected" : ""}`} onClick={(e)=>{ this.props.openMessages(this.sendMessageData()/*this.props.chat._id*/)}}>
                <div className="chatTile-content">
                    <div className="chatTile-col-1">
                        user-image
                    </div>
                    <div className="chatTile-col-2">
                        <div className="chatTile-row-1">
                            <div className="chatTile-row-1-content">
                                <div className ="chatTile-name">
                                    {/* <b>{this.props.chat.chatname}</b> */}
                                    <b>{this.getContactName()}</b>
                                </div>
                                <div className = "unread-icon-container">
                                    <div className = "unread-icon-content">2</div>
                                </div>   
                            </div>
                        </div>
                        <div className="chatTile-row-2">
                            <div className="chatTile-row-2-content">
                                <div className ="chatTile-message">
                                    {this.props.chat.last_chat.message.text}
                                </div>
                                <div className="chatTile-last-time">
                                    { this.getTime()}
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
