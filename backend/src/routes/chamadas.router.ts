import { Router } from "express"
import * as ChamadasController from "../controllers/chamadas.controller"

const router = Router();

router.get("/atrasosFrequentes", ChamadasController.atrasosFrequentes)
router.get("/verificarDemanda", ChamadasController.verificarDemanda)

export default router