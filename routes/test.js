const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const __Person = require("../models/person");

router.get("/", async (req, res) => {
  return res.status(200).send("working");
});

//aggregate match method
router.get("/match", async (req, res) => {
  const person = await __Person.aggregate([{ $match: { age: { $lte: 25 } } }]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});
//aggregate group method
router.get("/group", async (req, res) => {
  const person = await __Person.aggregate([
    { $group: { _id: { gender: "$gender", isActive: "$isActive" } } },
  ]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate match-group method
router.get("/match-group", async (req, res) => {
  const person = await __Person.aggregate([
    { $match: { favoriteFruit: "banana" } },
    { $group: { _id: { gender: "$gender" } } },
  ]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate count method
router.get("/count", async (req, res) => {
  const person = await __Person.aggregate([{ $count: "gender" }]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate group-count method
router.get("/group-count", async (req, res) => {
  const person = await __Person.aggregate([
    { $group: { _id: "$company.location.country" } },
    { $count: "gender" },
  ]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate sort method
router.get("/sort", async (req, res) => {
  const person = await __Person.aggregate([{ $sort: { age: -1 } }]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate group-sort method
router.get("/group-sort", async (req, res) => {
  const person = await __Person.aggregate([
    { $group: { _id: { fruit: "$favoriteFruit" } } },
    { $sort: { "_id.fruit": 1 } },
  ]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});
module.exports = router;
