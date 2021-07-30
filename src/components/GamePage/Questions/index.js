import React, { Component } from 'react';

import { withFirebase } from '../../../services/Firebase';
import { withAuthorization, AuthUserContext } from '../../../services/Session';

import { List, ListItem, ListItemText, ListItemIcon, Grid, Divider } from '@material-ui/core';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import SvgIcon from '@material-ui/core/SvgIcon';
import LensIcon from '@material-ui/icons/Lens';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
  triangle: {
    width: "0", 
    height: "0", 
    background: "rgb(82, 24, 148)",
    borderLeft: "10px solid white",
    borderRight: "10px solid white",
    borderBottom: "20px solid #31A8F5",



  }
});

class Questions extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
}

  render() {
    const { classes } = this.props;
    
    return (
  <Grid container spacing={2}>
      <Grid item xs={12} >
      <Typography variant="h4" >
            Question:
          </Typography>
        </Grid>

        <Grid item xs={12} >
        <Typography variant="h6" >
        {this.props.question.question}
          </Typography>
    
       </Grid>

       <Grid item xs={12} >
       <Typography variant="h4" >
            Options:
          </Typography>
       </Grid>
       <Grid item xs={12} >
       <List>
                <ListItem>
                <ListItemIcon>
                <SvgIcon width="200" height="250">
                <rect x="5" y="5" width="15" height="15" stroke="red" fill="red" stroke-width="2"/>
  </SvgIcon>
        </ListItemIcon>
                  <ListItemText
                    primary={this.props.question.options.optionA}  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                <ListItemIcon>
          <LensIcon style={{ color: 'green' }} />
        </ListItemIcon>
                  <ListItemText
                    primary={this.props.question.options.optionB} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                <ListItemIcon>
               <ChangeHistoryIcon className={classes.triangle} style={{ color: 'blue'}} />
        </ListItemIcon>
                  <ListItemText
                    primary={this.props.question.options.optionC}  />
                </ListItem>
            </List>
         </Grid>

      </Grid>
    );
  }
}


export default withStyles(styles)((withFirebase(Questions)));
