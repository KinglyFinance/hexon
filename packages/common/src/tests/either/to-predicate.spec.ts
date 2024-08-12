import { Either } from 'effect';

import { E } from '../../lib';
import { GenericError } from '../common';

describe('Either', () => {
  describe('toPredicate', () => {
    it('should return an Either with the boolean result or an expected error', () => {
      const result = E.toPredicate({
        predicate: () => true,
        error: new GenericError('Should not be called'),
      });

      expect(Either.isRight(result)).toEqual(true);
    });

    it('should return an Either with the expected error', () => {
      const result = E.toPredicate({
        predicate: () => false,
        error: new GenericError('Should be called'),
      });

      expect(Either.isLeft(result)).toEqual(true);

      if (Either.isLeft(result)) {
        const error = result.left;
        expect(error).toBeInstanceOf(GenericError);
        expect(error.message).toEqual('Should be called');
      }
    });
  });
});
