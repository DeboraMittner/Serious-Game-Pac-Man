import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = require("../../config/firebase-config").default;

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password).then((resp) => {
      return this.db
        .collection("users")
        .doc(resp.user.uid)
        .set({
          name: email.split("@")[0],
        });
    });

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doDeleteUser = () => this.auth.currentUser.delete();

  doGetIdToken = () => this.auth.currentUser.getIdToken();

  // *** DB API ****
  addData = (data) => {
    let id = null;
    this.db
      .collection("game")
      .add({
        title: data.title,
      })
      .then((res) => {
        id = res.id;

        data.questions.forEach((question) => {
          this.db.collection("game").doc(id).collection("questions").add({
            question: question.question,
            answer: question.answer,
            options: question.options,
          });
        });
      });
  };

  getGames = (cb) => {
    let games = [];
    this.db
      .collection("game")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          var id = doc.id;
          data = { ...data, id };
          games.push(data);
        });
        cb(games);
      });
  };

  getQuestions = (id, cb) => {
    let questions = [];
    this.db
      .collection("game")
      .doc(id)
      .collection("questions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          questions.push(data);
        });
        cb(questions);
      });
  };

  getAllQuestions = (cb) => {
    let allQuestions = [];
    this.db
      .collection("game")
      .doc()
      .collection("questions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          allQuestions.push(data);
        });
        cb(allQuestions);
      });
  };

  deleteGame = (id) => {
    this.db
      .collection("game")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  getUserName = (cb) => {
    let currentUser = this.auth.currentUser.uid;
    this.db
      .collection("users")
      .doc(currentUser)
      .get()
      .then((doc) => {
        cb(doc.data().name);
      });
  };

  setScore = (highscore, gameId) => {
    this.db
      .collection("game")
      .doc(gameId)
      .collection("scores")
      .add(highscore, { merge: true });
    //this.db.collection("game").doc(gameId).collection('scores').doc(highscore.name).set({score: highscore.score});
  };

  getHighscoresByGameId = (gameId, cb) => {
    let highscore = [];
    this.db
      .collection("game")
      .doc(gameId)
      .collection("scores")
      .get()
      .then((querySnapshot) => {
        let scores = [];
        querySnapshot.forEach((fff) => {
          scores.push(fff.data());
        });

        let maxScores = scores.reduce((b, a) => {
          let i = b.findIndex((e) => e.user === a.user);
          if (i > -1) b[i].score = Math.max(b[i].score, a.score);
          else b.push(a);
          return b;
        }, []);
        cb(maxScores);
      });
  };
}

export default Firebase;
