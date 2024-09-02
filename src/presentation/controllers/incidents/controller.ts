import {Request, Response} from 'express';
import { InicidentModel } from '../../../data/models/incident.model';

export class IncidentController{

    public getIncidents = async (req: Request,res: Response)=>{
        try{
            const incidents = await InicidentModel.find();
            return res.json(incidents);
        }
        catch(error){
            return res.json([]);
        }
    }

    public createIncident = async (req: Request, res: Response)=>{
        try{
            const { title, description, lat, lng} = req.body;
            const newIncident = await InicidentModel.create({
                title,
                description,
                lat,
                lng
            });
            res.json(newIncident);
        }
        catch(error){
            res.json({message:"Error creando registro"});
        }
    }

    public getIncidentById = async (req:Request, res:Response)=>{
        try {
            const { id } = req.params;
            const incident = await InicidentModel.findById(id);
            return res.json(incident);
        } catch (error) {
            return res.json({message:"Ocurrio un error al traer el incidente"});
        }
    }

    public updateIncident = async (req:Request, res: Response)=>{
        try {
            const { id } = req.params;
            const { title, description, lat, lng } = req.body;
            await InicidentModel.findByIdAndUpdate(id,{
                title,
                description,
                lat,
                lng
            });
            const updatedIncident = await InicidentModel.findById(id);
            return res.json(updatedIncident);
        } catch (error) {
            return res.json({message:"Ocurrio un error al actualizar el incidente"});
        }
    }

    public deleteIncident = async (req:Request,res : Response)=>{
        try {
            const { id } = req.params;
            await InicidentModel.findByIdAndDelete(id);
            return res.json({message:"Incidente eleminado"});
        } catch (error) {
            return res.json({message:"Ocurrio un error al eliminar el incidente"});
        }
    }
}