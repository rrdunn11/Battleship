import React from 'react';

class StartingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <form action="">
          <h3>Create a new game!</h3>
          <div>Username:</div>
          <input type="text" id="usernameP1" placeholder="Name"/>
          <button onClick={(e) => this.props.onNewGameClick(e)}>Create game!</button>
          <h3>Join an existing game!</h3>
          <div>Username:</div>
          <input type="text" id="usernameP2" placeholder="Name"/>
          <div>RoomID:</div>
          <input type="text" id="roomID" placeholder="Room ID"/>
          <button onClick={(e) => this.props.onJoinGameClick(e)}>Join game!</button>
        </form>
      </div>
    )
  }
}

export default StartingScreen;