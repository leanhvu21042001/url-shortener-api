import { AnyObjectSchema, string } from 'yup';
import { Request, Response, NextFunction } from 'express';

const validateResource =
  (resourceSchema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = {
        ...req.body,
        ...req.query,
        ...req.params,
      };

      // validate resource
      await resourceSchema.validate(data);

      // create regex string to validate is valid url
      // https://regex101.com/r/V5Y7rn/1/
      const urlSchema = string().matches(
        /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/
      );
      const validated = await urlSchema.isValid(data.destination);

      // throw error if not valid
      if (!validated) {
        throw new Error();
      }

      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export default validateResource;
