import { Either, pipe } from 'effect';

import { type Func } from '../generics';

type ToPredicateParams<P extends Func<boolean>, E extends Error> = {
  predicate: P;
  error: E;
};

/**
 * Evaluates a predicate and returns an Either with the boolean result or an expected error.
 */
export const toPredicate = <P extends Func<boolean>, E extends Error>({
  predicate,
  error,
}: ToPredicateParams<P, E>): Either.Either<boolean, E> =>
  pipe(
    Either.Do,
    predicate,
    Either.liftPredicate(
      (valid) => valid,
      () => error,
    ),
  );
