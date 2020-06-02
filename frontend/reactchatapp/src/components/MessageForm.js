import React, { Component } from 'react'

export default class MessageForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            input_value: ''
        }
    }

    handleSubmit(e){
        this.props.send_message(this.state.input_value)
        this.setState({input_value: ""})
        e.preventDefault();
    }
    handleChange(e){
        this.setState({input_value: e.target.value})
    }

    render() {
        return (
            <div className = "messageForm">
                <div className="messageForm-content">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="messageForm-items">
                            <div className="messageForm-item messageForm-input-container">
                                <textarea 
                                value={this.state.input_value}
                                onChange={this.handleChange.bind(this)}
                                 onBlur={this.props.textfocus} 
                                 onFocus={this.props.textfocus} 
                                 className="messageForm-input" 
                                 placeholder="Type your message here...." ></textarea>
                                {/* <input className="messageForm-input" placeholder="Type your message here...." type="text"/> */}
                            </div>
                            <div className="messageForm-item messageForm-submit-container ">
                                <button type="submit"className={`messageForm-submit ${ this.props.isFocus ? 'button-bg' : ''}`}>
                                    send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
