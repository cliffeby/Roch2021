import { Request, Response, NextFunction } from "express";
import mongoose, { Schema, Model, Document, isValidObjectId } from 'mongoose';

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
 console.log('Reuest',request.path,request.method,request.body,request.params.id,request.query,request.url);
  const message = "Resources not found - from not found middleware";

  response.status(404).send(message);
};
export const checkObjectId = (
         request: Request,
         response: Response,
         next: NextFunction
       ) => {
         if (!mongoose.Types.ObjectId.isValid(request.params.id))
           return response.status(400).json({ msg: 'Invalid ID' });
         next();
       };
