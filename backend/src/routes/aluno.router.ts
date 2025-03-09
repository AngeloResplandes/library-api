import { Router } from "express"
import * as AlunoController from "../controllers/aluno.controller"

const router = Router()

router.get("/aluno", AlunoController.all)
router.post("/aluno", AlunoController.add)
router.put("/aluno/:idAluno", AlunoController.update)
router.delete("/aluno/:idAluno", AlunoController.remove)

export default router