import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

//Configuration app
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);


//games
const games ={
  id: 1,
  name: 'Banco Imobiliário',
  image: 'http://',
  stockTotal: 3,
  pricePerDay: 1500,
};


//Endpoints
/*
app.get("/games", (req,res) =>{
  const body = req.body;

  try {
    res.status(200).send("game got");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/games", (req,res) =>{
  
  const gamesTable = [];
  
  try {

    res.status(200).send("game posted");
  } catch (err) {
    res.status(500).send(err.message)
  }
})

*/


//Port connection
const PORT = 4000
 app.listen(PORT, () => console.log(`- Running server on port ${PORT}`));