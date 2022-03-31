import { AnyObjectSchema } from 'yup';
import { Request, Response, NextFunction } from 'express';

const validateResource =
  (resourceSchema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);

      // validate resource
      await resourceSchema.validate({
        ...req.body,
        ...req.query,
        ...req.params,
      });

      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export default validateResource;
