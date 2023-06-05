// const db = require('../db');
// const User = db.user;

// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.username || !req.body.password) {
//     res.status(400).send({ message: 'Content can not be empty!' });
//     return;
//   }

//   const user = new User(req.body);
//   user
//     .save()
//     .then((data) => {
//       console.log(data);
//       res.status(201).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while creating the user.'
//       });
//     });
// };

// exports.getAll = (req, res) => {
//   User.find({})
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while retrieving users.'
//       });
//     });
// };

// exports.getUser = (req, res) => {
//   const username = req.params.username;
//   User.find({ username: username })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while retrieving users.'
//       });
//     });
// };

const { response } = require('express');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .find()

    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
  });
};

const getOne = async (req, res, next) => {

  if (!ObjectId.isValid(req.params.id)) { // Validate id for finding a user from database
    res.status(400).json('Request must use a valid user id to find a user.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
  });
};

const createNewUser = async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    profession: req.body.profession,
    location: req.body.location
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .insertOne(user);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Error occurred - Creating User.');
  }
};

const updateUser = async (req, res) => {
  
  if (!ObjectId.isValid(req.params.id)) { // Validate id for updating a user from database
    res.status(400).json('Request must use a valid chemical id to update a user.');
  }

  const userId = new ObjectId(req.params.id);
  
  const user = {
    username: req.body.username,
    password: req.body.password,
    profession: req.body.profession,
    location: req.body.location
  };

  const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .replaceOne({ _id: userId }, user);

  console.log(result);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Error occurred - Updating User.');
  }
};

const deleteUser = async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) { // Validate id for deleting a user from database
    res.status(400).json('Request must use a valid user id to delete a user.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .deleteOne({ _id: userId }, true);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error || 'Error occurred - Deleting User.');
  }
};

module.exports = { getAll, getOne, createNewUser, updateUser, deleteUser };