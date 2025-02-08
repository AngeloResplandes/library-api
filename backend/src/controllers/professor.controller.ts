import { Request, Response } from 'express'
import { Professor } from '../models/Professor'

export const all = async (req: Request, res: Response) => {
  const Lista_Professores = await Professor.findAll()
  res.json({ Lista_Professores })
};

export const add = async (req: Request, res: Response) => {
  try {
    const { nomeProfessor, cpfProfessor, celularProfessor, emailProfessor, departamento } = req.body
    if (!nomeProfessor || !cpfProfessor || !celularProfessor || !emailProfessor || !departamento) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }
    let newProfessor = await Professor.create({
      nomeProfessor,
      cpfProfessor,
      celularProfessor,
      emailProfessor,
      departamento,
    })
    return res.status(201).json({ message: "Professor cadastrado com sucesso", item: newProfessor })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao cadastrar professor" })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { idProfessor } = req.params
    const { nomeProfessor, cpfProfessor, celularProfessor, emailProfessor, departamento } = req.body
    let professor = await Professor.findByPk(idProfessor)
    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado" })
    }
    await professor.update({
      nomeProfessor: nomeProfessor ?? professor.nomeProfessor,
      cpfProfessor: cpfProfessor ?? professor.cpfProfessor,
      celularProfessor: celularProfessor ?? professor.celularProfessor,
      emailProfessor: emailProfessor ?? professor.emailProfessor,
      departamento: departamento ?? professor.departamento,
    })
    return res.status(200).json({ message: "Professor atualizado com sucesso", item: professor })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao atualizar professor" })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const { idProfessor } = req.params
    let professor = await Professor.findByPk(idProfessor);
    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado" })
    }
    await professor.destroy()
    return res.status(200).json({ message: "Professor removido com sucesso" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao remover professor" })
  }
}