import React, { Component } from 'react'
import Messagepage from './Messagepage'
import Contactpage from './Contactpage'

export default class Chatpage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            user_details :{
                id: "5ec1f4f5ee84cb26b4b37c37",
                name: "Janet Row"
            },
            user_chats :[],
            current_chat_details:"",
            current_chat_messages:[],
            message_is_open : false, 
            host_url: "http://localhost:9090"
        }
    }

    componentDidMount(){
        this.timerID = setInterval(()=>{
            this.getChats()
            this.getCurrentMessages()
        },1000);
  
    }

    getChats(){
        fetch(this.state.host_url+'/user/'+this.state.user_details.id+'/chat',{
            method: 'GET',
            mode: 'cors',
        })
        .then((response) => response.json())
        .then(
            (data) =>{
                this.setState({user_chats : data})
            }
        )
    }

    getCurrentMessages(){
        const current_chat = this.state.current_chat_details
        if(current_chat === ""){
            this.setState({current_chat_messages : []})
        }else{
            fetch(this.state.host_url+'/chat/'+/*id*/this.state.current_chat_details._id+'/messages',{
                method: 'GET',
                mode: 'cors'
            })
            .then((response)=>response.json())
            .then(
                (data)=>{
                    this.setState({current_chat_messages : data})
                   //console.log(this.state.current_chat_details)
                }
            ).catch((err)=>{this.setState({current_chat_messages : err})})
        }
    }

  async openMessages(item){
    await this.setState({current_chat_details: item})
         this.setState({message_is_open: true})
         this.getCurrentMessages()
   }

   closeMessages = () =>{
    this.setState({message_is_open: false})
   }


    getsenddata(item) {
        let sendData = {
            message : item,
            sender: this.state.user_details,
            chat:{
                id: this.state.current_chat_details._id,
                name: this.state.current_chat_details.chatname
            },
            created: new Date().toISOString()
        }
        return sendData
    } 
    
    async sendMessage(message_item){

     if(typeof(this.current_chat_details) === String ){
         alert('Open a chat please')
     }else{
        let sendData = await this.getsenddata(message_item);
        await fetch(this.state.host_url+'/message',{
            method: 'POST',
            mode:'cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(sendData)
            })
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data)
            })
            .catch((err)=>{console.log(err.message)})

        await this.getChats()
        this.getCurrentMessages(this.state.current_chat_details._id)
     } 
        //console.log(sendData)

   }    
    render() {
        let { user_details , user_chats , current_chat_messages , current_chat_details } = this.state;
        return (
            <div className = "chatPage">
                <div className = "chatPage-content">
                    <div className={`left-item ${ this.state.message_is_open ? 'isInActive' : ''}`}>
                        <Contactpage 
                        user={user_details}
                        chats={user_chats.data}
                        openMessages={this.openMessages.bind(this)}
                        current_chat={current_chat_details}
                        ></Contactpage>
                    </div>
                    <div className = {`right-item ${ this.state.message_is_open ? '' : 'isInActive'}`}>
                        <Messagepage
                            user={user_details}
                            messages={current_chat_messages}
                            closeMessages={this.closeMessages}
                            current_chat={current_chat_details}
                            send_message={this.sendMessage.bind(this)}
                        ></Messagepage>
                    </div>
                </div>
            </div>
        )
    }
}
