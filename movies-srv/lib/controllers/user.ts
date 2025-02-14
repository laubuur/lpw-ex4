import { Request, Response } from "express";
import { prisma } from "../app";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {

     async create(req: Request, res: Response) {

        const data: User = req.body;
        if (!data.password) {
            return res.status(400).json({status: 'error', data: "error"});
        }
        if (!data.email) {
            return res.status(400).json({status: 'error', data: "error"});
        }
        if (!data.name) {
            return res.status(400).json({status: 'error', data: "error"});
        }

        const count = await prisma.user.count({where: {email: data.email}});
        if (count != 0) {
            return res.status(400).json({status: 'error', data: "User already exists"});
        }

        const saltRounds = 10;
        bcrypt.hash(data.password, saltRounds, async (err, hash) => {
            if (hash) {
                data.password = hash;
                const user = await prisma.user.create({data})
                return res.json({status: 'success', data: {id: user.id}});
            }
        });
    }

    async login(req: Request, res: Response) {
        const body = req.body;

        if (!body.login || !body.password) {
            return res.status(500).json({status: 'error', data: "User or password incorrect"});
        }

        const user = await prisma.user.findFirst(
            {
                where: {
                    email: body.login
                }
            },
        );

        if (!user) {
            return res.status(400).json({status: 'error', data: "User or password incorrect"});
        }

        bcrypt.compare(body.password, user.password, (err, result) => {
            if(result) {
                const secret = process.env.SECRET;
                if (!secret) {
                    return res.json({status: 'error', data: "Please configure environment file"});
                }
                const token = jwt.sign(
                    {name: user.name, email: user.email, id: user.id},
                     secret,
                    {expiresIn: "12h"}
                );
                return res.json({status: 'success', data: token});
            }
            else {
                return res.json({status: 'error'});
            }
        });
    }

   

}