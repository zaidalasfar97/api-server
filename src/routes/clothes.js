'use strict';
const express = require('express');
const validator = require('../middlewares/validator.js');
const Clothes = require('../models/data-collection-class');
const clothesModel = require('../models/clothes.js');
const clothes = new Clothes(clothesModel);
const router = express.Router();

router.get('/', getClothes);
router.get('/:id', validator, getByIds);
router.post('/', createNewClothes);
router.put('/:id', validator, updateClothes);
router.delete('/:id', validator, deleteClothes);

async function getClothes(req, res) {
  try {
    const resObj = await clothes.read();
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

async function getByIds(req, res, next) {
  try {
    const resObj = await clothes.read(req.params.id);
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

async function createNewClothes(req, res, next) {
  const clothesObject = req.body;
  try {
    const resObj = await clothes.create(clothesObject);
    res.status(201).json(resObj);
  } catch (error) {
    next(error);
  }
}

async function updateClothes(req, res, next) {
  const clothesObject = req.body;
  try {
    const resObj = await clothes.update(req.params.id, clothesObject);
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

async function deleteClothes(req, res, next) {
  try {
    const resObj = await clothes.delete(req.params.id);
    res.json(resObj);
  } catch (error) {
    next(error);
  }
}

module.exports = router;