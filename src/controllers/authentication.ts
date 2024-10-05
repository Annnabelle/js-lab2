import express from 'express';
import { createUser, getUserByEmail } from '../db/user';
import { authentication, random } from '../helpers';


export const login = async (req: any, res: any) => { // here we need req: express.Request, res: express.Response but i got error
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.sendStatus(400); 
      }
  
      const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
  
      if (!user || !user.authentication) {
        return res.sendStatus(400); 
      }
  
      const expectedHash = authentication(user.authentication.salt || '', password);

      if (user.authentication.password !== expectedHash) {
        return res.sendStatus(403);
      }
      
      const salt = random();
    
      user.authentication.sessionToken = authentication(salt, user._id.toString());

      await user.save();

      res.cookie('ANNA-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
      
      return res.status(200).json(user);
  
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
};
  

export const register = async (req: any, res: any) => { // here we need req: express.Request, res: express.Response but i got error
    try {
        const {email, username, password} = req.body;
        console.log('body', req.body);
        if(!email || !password || !username){
            console.log('error 9');
            return res.sendStatus(400);
        }
        
        const exitingUser = await getUserByEmail(email);

        if(exitingUser){
            console.log('error 1');
            return res.sendStatus(400)
        }
        const salt = random()
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            },
        });
        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}