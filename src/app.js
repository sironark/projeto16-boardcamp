import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Configuration app
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

//Endpoints



//Port connection
const port = process.env.PORT || 5000
 app.listen(port, () => console.log(`- Running server on port ${port}`));