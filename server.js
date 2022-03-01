const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://localhost/dumpling_db");
const express = require("express");
const app = express();
const path = require("path");

//express routes

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/dumplings", async (req, res, next) => {
  try {
    res.send(Dumpling.findAll());
  } catch (ex) {
    next(ex);
  }
});

//model creation
const Dumpling = sequelize.define("dumplings", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//sync and seed and listen
const init = async () => {
  await sequelize.sync({ force: true });
  console.log("syncd");
  //seed
  await Dumpling.create({ name: "pork", price: 5 });
  await Dumpling.create({ name: "chiken", price: 4 });
  await Dumpling.create({ name: "veggie", price: 3 });
  await Dumpling.create({ name: "shrimp", price: 5 });
  const port = 3456;
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
};

init();
