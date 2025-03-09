import { Request, Response } from 'express'
import { Emprestimo } from '../models/Emprestimo'

export const all = async (req: Request, res: Response) => {

    const Lista_Emprestimos = await Emprestimo.findAll()
    res.json({ Lista_Emprestimos })

}

export const add = async (req: Request, res: Response) => {

    try {

        const { idAluno, idProfessor, idExemplar_Livro, dataInit, dateEntrega, status } = req.body

        if (!idExemplar_Livro || !dataInit || !dateEntrega) {

            res.status(400).json({ error: 'Campos idExemplar_Livro, dataInit e dateEntrega são obrigatórios' })
            return
        }

        let newEmprestimo = await Emprestimo.create({
            idAluno,
            idProfessor,
            idExemplar_Livro,
            dataInit,
            dateEntrega,
            status: status || 'Em aberto',
        })

        res.status(201).json({ message: 'Empréstimo cadastrado com sucesso', item: newEmprestimo })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: 'Erro ao cadastrar empréstimo' })
        return

    }
}

export const update = async (req: Request, res: Response) => {

    try {

        const { idEmprestimo } = req.params
        const { idAluno, idProfessor, idExemplar_Livro, dataInit, dateEntrega, status } = req.body

        let emprestimo = await Emprestimo.findByPk(idEmprestimo)

        if (!emprestimo) {

            res.status(404).json({ error: 'Empréstimo não encontrado' })
            return

        }

        await emprestimo.update({
            idAluno: idAluno ?? emprestimo.idAluno,
            idProfessor: idProfessor ?? emprestimo.idProfessor,
            idExemplar_Livro: idExemplar_Livro ?? emprestimo.idExemplar_Livro,
            dataInit: dataInit ?? emprestimo.dataInit,
            dateEntrega: dateEntrega ?? emprestimo.dateEntrega,
            status: status ?? emprestimo.status,
        })

        res.status(200).json({ message: 'Empréstimo atualizado com sucesso', item: emprestimo })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: 'Erro ao atualizar empréstimo' })
        return

    }
}

export const remove = async (req: Request, res: Response) => {

    try {

        const { idEmprestimo } = req.params

        const emprestimo = await Emprestimo.findByPk(idEmprestimo)

        if (!emprestimo) {

            res.status(404).json({ error: 'Empréstimo não encontrado' })
            return
        }

        await emprestimo.destroy()
        res.status(200).json({ message: 'Empréstimo removido com sucesso' })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: 'Erro ao remover empréstimo' })
        return

    }
}