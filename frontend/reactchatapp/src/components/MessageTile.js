import React, { Component } from 'react'

export default class MessageTile extends Component {
    checkIfUser(){
        if(this.props.user.id === this.props.message.sender.id){
            return true
        }else{
            return false;
        }
    }
    displayUser(){
        if(this.props.chatType === "group" || this.props.chatType === "Group"){
            return true
        }else{
            return false
        }
    }
    render() {
        return (
            <div className={`messageTile ${this.checkIfUser() ? "owner" : " "}`}>
                <div className="messageTile-content">
                    <div className={`messageTile-user-container ${this.displayUser() ? "" :"hide"}`}>
                        <div className="messageTile-user">
                            {this.props.message.sender.name}
                        </div>
                    </div>
                    <div className="messageTile-name-container">
                        <div className="messageTile-name">
                            {this.props.message.message}
                        </div>
                    </div>
                    <div className="messageTile-time-container">
                        <div className="messageTile-time">
                        {`${new Date(this.props.message.created).getHours()}:${new Date(this.props.message.created).getMinutes()}`}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
