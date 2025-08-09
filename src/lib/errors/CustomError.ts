import type { StatusCodes } from 'http-status-codes';

type CustomErrorType<Code> = {
  message: string;
  statusCode: StatusCodes;
  code?: Code;
};

export class CustomError<Code extends string> extends Error {
  message: string;
  statusCode: StatusCodes;
  code?: Code;
  constructor({ message, statusCode, code }: CustomErrorType<Code>) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}
