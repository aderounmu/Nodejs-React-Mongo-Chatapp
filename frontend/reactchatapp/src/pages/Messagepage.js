import React, { Component } from 'react'

// import MessageTile from '../components/MessageTile'
import MessageForm from '../components/MessageForm'
import MessageTile from '../components/MessageTile'
import { isArray } from 'util';

export default class Messagepage extends Component {

      

    constructor(props) {
        super(props)
        this.messageBodyEnd = React.createRef()
        this.scrollMessage = React.createRef()
        this.state = {
            textisFocus : false,
            sorted: [],
            Nochat: true,
        }
    }

    componentDidMount(){
        this.sortBydate()
        this.scrollToBottom()
    }

    componentDidUpdate(prevProps){
        if(prevProps.messages !== this.props.messages){
            this.sortBydate()
            //this.scrollToBottom()
        }
        
    }


    //make chat scroll to the bottom automatically
    scrollToBottom(){
        this.messageBodyEnd.current.scrollIntoView({behavior:'smooth',block:'end'})
        let SH = this.scrollMessage.current.scrollHeight
        let ST = this.scrollMessage.current.scrollTop
        let CH = this.scrollMessage.current.clientHeight
        console.log('ScrollHeight: ',SH)
        console.log('ScrollTop: ',ST)
        console.log('ClientHeight: ',CH)
        //this.scrollMessage.current.scrollTo(0,this)
        //this.scrollMessage.current.scrollBy(0,10)
        // while (!(SH-ST === CH)) {
        //     console.log('new ScrollHeight: ',SH)
        //     this.scrollMessage.current.scrollTo(0,SH)
        // }
    }

    // convertdataToarray(){
    //     return JSON.parse(this.state.message)
    // }

    checkDateEqual(dateOne,dateTwo){
        let date1 = new Date(dateOne)
        let date2 = new Date(dateTwo)
        
        if (date1.getDate() === date2.getDate() 
        && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear()
        ) {
            return true
        }else{
            return false
        }
    }
    
    sortBydate(){
        let create_index = 0;
        let dataBydate = []
        if(!isArray(this.props.messages.data) || this.props.messages.length === 0){
            this.setState({Nochat: true})
            return null
        }else{
            /*sortingdate*/
            this.setState({Nochat : false})
            this.props.messages.data.forEach(element => {
                let inputIndex = dataBydate.findIndex(item => this.checkDateEqual(item.date,element.created))
                    
                if(inputIndex === -1 || dataBydate.length === 0){
                    dataBydate[create_index] = {
                        date: element.created,
                        data:[]
                    }
                    dataBydate[create_index].data.push(element)
                    create_index++
                }else{
                    dataBydate[inputIndex].data.push(element)
                }
                    
            });

            this.setState({sorted: dataBydate})

            return dataBydate
        }

        
    }


    getContactName(){
        if(this.props.current_chat.chatname === "" || this.props.current_chat.chatname === " "){
            let contact = this.props.current_chat.recipient.filter((element)=>{
                if(element.id !== this.props.user.id){
                    return true
                }else{
                    return false
                }
            })
            return contact[0].name
        }else{
            return this.props.current_chat.chatname
        }
    }

    textFocus = () => { this.setState({textisFocus: !this.state.textisFocus}) }

    render() {
        return (
            <div className = "messagepanel">
               <div className= "messagepanel-content">
                    <div className= "messagepanel-header">
                        <div className="messagepanel-header-content">
                            <div className= "messagepanel-back"> 
                                <button onClick={(e)=>{this.props.closeMessages()}}>{'< back'}</button> 
                            </div>
                            <div className="messagepanel-title">
                            { this.props.current_chat === "" ? "" : <b>{this.getContactName()}</b> }
                            </div>
                            <div className="messagepanel-edit">Edit</div>
                        </div>
                    </div>
                    {/* onScroll={(e)=>this.scrollToBottom()} */}
                    <div className="messagepanel-body"  ref={this.scrollMessage}>
                        <div className="messagepanel-body-content">
                            {
                                this.state.Nochat ? 
                                <div className="Nochat">
                                    <div className="Nochat-content">
                                        Click on a contact to see chat
                                    </div>
                                </div>:
                                this.state.sorted.map((item) => {
                                    return  <div className="message-section">
                                        <div className="message-section-Date">
                                            <div className="message-section-Date-content">
                                                {`${new Date(item.date).getDate()}/${new Date(item.date).getMonth()}/${new Date(item.date).getFullYear()}`}
                                            </div>
                                        </div>
                                    {
                                        item.data.map((element)=>{
                                           return <MessageTile message={element} user={this.props.user} chatType={this.props.current_chat.chat_type}></MessageTile>
                                        })
                                    }
                                    </div>
        
                                })

                            } 
                            <div className="messagebodyBottom" ref = {this.messageBodyEnd}>
                            scroll end
                            </div>
                        </div>
                        
                    </div>
                    <div className= {`messagepanel-form ${this.state.textisFocus ? 'messagepanel-form-textfocus':''}`}> 
                        <MessageForm 
                        textfocus={this.textFocus} 
                        isFocus={this.state.textisFocus}
                        send_message={this.props.send_message}
                        >
                        </MessageForm>
                    </div>
               </div>
            </div>  
        )
    }
}
