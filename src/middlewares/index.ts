import express from 'express'
import {get, identity, merge} from 'lodash'

import { getUserBySessionToken } from '../db/user'

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