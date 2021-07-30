import React, { Component } from "react";
import PropTypes from "prop-types";
import { EAST, NORTH, WEST, SOUTH } from "./constants";
import getInitialState from "./state";
import { animate, changeDirection } from "./game";
import Board from "./Board";
import Scores from "./Scores";
import AllFood from "./AllFood";
import Monster from "./Monster";
import Player from "./Player";
import Pause from "./Pause";
import "./style.scss";
import { withFirebase } from "../../../services/Firebase";

class Pacman extends Component {
  constructor(props) {
    super(props);

    this.state = getInitialState();

    this.onKey = (evt) => {
      if (evt.key === "ArrowRight") {
        return this.changeDirection(EAST);
      }
      if (evt.key === "ArrowUp") {
        return this.changeDirection(NORTH);
      }
      if (evt.key === "ArrowLeft") {
        return this.changeDirection(WEST);
      }
      if (evt.key === "ArrowDown") {
        return this.changeDirection(SOUTH);
      }
      if (evt.key === "Escape") {
        return this.pauseGame();
      }
      return null;
    };

    this.timers = {
      start: null,
      animate: null,
    };
    this.startTimer = this.startTimer.bind(this);
    this.resumeGame = this.resumeGame.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  startTimer() {
    this.timers.start = setTimeout(() => {
      this.setState({ stepTime: Date.now(), lastPause: Date.now() });

      this.step();
    }, 3000);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKey);
    this.startTimer();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKey);

    clearTimeout(this.timers.start);
    clearTimeout(this.timers.animate);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameStatus && nextProps.gameStatus == "continue") {
      this.resumeGame();
    }
  }

  step() {
    let newState = animate(this.state);
    this.setState(newState);
    let eatenFoods = this.state.food.filter(
      (foo) => (foo.answerA || foo.answerB || foo.answerC) && foo.eaten
    );
    clearTimeout(this.timers.animate);
    if (eatenFoods.length > 0) {
      this.answerQuestion(eatenFoods[0].key);
      let unEatAnswers = this.state.food.map((foo) => {
        if (foo.answerA || foo.answerB || foo.answerC) {
          foo.eaten = false;
          return foo;
        } else {
          return foo;
        }
      });
      this.setState({
        food: unEatAnswers,
      });
    } else {
      if(!this.state.lost) {
        this.timers.animate = setTimeout(() => this.step(), 20);
      }
    }

    if (this.state.lost) {
      this.gotEatenProcedure();
    }
  }

  gotEatenProcedure() {
    let newState = getInitialState();
    if(this.state.score < 50){
      newState.score = 0
    }
    else{ 
      newState.score = this.state.score - 50;
    }
    newState.food = this.state.food;
    this.setState(newState);
    clearTimeout(this.timers.animate);
    this.resumeGame();
  }
  changeDirection(direction) {
    this.setState(changeDirection(this.state, { direction }));
  }

  pauseGame() {
    clearTimeout(this.timers.start);
    clearTimeout(this.timers.animate);
    this.setState({
      paused: true,
    });
  }

  resumeGame() {
    this.startTimer();
    this.setState({
      paused: false,
    });
  }

  checkGameStatus(key) {
    let status = this.props.getStatus();
    if (status == "continue") {
      setTimeout(() => {
        let resets = [...this.state.food];
        resets[key].eaten = false;

        this.setState({
          food: resets,
        });
      }, 2000);
      this.startTimer();
    } else {
    }
  }

  answerQuestion = (key) => {
    let answer = "";
    switch (key) {
      case 133:
        answer = "optionA";
        break;

      case 0:
        answer = "optionB";
        break;

      case 230:
        answer = "optionC";
        break;

      default:
        console.log("No answer");
    }
    //pausieren
    this.props.checkAnswer(answer, this.state.score);
    /*this.setState({
  lastPause: Date.now()
})*/
  };

  render() {
    const { onEnd, ...otherProps } = this.props;
    const props = { gridSize: 20, ...otherProps };
    const monsters = this.state.monsters.map(({ id, ...monster }) => (
      <Monster key={id} {...props} {...monster} />
    ));

    return (
      <div className="pacman">
        <Board {...props} />
        <Scores score={this.state.score} lost={this.state.lost} />
        <AllFood {...props} food={this.state.food} />
        {monsters}
        <Player
          {...props}
          {...this.state.player}
          lost={this.state.lost}
          onEnd={onEnd}
        />
        {this.state.paused && (
          <Pause paused={this.state.paused} resumeGameTime={this.resumeGame} />
        )}
      </div>
    );
  }
}

Pacman.propTypes = {
  gridSize: PropTypes.number.isRequired,
  onEnd: PropTypes.func,
};

export default withFirebase(Pacman);
