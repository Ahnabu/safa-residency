import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
    return async(req: Request, res: Response, next: NextFunction) =>{
        try{
            // validation check
            // Check if schema expects nested body or direct body
            const schemaKeys = Object.keys(schema.shape);
            
            if (schemaKeys.includes('body')) {
                // Schema expects nested body structure
                await schema.parseAsync({
                    body: req.body
                })
            } else {
                // Schema expects direct body
                await schema.parseAsync(req.body)
            }
            next()
        }catch(err){
            next(err)
        }
    }
}

export default validateRequest