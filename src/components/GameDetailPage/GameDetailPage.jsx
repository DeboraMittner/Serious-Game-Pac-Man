import React, { Component } from 'react';

import { withFirebase } from '../../services/Firebase';
import { withAuthorization, AuthUserContext } from '../../services/Session';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({

});


class GameDetailPage extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
}


  render() {
    const { classes } = this.props;

    return (
      <Dialog
      open={this.props.dialogOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Game: {this.props.gameTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        <Grid container spacing={2}>
          {this.props.questions.map((question) =>(
                    <Grid item xs={12} md={12}>
                    <List>
                        <ListItem>
                          <ListItemText
                            primary={'Question: ' + question.question}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    <ListItem>
                          <ListItemText
                            primary={'Option A: ' + question.options.optionA}
                          />
                        </ListItem>
                    <Divider variant="inset" component="li" />
                        <ListItem>
                          <ListItemText
                            primary={'Option B: ' + question.options.optionB}
                          />
                        </ListItem>
                    <Divider variant="inset" component="li" />
                        <ListItem>
                          <ListItemText
                            primary={'Option C: ' + question.options.optionC}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                          <ListItemText
                             primary={'Answer: ' + question.answer}
                          />
                        </ListItem>
                    </List>
                </Grid>
          ))}

        </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.props.handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    )
  }
}


export default withStyles(styles)((withFirebase(GameDetailPage)));