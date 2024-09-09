const express = require("express");
const router = express.Router();
const Person = require("../models/person");

// Post route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body containe person data

    // create new person model using mongoose model
    const newPerson = new Person(data);
    // save new person to databse
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data saved");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personID = req.params.id; //Extract id from URL paramter
    const updated_data = req.body; //

    const response = await Person.findByIdAndUpdate(personID, updated_data, {
      new: true, //return the updated Document
      runValidators: true, //Run the mongoose validator
    });

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personID = req.params.id; //extract the [person id] from URL parameter
    const response = await Person.findByIdAndDelete(personID);

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data deleted");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extract work type from URL parameter

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched ");
      res.status(200).json(response);
      // res.status(200).json({message:"person deleted succesfully"})
    } else {
      res.status(404).json({ error: "invalid work" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

module.exports = router;
