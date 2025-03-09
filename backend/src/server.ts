import express, { Request, Response, ErrorRequestHandler } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import alunoRouter from './routes/aluno.router'
import chamadasRouter from './routes/chamadas.router'
import emprestimoRouter from './routes/emprestimo.router'
import exemplar_livroRouter from './routes/exemplar_livro.router'
import livroRouter from './routes/livro.router'
import professorRouter from './routes/professor.router'

dotenv.config()

const server = express()

server.use(cors())
server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true }))

server.use(alunoRouter)
server.use(chamadasRouter)
server.use(emprestimoRouter)
server.use(exemplar_livroRouter)
server.use(livroRouter)
server.use(professorRouter)

server.use((req: Request, res: Response) => {

    res.status(404)
    res.json({ error: 'Endpoint não encontrado.' })

})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    res.status(400)
    console.log(err)
    res.json({ error: 'Ocorreu algum erro.' })

}

server.use(errorHandler)

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT} 🚀`)
})