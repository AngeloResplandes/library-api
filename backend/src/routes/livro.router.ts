import { Router } from "express"
import * as LivroController from "../controllers/livro.controller"

const router = Router()

router.get("/livro", LivroController.all)
router.post("/livro", LivroController.add)
router.put("/livro/:idLivro", LivroController.update)
router.delete("/livro/:idLivro", LivroController.remove)

export default router