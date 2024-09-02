import { Router } from "express"
import { IncidentController } from "./controller";

export class IncidentRoutes{
    static get routes(): Router{
        const router = Router();
        const controller = new IncidentController();

        router.get("/", controller.getIncidents);
        router.get("/:id", controller.getInicdentById);
        router.post("/", controller.createIncident);
        router.put("/:id", controller.updateIncident);
        router.put("/:id", controller.deleteIncident);


        return router;
    }
}