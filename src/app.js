import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";

//Configuration app
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

//Port connection
const PORT = 4000
 app.listen(PORT, () => console.log(`- Running server on port ${PORT}`));