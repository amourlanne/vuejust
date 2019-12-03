import { CustomHttpError } from './CustomHttpError';

export class FieldNotAvailableError extends CustomHttpError {
  constructor(name: string, value: string) {
    super(
      422,
      'Field not available',
      `${name.charAt(0).toUpperCase() + name.slice(1)} ${value} is not available.`,
    );
  }
}
