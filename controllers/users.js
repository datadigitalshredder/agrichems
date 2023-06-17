const { response } = require('express');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getUsers = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection('users')
    .find()

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      // if (err) {
      //   res.status(400).json({ message: err });
      // } // else {
      //   res.status(200).json(lists);
      // }
      res.status(200).json(lists);

    });
};

const getUser = async (req, res, next) => {

  if (!ObjectId.isValid(req.params.id)) { // Validate id for finding a user from database
    res.status(400).json('Request must use a valid user id to find a user.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('users')
    .find({ _id: userId })
    result.toArray().then((lists) => {
      // if (err) {
      //   res.status(400).json({ message: err });
      // }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
  });
};

module.exports = { getUsers, getUser };