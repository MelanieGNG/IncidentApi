import express from 'express'
import 'dotenv/config' 
import { envs } from './config/envs.plugin'
import { MongoDatabase } from './data/init'
import { InicidentModel } from './data/models/incident.model';
import { AppRoutes } from './presentation/route';
import { emailJob } from '../domain/jobs/email.job';

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () =>
    await MongoDatabase.connect({
      dbName: "IncidentAPI",
      mongoUrl: envs.MONGO_URL ?? ""
    }))();
console.log(envs.MONGO_URL)
app.get('/', (req,res) => {
    res.send("Hola Mundo");
});

app.listen(envs.PORT, () => {
    console.log("Servidor esta corriendo")
    emailJob();

});

app.post("/", async(req, res) =>{
    const {title, descrption, lat,  lng} = req.body;
    const newIncident = await InicidentModel.create({
        title: title,
        descrption: descrption,
        lat: lat,
        lng: lng
    });

    res.send("Registro Creado");

});