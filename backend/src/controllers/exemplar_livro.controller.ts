import { Request, Response } from 'express'
import { ExemplarLivro } from '../models/ExemplarLivro'

export const all = async (req: Request, res: Response) => {
  const Lista_ExemplarLivros = await ExemplarLivro.findAll()
  res.json({ Lista_ExemplarLivros })
}

export const add = async (req: Request, res: Response) => {
  try {
    const { idLivro, numCodigo, status_livro } = req.body

    if (!idLivro || !numCodigo || !status_livro) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    let newExemplar = await ExemplarLivro.create({
      idLivro,
      numCodigo,
      status_livro,
    })

    return res.status(201).json({ message: 'Exemplar cadastrado com sucesso', item: newExemplar })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao cadastrar exemplar' })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { idExemplar_Livro } = req.params
    const { numCodigo, status_livro } = req.body

    let exemplar = await ExemplarLivro.findByPk(idExemplar_Livro)

    if (!exemplar) {
      return res.status(404).json({ error: 'Exemplar não encontrado' })
    }

    await exemplar.update({
      numCodigo: numCodigo ?? exemplar.numCodigo,
      status_livro: status_livro ?? exemplar.status_livro,
    })

    return res.status(200).json({ message: 'Exemplar atualizado com sucesso', item: exemplar })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao atualizar exemplar' })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const { idExemplar_Livro } = req.params
    let exemplar = await ExemplarLivro.findByPk(idExemplar_Livro)
    if (!exemplar) {
      return res.status(404).json({ error: 'Exemplar não encontrado' })
    }
    await exemplar.destroy()
    return res.status(200).json({ message: 'Exemplar removido com sucesso' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao remover exemplar' })
  }
}
