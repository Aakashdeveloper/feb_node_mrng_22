const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const db = admin.firestore();

exports.addMessage = functions.https.onRequest(async (req, res) => {
  const citiesRef = db.collection("decnode");
  await citiesRef.doc("Mumbai").set({
    "name": "Mumbai", "country": "India", "population": 4645,
    "capital": false,
  });
  res.send("Data Added");
});

exports.addCiti = functions.https.onRequest(async (req, res) => {
  const citiesRef = db.collection("decnode");
  await citiesRef.doc("Mumbai").set({
    "name": "Mumbai", "country": "India", "population": 4645,
    "capital": false,
  });
  res.send("Data Added");
});

exports.getMessage = functions.https.onRequest(async (req, res) => {
  const citiesRef = db.collection("decnode");
  const snapshot = await citiesRef.get();
  const out = [];
  snapshot.forEach((doc) => {
    out.push(doc.data());
  });
  res.send(out);
});
