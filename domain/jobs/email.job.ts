import cron from 'node-cron';
import { InicidentModel } from '../../src/data/models/incident.model';
import { EmailService } from '../services/email.service';
import { generateIncidentEmailTemplate } from '../templates/email.template';

export const emailJob = () => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async ()=>{
        try {
            const incidents = await InicidentModel.find({ isEmailSent: false });
            
            if (!incidents.length){
                console.log("No hay incidentes por enviar")
                return;
            }

            console.log(`Procesando ${incidents.length} incidentes.`)
            await Promise.all(
                incidents.map(async (incident)=>{
                    console.log(incident)
                    try{
                        const htmlBody = generateIncidentEmailTemplate(
                            incident.title,
                            incident.descrption,
                            incident.lat,
                            incident.lng
                        )

                        await emailService.sendEmail({
                            to:"lanyng17@gmail.com",
                            subject:`Incidente: ${incident.title}`,
                            htmlBody: htmlBody
                        });
                        console.log(`Email enviado para el incidente con Id: ${incident._id}`);
                        let updateIncident = {
                            title: incident.title,
                            description: incident.descrption,
                            lat: incident.lat,
                            lng: incident.lng,
                            isEmailSent: true
                        };
                        await InicidentModel.findByIdAndUpdate(incident._id,updateIncident);
                        console.log(`Incidente actualizado para el Id: ${incident._id}`);
                    }
                    catch(error){
                        console.error("Error al procesar el incidente");
                    }
                })
            );
        } catch (error) {
            console.error("Error durante el envio de correo")
        }
    });
}