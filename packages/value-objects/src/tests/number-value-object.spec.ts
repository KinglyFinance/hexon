import { Either } from 'effect';

import {
  NumberBelowMinimumError,
  NumberExceedsMaximumError,
  NumberInteger,
  NumberMax,
  NumberMin,
  NumberNegative,
  NumberNegativeError,
  NumberNotInRangeError,
  NumberNotIntegerError,
  NumberPositive,
  NumberPositiveError,
  NumberRange,
  NumberValueObject,
} from '../lib';

@NumberNegative()
class NegativeNumber extends NumberValueObject<NegativeNumber, NumberPositiveError>() {}

@NumberPositive()
class PositiveNumber extends NumberValueObject<PositiveNumber, NumberNegativeError>() {}

@NumberMax(10)
class MaxNumber extends NumberValueObject<MaxNumber, NumberExceedsMaximumError>() {}

@NumberMin(5)
class MinNumber extends NumberValueObject<MinNumber, NumberBelowMinimumError>() {}

@NumberInteger()
class IntegerNumber extends NumberValueObject<IntegerNumber, NumberNotIntegerError>() {}

@NumberRange(5, 10)
class RangeNumber extends NumberValueObject<RangeNumber, NumberNotInRangeError>() {}

// This is not a useful class but we want to check if all validation are added.
@NumberNegative()
@NumberPositive()
@NumberMax(10)
@NumberMin(5)
@NumberInteger()
@NumberRange(5, 10)
class AllNumber extends NumberValueObject<
  AllNumber,
  | NumberExceedsMaximumError
  | NumberBelowMinimumError
  | NumberNotInRangeError
  | NumberNotIntegerError
  | NumberNegativeError
  | NumberPositiveError
>() {}

describe('Number Value Object', () => {
  describe('Negative Number', () => {
    it('should create a negative number', () => {
      const negativeNumber = NegativeNumber.create(-1);

      expect(Either.isRight(negativeNumber)).toBeTruthy();

      if (Either.isRight(negativeNumber)) {
        const vo = negativeNumber.right;
        expect(vo.value).toBe(-1);
      }
    });

    it('should not create a positive number', () => {
      const negativeNumber = NegativeNumber.create(1);

      expect(Either.isLeft(negativeNumber)).toBeTruthy();

      if (Either.isLeft(negativeNumber)) {
        const error = negativeNumber.left;
        expect(error).toBeInstanceOf(NumberPositiveError);
      }
    });

    it('Should have 1 validation function', () => {
      const validators = PositiveNumber.validationMap.get(PositiveNumber.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('positiveValidator');
    });
  });

  describe('Positive Number', () => {
    it('should create a positive number', () => {
      const positiveNumber = PositiveNumber.create(1);

      expect(Either.isRight(positiveNumber)).toBeTruthy();

      if (Either.isRight(positiveNumber)) {
        const vo = positiveNumber.right;
        expect(vo.value).toBe(1);
      }
    });

    it('should not create a negative number', () => {
      const positiveNumber = PositiveNumber.create(-1);

      expect(Either.isLeft(positiveNumber)).toBeTruthy();

      if (Either.isLeft(positiveNumber)) {
        const error = positiveNumber.left;
        expect(error).toBeInstanceOf(NumberNegativeError);
      }
    });

    it('Should have 1 validation function', () => {
      const validators = PositiveNumber.validationMap.get(PositiveNumber.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('positiveValidator');
    });
  });

  describe('Max Number', () => {
    it('should create a number below the maximum', () => {
      const maxNumber = MaxNumber.create(5);

      expect(Either.isRight(maxNumber)).toBeTruthy();

      if (Either.isRight(maxNumber)) {
        const vo = maxNumber.right;
        expect(vo.value).toBe(5);
      }
    });

    it('should not create a number above the maximum', () => {
      const maxNumber = MaxNumber.create(15);

      expect(Either.isLeft(maxNumber)).toBeTruthy();

      if (Either.isLeft(maxNumber)) {
        const error = maxNumber.left;
        expect(error).toBeInstanceOf(NumberExceedsMaximumError);
      }
    });

    it('Should have 1 validation function', () => {
      const validators = MaxNumber.validationMap.get(MaxNumber.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('maxValidator');
    });
  });

  describe('Min Number', () => {
    it('should create a number above the minimum', () => {
      const minNumber = MinNumber.create(5);

      expect(Either.isRight(minNumber)).toBeTruthy();

      if (Either.isRight(minNumber)) {
        const vo = minNumber.right;
        expect(vo.value).toBe(5);
      }
    });

    it('should not create a number below the minimum', () => {
      const minNumber = MinNumber.create(3);

      expect(Either.isLeft(minNumber)).toBeTruthy();

      if (Either.isLeft(minNumber)) {
        const error = minNumber.left;
        expect(error).toBeInstanceOf(NumberBelowMinimumError);
      }
    });

    it('Should have 1 validation function', () => {
      const validators = MinNumber.validationMap.get(MinNumber.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('minValidator');
    });
  });

  describe('Integer Number', () => {
    it('should create an integer number', () => {
      const integerNumber = IntegerNumber.create(5);

      expect(Either.isRight(integerNumber)).toBeTruthy();

      if (Either.isRight(integerNumber)) {
        const vo = integerNumber.right;
        expect(vo.value).toBe(5);
      }
    });

    it('should not create a non-integer number', () => {
      const integerNumber = IntegerNumber.create(5.5);

      expect(Either.isLeft(integerNumber)).toBeTruthy();

      if (Either.isLeft(integerNumber)) {
        const error = integerNumber.left;
        expect(error).toBeInstanceOf(NumberNotIntegerError);
      }
    });

    it('Should have 1 validation function', () => {
      const validators = IntegerNumber.validationMap.get(IntegerNumber.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('integerValidator');
    });
  });

  describe('Range Number', () => {
    it('should create a number within the range', () => {
      const rangeNumber = RangeNumber.create(7);

      expect(Either.isRight(rangeNumber)).toBeTruthy();

      if (Either.isRight(rangeNumber)) {
        const vo = rangeNumber.right;
        expect(vo.value).toBe(7);
      }
    });

    it('should not create a number below the range', () => {
      const rangeNumber = RangeNumber.create(3);

      expect(Either.isLeft(rangeNumber)).toBeTruthy();

      if (Either.isLeft(rangeNumber)) {
        const error = rangeNumber.left;
        expect(error).toBeInstanceOf(NumberNotInRangeError);
      }
    });

    it('should not create a number above the range', () => {
      const rangeNumber = RangeNumber.create(15);

      expect(Either.isLeft(rangeNumber)).toBeTruthy();

      if (Either.isLeft(rangeNumber)) {
        const error = rangeNumber.left;
        expect(error).toBeInstanceOf(NumberNotInRangeError);
      }
    });

    it('Should have 1 validation function', () => {
      const validators = RangeNumber.validationMap.get(RangeNumber.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('rangeValidator');
    });
  });

  describe('All validations', () => {
    it('Should have 6 validation functions', () => {
      const validators = AllNumber.validationMap.get(AllNumber.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(6);
      expect(validatorsNames).toContain('negativeValidator');
      expect(validatorsNames).toContain('positiveValidator');
      expect(validatorsNames).toContain('maxValidator');
      expect(validatorsNames).toContain('minValidator');
      expect(validatorsNames).toContain('integerValidator');
      expect(validatorsNames).toContain('rangeValidator');
    });
  });
});
