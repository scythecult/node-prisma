import type { NextFunction, Request, Response } from 'express';
import type { ZodObject, ZodOptional, ZodRawShape } from 'zod';

export type StrictZodObject = ZodObject<ZodRawShape>;

type ParseWithSchema = {
  requestData: unknown;
  schema: ZodObject | ZodOptional<ZodObject>;
  message: string;
};

type ValidationRequestParts = 'body' | 'query' | 'params' | 'headers';

type ValidationMiddlewareOptions = Partial<Record<ValidationRequestParts, ZodObject | ZodOptional<ZodObject>>>;

export const ValidationMessage = {
  body: 'Invalid request body!',
  query: 'Params is requered!',
  params: 'Query is requered!',
  headers: 'Header is requered!',
};

export const parseWithSchema = async ({ schema, requestData, message }: ParseWithSchema) => {
  await schema.parseAsync(requestData, {
    error: (issue) => {
      if (issue.code === 'unrecognized_keys') {
        return { message };
      }

      const pathValue = issue?.path?.join('.');
      const errorField = pathValue ? `[Field]: ${pathValue}` : '';

      return `[Expected]: ${issue.expected} ${errorField}`;
    },
  });
};

export const validationMiddlewareBuilder =
  (schemaMap: ValidationMiddlewareOptions) => async (request: Request, response: Response, next: NextFunction) => {
    const schemaKeys = Object.keys(schemaMap) as ValidationRequestParts[];

    for (const schemaKey of schemaKeys) {
      const schema = schemaMap[schemaKey];
      const requestData = request[schemaKey];
      const message = ValidationMessage[schemaKey];

      if (!schema || !requestData) {
        continue;
      }

      await parseWithSchema({
        schema,
        requestData,
        message,
      });
    }

    next();
  };
