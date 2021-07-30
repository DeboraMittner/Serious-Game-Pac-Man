import React, { Component } from 'react';

import { withFirebase } from '../../services/Firebase';
import { withAuthorization, AuthUserContext } from '../../services/Session';
import { TextField, MenuItem } from '@material-ui/core';


const optionAnswers = [
    {
      value: 'optionA',
      label: 'Option A',
    },
    {
      value: 'optionB',
      label: 'Option B',
    },
    {
      value: 'optionC',
      label: 'Option C',
    },
  ];

class QuizElement extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
  <TextField  id="question" label="Question" onChange={(e) => {this.props.questionChange(e, this.props.questionIndex)}} value={this.props.question}/>
  <TextField  id="optionA" label="Option A" value={this.props.options.optionA} onChange={(e) => this.props.optionChange(e, this.props.questionIndex)}/>
  <TextField  id="optionB" label="Option B" value={this.props.options.optionB} onChange={(e) => this.props.optionChange(e, this.props.questionIndex)}/>
  <TextField  id="optionC" label="Option C" value={this.props.options.optionC} onChange={(e) => this.props.optionChange(e, this.props.questionIndex)}/>
  <div>
        <TextField
          required 
          id="anwser"
          select
          label="Select"
          value={this.props.answer}
          onChange={(e) => this.props.answerChange(e, this.props.questionIndex)}
          helperText="Please select your answer"
        >
            {optionAnswers.map((optionAnswer) => (
            <MenuItem key={optionAnswer.value} value={optionAnswer.value}>
              {optionAnswer.label}
            </MenuItem>
          ))}
     
        </TextField>
      </div>
  </div>
    );
  }
}

const condition = authUser => !!authUser;

export default (withAuthorization(condition)(withFirebase(QuizElement)));