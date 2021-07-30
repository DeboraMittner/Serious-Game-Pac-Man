import React, { Component } from 'react';

import { withFirebase } from '../../services/Firebase';
import { withAuthentication, AuthUserContext } from '../../services/Session';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Button, CssBaseline, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GamePage from '../GamePage/GamePage';
import DeleteIcon from '@material-ui/icons/Delete';
import GameDetailPage from '../GameDetailPage/GameDetailPage';
import ScoreBoardPage from '../ScoreBoardPage/ScoreBoardPage';

const styles = theme => ({
  boox: {
    background: theme.palette.background.paper,
    borderRadius: '10px',
    padding: '1.5em',
    margin: theme.spacing(4),
    boxShadow: 'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;'
  },
  button: {
    float: 'right',

  },
  playButton: {
    color: 'rgba(240, 46, 170, 0.4)',
    marginLeft: theme.spacing(4),
  },
  createNewGame: {
    marginTop: '1.5em',
    background: 'white',
    boxShadow: 'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;',
    padding: '1.5em',
    '&:hover': {
      background: 'rgba(240, 46, 170, 0.4)'
    }
  },
  div: {
    textAlign: 'center',
  }
});


class DashboardPage extends Component {
  static contextType = AuthUserContext;

state = {
  games: [],
  activeGame: false,
  questions: [],
  dialogOpen: false,
  pressedGame: null,
  gameTitle: null,
  openHighscore: false,
  highscores: []

}
  constructor(props) {
    super(props);
}
 componentDidMount(){
  this.fetchGames();
}

fetchGames = () => {
  this.props.firebase.getGames((games) => {
    this.setState({games: games})
  });
}

fetchQuestions = (id) => {
  this.props.firebase.getQuestions(id, (questions) => {
  this.setState({questions: questions})
});
}

handleClose = () => {
  this.setState({
    dialogOpen: false,
    openHighscore: false})
};

handleOpen = (id) => {
  let gameOn = this.state.games.filter((game) => game.id == id)[0];

  this.setState({
    ...this.state,
    gameTitle: gameOn.title,
    dialogOpen: true
  })

  this.fetchQuestions(gameOn.id)
}

openHighscore = (id) => {
  let gameOn = this.state.games.filter((game) => game.id == id)[0];

  this.setState({
    ...this.state,
    gameTitle: gameOn.title,
    openHighscore: true
  })

  this.fetchHighscore(gameOn.id)
}

fetchHighscore = (id) => {
      this.props.firebase.getHighscoresByGameId(id, (res) => {
          res.sort((a, b) => {
            return b.score - a.score
          });
          let topten = res.slice(0,2);
          this.setState({
              highscores: topten
          })
        })}
  
deleteGame = (id) => {
 this.props.firebase.deleteGame(id);
 this.fetchGames();
}

playGame = (id) => {
  let gameOn = this.state.games.filter((game) => game.id == id)[0];
  this.fetchQuestions(gameOn.id)

  this.setState({
    ...this.state,
    activeGame: id,
    gameTitle: gameOn.title
  })
}

closeGame = () => {
  this.setState({
    activeGame: false
  })
}
  render() {
    const { classes } = this.props;
    let user = this.context;

    if(this.state.activeGame == false){
    return (
      <React.Fragment>
        <CssBaseline />
      <Container>
        <div>
      {
         this.state.games.map((game) => {
          return <Box boxShadow={3} className={classes.boox}><Button onClick={() => this.handleOpen(game.id)}>{game.title}</Button>
          <Button className={classes.playButton} type="button" variant="outlined" onClick={() => this.playGame(game.id)}>Play Game</Button>
          <Button className={classes.playButton} type="button" variant="outlined" onClick={() => this.openHighscore(game.id)}>Highscore</Button>  
          {user && <Button className={classes.button} type="button" onClick={() => this.deleteGame(game.id)}><DeleteIcon /></Button>}
          </Box>
        })
      }

      </div>
      {user && <div className={classes.div}>
     
    <Button className={classes.createNewGame} type="button" href="/create">Create New Game</Button>
    </div>}

    {this.state.questions && 
    <GameDetailPage handleClose={this.handleClose} gameTitle={this.state.gameTitle} dialogOpen={this.state.dialogOpen} questions={this.state.questions} />}
    {this.state.highscores && 
    <ScoreBoardPage gameTitle={this.state.gameTitle} highscores={this.state.highscores} openHighscore={this.state.openHighscore} handleClose={this.handleClose} />}
      </Container>
      </React.Fragment>
    );
   
  }
  else{
     return <GamePage question={this.state.questions} gameTitle={this.state.gameTitle} closeGame={this.closeGame} gameId={this.state.activeGame}/>

  }
  }
}

//const condition = authUser => !!authUser;

export default withStyles(styles)(withFirebase(DashboardPage));



/*const condition = authUser => !!authUser;

export default withStyles(styles)(withAuthorization(condition)(withFirebase(DashboardPage)));*/