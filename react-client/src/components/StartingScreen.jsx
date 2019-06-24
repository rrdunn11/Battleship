import React from 'react';

class StartingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <form onSubmit={(e) => this.props.onNewGameClick(e)}>
          <h3>Create a new game:</h3>
          <div>Username:</div>
          <input type="text" id="usernameP1" placeholder="Name"/>
          <button type="submit" >Create game!</button>
        </form>
        <form onSubmit={(e) => this.props.onJoinGameClick(e)}>
          <h3>Join an existing game:</h3>
          <div>Username:</div>
          <input type="text" id="usernameP2" placeholder="Name"/>
          <div>RoomID:</div>
          <input type="text" id="roomID" placeholder="Room ID"/>
          <button type="submit">Join game!</button>
        </form>
      </div>
    )
  }
}

export default StartingScreen;