const firebaseConfig = {
  apiKey: "AIzaSyBgAmf1TBPM6xOLa3CnE7MjwyjuzEJ9y2s",
  authDomain: "shared-list-app-e9e02.firebaseapp.com",
  databaseURL: "https://shared-list-app-e9e02-default-rtdb.firebaseio.com",
  projectId: "shared-list-app-e9e02",
  storageBucket: "shared-list-app-e9e02.appspot.com",
  messagingSenderId: "725049661769",
  appId: "1:725049661769:web:e215294a6488dcce75e298",
  measurementId: "G-BP3CFTYMK3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();