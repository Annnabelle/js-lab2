import express from "express";

import { getUsers } from "../db/user";

export const getAllUsers = async (req: any, res: any) => { // here we need req: express.Request, res: express.Response but i got error
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    } catch(error){
        console.log(error);
        return res.sendStatus(400)
    }
}

