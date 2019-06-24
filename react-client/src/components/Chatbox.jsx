import React from 'react';
import Chat from './Chat.jsx';

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="chatbox">
        <h2>Chatbox</h2>
        <form onSubmit={(e) => this.props.sendChatMessage(e)}>
          <div id="chatOutput" >
            {this.props.chatOutput.map((chat, idx) => {
              return (
                <Chat chat={chat} key={`chat ${idx}`}/>
              )
            })}
          </div> 
          <input 
            onChange={(e) => this.props.chatMessageChange(e)} 
            id="message" 
            placeholder="Message..." 
            value={`${this.props.message}`}
          ></input> <br/>
          <button type="submit" id="send" >Send</button>
        </form>
      </div>
    )
  }
}

export default Chatbox;