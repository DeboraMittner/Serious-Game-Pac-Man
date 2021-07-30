import React, { Component } from 'react';

import { withFirebase } from '../../services/Firebase';
import { withAuthorization, AuthUserContext } from '../../services/Session';

import Container from '@material-ui/core/Container';
import { Button, CssBaseline, TextField, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import QuizElement from './QuizElement';


  const styles = theme => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
          float: 'center'
        },        
      },
        boox: {
  
          background: theme.palette.background.paper,
          borderRadius: '10px',
          padding: '1.5em',
          margin: theme.spacing(3),
          boxShadow: 'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;'

      },
      button: {
        float: 'right'
      }
  });

  const INITIAL_STATE = {
    title: '',
    questions: [{
        question: '',
        options: {
            optionA: '',
            optionB: '',
            optionC: ''
        },
        answer: ''
    }]
  };

class CreateGamePage extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE };
  }

  onQuestionChange = (e, questionIndex) => {
      
    let newQuestions = this.state.questions;
    newQuestions[questionIndex].question = e.target.value;
    this.setState({
        ...this.state,
        questions: newQuestions 
    })
  }

  onAnswerChange = (e, questionIndex) => {
    let newQuestions = this.state.questions;
    newQuestions[questionIndex].answer = e.target.value;
    this.setState({
        ...this.state,
        questions: newQuestions 
    })
  }

  onOptionChange = (e, questionIndex) => {
      let newQuestions = this.state.questions;
      newQuestions[questionIndex].options[e.target.id] = e.target.value;
      this.setState({
        questions: newQuestions
      })
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    })
}


  addDataa = () => {
    const data = {
      title: this.state.title,
      questions: this.state.questions,
    }
    let id = this.props.firebase.addData(data);
    this.props.history.push('/');
  }

  addQuestion = () => {
      const quest = {
        question: '',
        options: {
            optionA: '',
            optionB: '',
            optionC: ''
        },
        answer: ''
    }

    let newQuestions = this.state.questions;
    newQuestions.push(quest);
    this.setState({
        questions: newQuestions
    })
  }

  

  render() {
    const { classes } = this.props;

    return (
        <React.Fragment>
          <CssBaseline />
        <Container component="main" maxWidth="s">
          <CssBaseline />
          <Box boxShadow={3} className={classes.boox}
          >
          <form className={classes.root} noValidate autoComplete="off">
          <TextField id="title" label="Game Title" onChange={this.handleChange}/>
          {this.state.questions.map((question, index) => {
            return <QuizElement questionIndex={index} question={question.question} questionChange={this.onQuestionChange} options={question.options} optionChange={this.onOptionChange} answer={question.answer} answerChange={this.onAnswerChange}/>
          })}
        
        <Typography variant="h2" color="inherit" noWrap>
         <Button className={classes.button} type="button" onClick={this.addQuestion}>Add Question</Button>
          <Button className={classes.button} type="button" onClick={this.addDataa}>Save</Button>
       </Typography>
        </form>
        </Box>
        </Container>
      </React.Fragment>

    );
  }
}

const condition = authUser => !!authUser;

export default withStyles(styles)(withAuthorization(condition)(withFirebase(CreateGamePage)));