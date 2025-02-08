import { Request, Response } from 'express'
import { Livro } from '../models/Livro'

export const all = async (req: Request, res: Response) => {
  const Lista_Livros = await Livro.findAll();
  res.json({ Lista_Livros })
};

export const add = async (req: Request, res: Response) => {
  try {
    const { nomeLivro, autorLivro, editoraLivro, anoLivro, generoLivro } = req.body;
    if (!nomeLivro || !autorLivro || !editoraLivro || !anoLivro || !generoLivro) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }
    let newLivro = await Livro.create({
      nomeLivro,
      autorLivro,
      editoraLivro,
      anoLivro,
      generoLivro,
    })
    return res.status(201).json({ message: "Livro cadastrado com sucesso", item: newLivro })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao cadastrar livro" })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { idLivro } = req.params
    const { nomeLivro, autorLivro, editoraLivro, anoLivro, generoLivro } = req.body
    let livro = await Livro.findByPk(idLivro)
    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado" })
    }
    await livro.update({
      nomeLivro: nomeLivro ?? livro.nomeLivro,
      autorLivro: autorLivro ?? livro.autorLivro,
      editoraLivro: editoraLivro ?? livro.editoraLivro,
      anoLivro: anoLivro ?? livro.anoLivro,
      generoLivro: generoLivro ?? livro.generoLivro,
    })
    return res.status(200).json({ message: "Livro atualizado com sucesso", item: livro })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao atualizar livro" })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const { idLivro } = req.params
    let livro = await Livro.findByPk(idLivro)
    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado" })
    }
    await livro.destroy()
    return res.status(200).json({ message: "Livro removido com sucesso" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Erro ao remover livro" })
  }
}