import express from "express";
import createStudent from "./src/routes/rotas";

const app = express();

app.use(express.json());

app.use("/", createStudent)

app.listen(3000, () => {
  console.log(`Servidor: http://localhost:3000`);
});