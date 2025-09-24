import express from "express";
import { createStudent, getStudent, getStudents } from "../modules/todasFuncoes";

const router = express.Router();

router.use(express.json());

router.post("/students", async (req, res) => {
  try {
    const data = req.body;
    if (data.name && data.grade && 0 <= data.grade && data.grade <= 10) {
      const aluno = await createStudent(data.name, data.grade);
      return res.status(200).json(aluno);
    } else {
      return res
        .status(400)
        .json({ message: "Obrigatorio ter a nota do aluno entre 0 e 10." });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/students", async (req, res) => {
  try {
    const alunos = await getStudents();
    return res.status(200).json(alunos);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const aluno = await getStudent(id);
    return res.status(200).json(aluno);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
