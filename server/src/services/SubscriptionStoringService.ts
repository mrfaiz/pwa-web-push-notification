import {NextFunction, Request, Response} from 'express';
import { USER_SUBSCRIPTIONS } from '../database/in-memory-db';

export const storeSubscription = (
    _req: Request, 
    res: Response, 
    next: NextFunction) =>  {
        if(_req.body.body) {
            console.log("GET", _req.body.body);
            const body = JSON.parse(_req.body.body);
            console.log(typeof body);
            USER_SUBSCRIPTIONS.push(body);
        }
        else {
            console.log("GET", _req.body);
        }
        res.json({"success": true});
    }