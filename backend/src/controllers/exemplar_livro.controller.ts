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

            res.status(400).json({ error: 'Todos os campos são obrigatórios' })
            return

        }

        let newExemplar = await ExemplarLivro.create({
            idLivro,
            numCodigo,
            status_livro,
        })

        res.status(201).json({ message: 'Exemplar cadastrado com sucesso', item: newExemplar })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: 'Erro ao cadastrar exemplar' })
        return

    }
}

export const update = async (req: Request, res: Response) => {

    try {

        const { idExemplar_Livro } = req.params
        const { numCodigo, status_livro } = req.body

        let exemplar = await ExemplarLivro.findByPk(idExemplar_Livro)

        if (!exemplar) {

            res.status(404).json({ error: 'Exemplar não encontrado' })
            return

        }

        await exemplar.update({
            numCodigo: numCodigo ?? exemplar.numCodigo,
            status_livro: status_livro ?? exemplar.status_livro,
        })

        res.status(200).json({ message: 'Exemplar atualizado com sucesso', item: exemplar })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: 'Erro ao atualizar exemplar' })
        return

    }
}

export const remove = async (req: Request, res: Response) => {

    try {

        const { idExemplar_Livro } = req.params
        let exemplar = await ExemplarLivro.findByPk(idExemplar_Livro)

        if (!exemplar) {

            res.status(404).json({ error: 'Exemplar não encontrado' })
            return

        }

        await exemplar.destroy()
        res.status(200).json({ message: 'Exemplar removido com sucesso' })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: 'Erro ao remover exemplar' })
        return

    }
}
