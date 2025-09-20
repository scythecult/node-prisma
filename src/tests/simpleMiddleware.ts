import type { Request, Response } from 'express';

export const simpleMiddleware = vi.fn().mockImplementation((request: Request, response: Response) => {
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.send('test simple response');
});
