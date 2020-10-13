import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        try {
            const orphanages = await orphanagesRepository.find();
            res.status(201).json(orphanages)
        } catch (error) {
            res.status(401).send({ error });
        }
    },

    async create(req: Request, res: Response) {

        const {
            name,
            latitude,
            longitude,
            instructions,
            about,
            opening_hours,
            open_on_weekends
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        });


        try {
            await orphanagesRepository.save(orphanage);
            res.status(201).json(orphanage)
        } catch (error) {
            res.status(401).send({ error });
        }
    },


}