import React, { Component } from 'react';

import { withFirebase } from '../../services/Firebase';
import { withAuthorization, AuthUserContext } from '../../services/Session';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


class ScoreBoardPage extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
}


  render() {
    return (
      <Dialog
      open={this.props.openHighscore}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Highscore for Game: {this.props.gameTitle}</DialogTitle>
   <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {this.props.highscores.length > 0 ? 
        <Grid container spacing={2}>
          {this.props.highscores.map((highscore) =>(
                    <Grid item xs={12} md={12}>
                    <List>
                        <ListItem>
                          <ListItemText
                            primary={'Name: ' + highscore.user}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    <ListItem>
                          <ListItemText
                            primary={'Score: ' + highscore.score}
                          />
                        </ListItem>
                    <Divider variant="inset" component="li" />
                    </List>
                </Grid>
          ))}

        </Grid> : <p>No Highscore</p> }
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


export default ((withFirebase(ScoreBoardPage)));