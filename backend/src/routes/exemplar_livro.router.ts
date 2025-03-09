import { Router } from "express"
import * as ExemplarLivroController from "../controllers/exemplar_livro.controller"

const router = Router()

router.get("/exemplar_livro", ExemplarLivroController.all)
router.post("/exemplar_livro", ExemplarLivroController.add)
router.put("/exemplar_livro/:idExemplar_Livro", ExemplarLivroController.update)
router.delete("/exemplar_livro/:idExemplar_Livro", ExemplarLivroController.remove)

export default router