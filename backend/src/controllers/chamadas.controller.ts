import { Request, Response } from "express"
import { sequelize } from "../config/db"
import { QueryTypes } from "sequelize"

export const atrasosFrequentes = async (req: Request, res: Response) => {

    try {

        const query = `
      SELECT 
            aluno.nomeAluno AS Nome_Aluno,
            emprestimo.status AS Status,
            livro.nomeLivro AS Titulo,
            emprestimo.dataInit AS Data_Emprestimo,
            emprestimo.dateEntrega AS Data_Entrega,
            JULIANDAY(CURRENT_DATE) - JULIANDAY(emprestimo.dateEntrega) AS Dias_Atraso
      FROM aluno
      INNER JOIN emprestimo ON aluno.idAluno = emprestimo.idAluno
      INNER JOIN exemplar_livro ON emprestimo.idExemplar_Livro = exemplar_livro.idExemplar_Livro
      INNER JOIN livro ON exemplar_livro.idLivro = livro.idLivro
      WHERE emprestimo.status = 'Atrasado';
    `

        const result = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        })

        if (!result.length) {
            res.status(404).json({ message: "Nenhum aluno com atraso encontrado." })
            return
        }

        res.status(200).json({ Alunos_Atrasados: result })
        return

    } catch (error) {

        console.error("Erro ao buscar alunos com empréstimos atrasados:", error)
        res.status(500).json({ message: "Erro interno do servidor." })
        return

    }
}

export const verificarDemanda = async (req: Request, res: Response) => {

    try {

        const query = `
      SELECT 
          livro.nomeLivro AS Titulo,
          COUNT(CASE WHEN exemplar_livro.status_livro = 'Disponivel' THEN 1 END) AS Quantidade_Disponivel,
          COUNT(emprestimo.idEmprestimo) AS Quantidade_Emprestimos
      FROM livro
      LEFT JOIN exemplar_livro ON livro.idLivro = exemplar_livro.idLivro
      LEFT JOIN emprestimo ON exemplar_livro.idExemplar_Livro = emprestimo.idExemplar_Livro
      GROUP BY livro.idLivro, livro.nomeLivro
      ORDER BY Quantidade_Emprestimos DESC;
    `

        const result = await sequelize.query(query, {
            type: QueryTypes.SELECT,
        })

        if (!result.length) {
            res.status(404).json({ message: "Nenhum livro encontrado." })
            return
        }

        res.status(200).json({ Verificar_Demanda: result })
        return

    } catch (error) {

        console.error("Erro ao buscar livros disponíveis e quantidade de empréstimos:", error)
        res.status(500).json({ message: "Erro interno do servidor." })
        return

    }
}
