const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const __Person = require("../models/person");

router.get("/", async (req, res) => {
  return res.status(200).send("success");
});

//aggregate match stage
router.get("/match", async (req, res) => {
  const person = await __Person.aggregate([{ $match: { age: { $lte: 25 } } }]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});
//aggregate group stage
router.get("/group", async (req, res) => {
  const person = await __Person.aggregate([
    { $group: { _id: { gender: "$gender", isActive: "$isActive" } } },
  ]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate match-group stage
router.get("/match-group", async (req, res) => {
  const person = await __Person.aggregate([
    { $match: { favoriteFruit: "banana" } },
    { $group: { _id: { gender: "$gender" } } },
  ]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate count stage
router.get("/count", async (req, res) => {
  const person = await __Person.aggregate([{ $count: "gender" }]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate group-count stage
router.get("/group-count", async (req, res) => {
  const person = await __Person.aggregate([
    { $group: { _id: "$company.location.country" } },
    { $count: "gender" },
  ]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate sort stage
router.get("/sort", async (req, res) => {
  const person = await __Person.aggregate([{ $sort: { age: -1 } }]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate group-sort stage
router.get("/group-sort", async (req, res) => {
  const person = await __Person.aggregate([
    { $group: { _id: { fruit: "$favoriteFruit" } } },
    { $sort: { "_id.fruit": 1 } },
  ]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate project stage
router.get("/project", async (req, res) => {
  const person = await __Person.aggregate([
    { $project: { _id: 0, gender: 1, info: { newAge: "$age" } } },
  ]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate limit stage
router.get("/limit", async (req, res) => {
  const person = await __Person.aggregate([{ $limit: 2 }]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate limit-match-group stage
router.get("/limit-match-group", async (req, res) => {
  const person = await __Person.aggregate([
    { $limit: 100 },
    { $match: { gender: "female" } },
    { $group: { _id: "$isActive" } },
  ]);

  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate unwind stage
router.get("/unwind", async (req, res) => {
  const person = await __Person.aggregate([{ $unwind: "$tags" }]);
  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate unwind-group stage
router.get("/unwind-group", async (req, res) => {
  const person = await __Person.aggregate([
    { $limit: 2 },
    { $unwind: "$tags" },
    { $group: { _id: "$tags" } },
  ]);
  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate sum accumulator
router.get("/sum", async (req, res) => {
  const person = await __Person.aggregate([
    { $group: { _id: "$age", count: { $sum: "$age" } } },
  ]);
  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate avg accumulator
router.get("/avg", async (req, res) => {
  const person = await __Person.aggregate([
    { $group: { _id: "$age", average: { $avg: "$age" } } },
  ]);
  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate type accumulator
router.get("/type", async (req, res) => {
  const person = await __Person.aggregate([
    { $project: { type: { $type: "$isActive" } } },
  ]);
  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate type accumulator
router.get("/out", async (req, res) => {
  const person = await __Person.aggregate([
    { $project: { type: { $type: "$isActive" } } },
    { $out: "outCollections" },
  ]);
  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});

//aggregate allowDiskUse accumulator
router.get("/allowDiskUse", async (req, res) => {
  const person = await __Person.aggregate([
    { $project: { type: { $type: "$isActive" } } },
    { allowDiskUse: true },
  ]);
  if (!person) res.status(401).send("Error finding records");
  return res.status(200).send(person);
});
module.exports = router;
