import { Router } from "express"
import * as EmprestimoController from "../controllers/emprestimo.controller"

const router = Router()

router.get("/emprestimo", EmprestimoController.all)
router.post("/emprestimo", EmprestimoController.add)
router.put("/emprestimo/:idEmprestimo", EmprestimoController.update)
router.delete("/emprestimo/:idEmprestimo", EmprestimoController.remove)

export default router