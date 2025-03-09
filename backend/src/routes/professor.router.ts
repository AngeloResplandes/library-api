import { Router } from "express"
import * as ProfessorController from "../controllers/professor.controller"

const router = Router()

router.get("/professor", ProfessorController.all)
router.post("/professor", ProfessorController.add)
router.put("/professor/:idProfessor", ProfessorController.update)
router.delete("/professor/:idProfessor", ProfessorController.remove)

export default router