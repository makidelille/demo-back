import { z } from 'zod';

export class DomainError extends Error {
  constructor(
    readonly statusCode: number,
    readonly message: string,
  ) {
    super(message);
  }
}

export class NotFoundDomainError extends DomainError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ValidationDomainError extends DomainError {
  constructor(zodError: z.ZodError) {
    const message = zodError.issues
      .map((issue) => `${issue.path.join('.')} => ${issue.message}`)
      .join('\n');

    super(400, message);
  }
}
