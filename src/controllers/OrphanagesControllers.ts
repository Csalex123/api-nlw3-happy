import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';

export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        try {
            const orphanages = await orphanagesRepository.find({
                relations: ['images']
            });
            res.status(201).json(orphanageView.renderMany(orphanages));
        } catch (error) {
            res.status(401).send({ error });
        }
    },

    async show(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const { id } = req.params;

        try {
            const orphanage = await orphanagesRepository.findOneOrFail(id, { relations: ['images'] });
            res.status(201).json(orphanageView.render(orphanage))
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

        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });


        try {
            await orphanagesRepository.save(orphanage);
            res.status(201).json(orphanage)
        } catch (error) {
            res.status(401).send({ error });
        }
    },


}