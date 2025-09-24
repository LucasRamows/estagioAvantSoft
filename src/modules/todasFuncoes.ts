//Oi, eu vou centralizar todas as funcões aqui, pensei em por cada uma em um .ts, mas como tem apenas algumas bem simples não é necessario, mas se fosse o caso eu iria criar um arquivo prisma.ts para manter apenas um client do prisma ativo.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createStudent = async (name: string, grade: number) => {
  let format = name.toLowerCase();
  for (let i = 0; i < format.length; i++) {
    if (format.split(format[i]).length > 2) {
      format = format.replaceAll(format[i], "-");
      console.log("teste", format)
    }
  }
  console.log(format.replaceAll("-", "").length)
  if (format.replaceAll("-", "").length === 0) {
    format = "-";
  } else {
    const temp = format.replaceAll("-", "");
    format = temp[0]
  }
  console.log(format);
  const aluno = await prisma.students.create({ data: { name, grade, format } });
  console.log("Aqui no aluno:", aluno);
  return aluno;
};

const getStudents = async () => {
  const alunos = await prisma.students.findMany();
  return alunos;
};

const getStudent = async (id: string) => {
  const aluno = await prisma.students.findUnique({ where: { id: id } });
  return aluno;
};

export { getStudent, getStudents, createStudent };
