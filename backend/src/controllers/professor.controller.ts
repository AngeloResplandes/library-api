import { Request, Response } from 'express'
import { Professor } from '../models/Professor'

export const all = async (req: Request, res: Response) => {

    const Lista_Professores = await Professor.findAll()
    res.json({ Lista_Professores })

}

export const add = async (req: Request, res: Response) => {

    try {

        const { nomeProfessor, cpfProfessor, celularProfessor, emailProfessor, departamento } = req.body

        if (!nomeProfessor || !cpfProfessor || !celularProfessor || !emailProfessor || !departamento) {

            res.status(400).json({ error: "Todos os campos são obrigatórios" })
            return

        }

        let newProfessor = await Professor.create({
            nomeProfessor,
            cpfProfessor,
            celularProfessor,
            emailProfessor,
            departamento,
        })

        res.status(201).json({ message: "Professor cadastrado com sucesso", item: newProfessor })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: "Erro ao cadastrar professor" })
        return

    }
}

export const update = async (req: Request, res: Response) => {

    try {

        const { idProfessor } = req.params
        const { nomeProfessor, cpfProfessor, celularProfessor, emailProfessor, departamento } = req.body
        let professor = await Professor.findByPk(idProfessor)

        if (!professor) {

            res.status(404).json({ error: "Professor não encontrado" })
            return

        }

        await professor.update({
            nomeProfessor: nomeProfessor ?? professor.nomeProfessor,
            cpfProfessor: cpfProfessor ?? professor.cpfProfessor,
            celularProfessor: celularProfessor ?? professor.celularProfessor,
            emailProfessor: emailProfessor ?? professor.emailProfessor,
            departamento: departamento ?? professor.departamento,
        })

        res.status(200).json({ message: "Professor atualizado com sucesso", item: professor })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: "Erro ao atualizar professor" })
        return

    }
}

export const remove = async (req: Request, res: Response) => {

    try {

        const { idProfessor } = req.params
        let professor = await Professor.findByPk(idProfessor)

        if (!professor) {
            res.status(404).json({ error: "Professor não encontrado" })
            return
        }

        await professor.destroy()
        res.status(200).json({ message: "Professor removido com sucesso" })
        return

    } catch (error) {

        console.error(error)
        res.status(500).json({ error: "Erro ao remover professor" })
        return

    }
}