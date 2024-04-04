import { Request, Response } from "express";
import { prisma } from "../app";
import { MovieValidator } from "../validators/movie";

export class MovieController {
    
    validator = new MovieValidator();

    public async create(req: Request, res: Response) {
        try {
            const user = req.body.decodedJwt;
            delete req.body.decodedJwt;
            let data = req.body;
            const errors = this.validator.validateForCreate(data);
    
            if (errors.length > 0 ) {
                return res.status(400).json({status: 'error', errors});
            }
    
            const newMovie = await prisma.movie.create({ data: {...data, userId: user.id} });
            return res.json({status: 'success', data: newMovie})  
        }
        catch (e) {
            return res.status(500).json({status: 'error', data: e});
        }
        
    }
 
    public async update(req: Request, res: Response) {
        try {
            const user = req.body.decodedJwt;
            delete req.body.decodedJwt;
    
            const dbData = await prisma.movie.findUnique({where: {id: +req.body.id, userId: user.id}});
            if (!dbData) return res.status(404).json({status: 'error'});
            const data = Object.assign({}, dbData, req.body);
            const errors = this.validator.validateForUpdate(data);
            if (errors.length > 0 ) {
                return res.status(400).json({status: 'error', errors});
            }
    
            const updatedMovie = await prisma.movie.update({
                where: {
                    id: +req.body.id,
                    userId: user.id
                }, 
                data
            });
    
            return res.json({status: 'success', data: updatedMovie})
        }
        catch (e) {
            return res.status(500).json({status: 'error', data: e});
        }
       
    }

    public async delete(req: Request, res: Response) {
        try {
            const user = req.body.decodedJwt;
            const id = +req.params.id;
            let result = await prisma.movie.delete({
                where: {
                    id: id,
                    userId: user.id
                }
            })
            return res.json({status: 'success', data: result});
        }
        catch (e) {
            return res.status(500).json({status: 'error', data: "error"});
        }
    
    }

    public async list(req: Request, res: Response) {
        const user = req.body.decodedJwt;
        const movies = await prisma.movie.findMany({where: {userId: user.id}, select: {id: true, synopsis: true, director: true, title: true, year: true}});
        return res.json({status: 'success', data: movies});
        
    }

    public async get(req: Request, res: Response) {
        const user = req.body.decodedJwt;

        if (!req.params.id) return res.status(404).json({status: 'error'});
        const movie = await prisma.movie.findUnique({where: {id: +req.params.id, userId: user.id}, select: {id: true, synopsis: true, director: true, title: true, year: true}});

        if (!movie) return res.status(404).json({status: 'error'});
        return res.json({status: 'success', data: movie});
    }
}