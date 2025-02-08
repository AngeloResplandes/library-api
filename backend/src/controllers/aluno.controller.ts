import { Request, Response } from 'express'
import { Aluno } from '../models/Aluno'

export const all = async (req: Request, res: Response) => {
  const Lista_Alunos = await Aluno.findAll()
  res.json({ Lista_Alunos })
}

export const add = async (req: Request, res: Response) => {
  try {
    const { nomeAluno, cpfAluno, numMatricula, celularAluno, emailAluno } = req.body
    if (!nomeAluno || !cpfAluno || !numMatricula || !celularAluno || !emailAluno) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }
    let newAluno = await Aluno.create({
      nomeAluno,
      cpfAluno,
      numMatricula,
      celularAluno,
      emailAluno,
    })
    return res.status(201).json({ message: "Aluno cadastrado com sucesso", item: newAluno })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao cadastrar aluno" })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { idAluno } = req.params
    const { nomeAluno, cpfAluno, numMatricula, celularAluno, emailAluno } = req.body
    let aluno = await Aluno.findByPk(idAluno)
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" })
    }
    await aluno.update({
      nomeAluno: nomeAluno ?? aluno.nomeAluno,
      cpfAluno: cpfAluno ?? aluno.cpfAluno,
      numMatricula: numMatricula ?? aluno.numMatricula,
      celularAluno: celularAluno ?? aluno.celularAluno,
      emailAluno: emailAluno ?? aluno.emailAluno,
    })
    return res.status(200).json({ message: "Aluno atualizado com sucesso", item: aluno })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao atualizar aluno" })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const { idAluno } = req.params
    let aluno = await Aluno.findByPk(idAluno)
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" })
    }
    await aluno.destroy()
    return res.status(200).json({ message: "Aluno removido com sucesso" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao remover aluno" })
  }
}