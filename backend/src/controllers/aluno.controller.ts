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
            res.status(400).json({ error: "Todos os campos são obrigatórios" })
            return
        }

        let newAluno = await Aluno.create({
            nomeAluno,
            cpfAluno,
            numMatricula,
            celularAluno,
            emailAluno,
        })

        res.status(201).json({ message: "Aluno cadastrado com sucesso", item: newAluno })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: "Erro ao cadastrar aluno" })
        return

    }
}

export const update = async (req: Request, res: Response) => {

    try {

        const { idAluno } = req.params
        const { nomeAluno, cpfAluno, numMatricula, celularAluno, emailAluno } = req.body
        let aluno = await Aluno.findByPk(idAluno)

        if (!aluno) {
            res.status(404).json({ error: "Aluno não encontrado" })
            return
        }

        await aluno.update({
            nomeAluno: nomeAluno ?? aluno.nomeAluno,
            cpfAluno: cpfAluno ?? aluno.cpfAluno,
            numMatricula: numMatricula ?? aluno.numMatricula,
            celularAluno: celularAluno ?? aluno.celularAluno,
            emailAluno: emailAluno ?? aluno.emailAluno,
        })

        res.status(200).json({ message: "Aluno atualizado com sucesso", item: aluno })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: "Erro ao atualizar aluno" })
        return

    }
}

export const remove = async (req: Request, res: Response) => {

    try {

        const { idAluno } = req.params
        let aluno = await Aluno.findByPk(idAluno)

        if (!aluno) {
            res.status(404).json({ error: "Aluno não encontrado" })
            return
        }

        await aluno.destroy()
        res.status(200).json({ message: "Aluno removido com sucesso" })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: "Erro ao remover aluno" })
        return

    }
}