import React, { Component } from 'react';

import { withFirebase } from '../../services/Firebase';
import { withAuthorization, AuthUserContext } from '../../services/Session';

import { Button, CssBaseline, Grid, Box, Container, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Pacman from './Pacman'
import Questions from './Questions'

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
  boox: {
    background: theme.palette.background.paper,
    borderRadius: '10px',
    padding: '1.5em',
    margin: theme.spacing(3),
    boxShadow: 'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;'
  },
  header: {
    marginTop: '20px'
  },
  titel: {
      color: 'white',
      textAlign: 'center'

  },
  playButton: {
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


class GamePage extends Component {
  static contextType = AuthUserContext;

state = {
  currentQuestion: 0,
  correctAnswer: false,
  readyForGame: false,
  endScore: 0,
  openDialog: false,
  lastQuestion: false,
  gameStatus: '',

}
  constructor(props) {
    super(props);
}



checkAnswer = (answer, score) => {
  this.setState({gameStatus: 'paused'})
if(this.props.question[this.state.currentQuestion].answer == answer){
  this.setState({
    correctAnswer: true,
    endScore: score + 100,
  })
}else{
  this.setState({
    correctAnswer: false,
  })
}
this.setState({
  openDialog: true
})
}

handleClose = () => {
  if(!this.state.lastQuestion) {
    this.setNextQuestion();
  } else {
    this.props.closeGame()
    this.endGame() // TODO
  }
};

setNextQuestion = () => {
  if(this.state.currentQuestion === this.props.question.length-1){
    this.setState({lastQuestion: true}) // keep dialog open
  }else{
    let nextQuestion = this.state.currentQuestion + 1
    this.setState({
      currentQuestion: nextQuestion,
      gameStatus: 'continue',
      openDialog: false // close dialog so game can continue
    })}
}

startGame = () => {
  this.setState({
    ...this.state,
    readyForGame: true
  })
}
endGame = () => {
  this.setState({gameStatus: 'end'})
  this.setScore()
}

getStatus = () => {
  return this.state.gameStatus
}

setScore = () =>{
  let user = this.context;

  let highscore = {
    user: 'dummy',
    score: this.state.endScore,
  }

  if(user) {
    this.props.firebase.getUserName((name) => {
      highscore.user = name;
    })
  } else {
    let sign = prompt("Enter your player name for your highscore:");
    highscore.user = sign;
  }

  /**/
  this.props.firebase.setScore(highscore, this.props.gameId);
}

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
      <Container>
 <div className={classes.root}>
          <Grid container spacing={3}>
              <Grid item xs={12} className={classes.header}>
        <h1 className={classes.titel}>Game: {this.props.gameTitle}</h1>
        </Grid>

      <Grid item xs={12} sm={8}>
 {this.state.readyForGame ? <Pacman checkAnswer={this.checkAnswer} gameStatus={this.state.gameStatus} /> : <div className={classes.div}> <Box boxShadow={3} className={classes.boox}><div><h1>Welcome </h1><p>Answer the questions on the right hand side by by moving through the maze to the right symbols. Don't get caught by the ghosts! </p><p>Good Luck!</p></div>  </Box><Button className={classes.playButton} type="button" onClick={() => this.startGame()}>Play Game</Button></div>}
  </Grid>
  <Grid item xs={12} sm={4}>
  <Box boxShadow={3} className={classes.boox}>
 {this.props.question.length > 0 && <Questions question={this.props.question[this.state.currentQuestion]}/>}
  </Box>
  </Grid>
  {this.props.question.length > 0 &&
  <Dialog
        open={this.state.openDialog}
        //onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.state.lastQuestion ? 'Congratulations!' : 'Your answer is: ' +(this.state.correctAnswer ? "Correct" : "Wrong")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {this.state.lastQuestion ? <p>You completed the quiz. Your final score is: {this.state.endScore}</p> :  <p> The answer is: {this.props.question[this.state.currentQuestion].answer}</p> }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            {this.state.lastQuestion ? <p>close</p> : <p>Next Question</p>}
          </Button>
        </DialogActions>
      </Dialog> }
      </Grid>
      </div>
      </Container>
      </React.Fragment>
    );
  }

    

  
  }

const condition = authUser => !!authUser;

export default withStyles(styles)((withFirebase(GamePage)));