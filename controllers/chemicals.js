const { response } = require('express');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection('agrichems')
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

const getOne = async (req, res, next) => {

  if (!ObjectId.isValid(req.params.id)) { // Validate id for finding a chemical from database
    res.status(400).json('Request must use a valid chemical id to find a chemical/pesticide.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('agrichems')
    .find({ _id: userId })
    result.toArray().then((lists) => {
      // if (err) {
      //   res.status(400).json({ message: err });
      // }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
  });
};

const createNewChem = async (req, res) => {
  const chemical = {
    pesticideGroup: req.body.pesticideGroup,
    tradeName: req.body.tradeName,
    pesticideType: req.body.pesticideType,
    activeIngredient: req.body.activeIngredient,
    formulationType: req.body.formulationType,
    registrationNumber: req.body.registrationNumber,
    description: req.body.description,
    price: req.body.price,
    supplier: req.body.supplier,
    targetCrops: req.body.targetCrops,
    targetPests: req.body.targetPests,
    base64PestImage: req.body.base64PestImage,
    base64PestImage2: req.body.base64PestImage2,
    base64PestImage3: req.body.base64PestImage3
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection('agrichems')
    .insertOne(chemical);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Error occurred - Creating Chemical.');
  }
};

const updateChem = async (req, res) => {
  
  if (!ObjectId.isValid(req.params.id)) { // Validate id for updating a chemical from database
    res.status(400).json('Request must use a valid chemical id to update a chemical/pesticide.');
  }

  const userId = new ObjectId(req.params.id);
  
  const chemical = {
    pesticideGroup: req.body.pesticideGroup,
    tradeName: req.body.tradeName,
    pesticideType: req.body.pesticideType,
    activeIngredient: req.body.activeIngredient,
    formulationType: req.body.formulationType,
    registrationNumber: req.body.registrationNumber,
    description: req.body.description,
    price: req.body.price,
    supplier: req.body.supplier,
    targetCrops: req.body.targetCrops,
    targetPests: req.body.targetPests,
    base64PestImage: req.body.base64PestImage,
    base64PestImage2: req.body.base64PestImage2,
    base64PestImage3: req.body.base64PestImage3
  };

  const result = await mongodb
    .getDb()
    .db()
    .collection('agrichems')
    .replaceOne({ _id: userId }, chemical);

  console.log(result);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Error occurred - Updating Chemical.');
  }
};

const deleteChem = async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) { // Validate id for deleting a chemical from database
    res.status(400).json('Request must use a valid chemical id to delete a chemical/pesticide.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('agrichems')
    .deleteOne({ _id: userId }, true);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error || 'Error occurred - Deleting Chemical.');
  }
};

module.exports = { getAll, getOne, createNewChem, updateChem, deleteChem };