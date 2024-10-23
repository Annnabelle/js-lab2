import express from 'express'
import {get, identity, merge} from 'lodash'

import { getUserById, getUserBySessionToken } from '../db/user'
import { getBlogById } from '../controllers/blogs';
import { Blog } from '../db/blog';

export const isAuthenticated = async (req: any, res: any, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['ANNA-AUTH'];
        if(!sessionToken){
            return res.sendStatus(403);
        }

        const exitingUser = await getUserBySessionToken(sessionToken);
        if(!exitingUser){
            return res.sendStatus(403)
        }
        merge(req, {identity: exitingUser});

        return next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const isAuthor = async (req: any, res: any, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['ANNA-AUTH'];
        if (!sessionToken) {
            return res.sendStatus(403); 
        }

        const exitingUser = await getUserBySessionToken(sessionToken); 
        if (!exitingUser) {
            return res.sendStatus(403); 
        }

        const blogById = await Blog.findById(req.params.id);

        if (!blogById) {
            return res.sendStatus(404); 
        }

        if (exitingUser.id !== blogById) {
            return res.status(403).send('You are not allowed to edit or delete this post'); 
        }

        merge(req, { identity: exitingUser });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400); 
    }
};