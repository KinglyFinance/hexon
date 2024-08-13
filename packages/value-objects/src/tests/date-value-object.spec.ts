import { Either } from 'effect';

import {
  DateAfter,
  DateAfterError,
  DateBefore,
  DateBeforeError,
  DateFuture,
  DateFutureError,
  DateInRange,
  DateInvalidError,
  DateMaxAge,
  DateMaxAgeError,
  DateNotInRangeError,
  DateNotWeekdayError,
  DateNotWeekendError,
  DatePast,
  DatePastError,
  DateValid,
  DateValueObject,
  DateWeekday,
  DateWeekend,
} from '../lib';

@DateValid()
class Valid extends DateValueObject<Valid, DateInvalidError>() {}

@DatePast()
class Past extends DateValueObject<Past, DatePastError>() {}

@DateFuture()
class Future extends DateValueObject<Future, DateFutureError>() {}

@DateAfter(new Date('2021-01-01'))
class After extends DateValueObject<After, DateBeforeError>() {}

@DateBefore(new Date('2021-01-01'))
class Before extends DateValueObject<Before, DateAfterError>() {}

@DateMaxAge(18)
class MaxAge extends DateValueObject<MaxAge, DateMaxAgeError>() {}

@DateInRange(new Date('2021-01-01'), new Date('2022-01-01'))
class InRange extends DateValueObject<InRange, DateNotInRangeError>() {}

@DateWeekday()
class Weekday extends DateValueObject<Weekday, DateNotWeekdayError>() {}

@DateWeekend()
class Weekend extends DateValueObject<Weekend, DateNotWeekendError>() {}

// This class is not useful but we want to check if all validations are added.
@DateValid()
@DatePast()
@DateFuture()
@DateAfter(new Date('2021-01-01'))
@DateBefore(new Date('2021-01-01'))
@DateMaxAge(18)
@DateInRange(new Date('2021-01-01'), new Date('2022-01-01'))
@DateWeekday()
@DateWeekend()
class AllDate extends DateValueObject<
  AllDate,
  | DateInvalidError
  | DatePastError
  | DateFutureError
  | DateBeforeError
  | DateAfterError
  | DateMaxAgeError
  | DateNotInRangeError
  | DateNotWeekdayError
  | DateNotWeekendError
>() {}

describe('Date Value Object', () => {
  describe('Valid Date', () => {
    it('Should create a valid date', () => {
      const newDate = new Date();
      const validDate = Valid.create(newDate);

      expect(Either.isRight(validDate)).toBeTruthy();

      if (Either.isRight(validDate)) {
        const vo = validDate.right;
        expect(vo).toBeInstanceOf(Valid);
        expect(vo.value).toBeInstanceOf(Date);
        expect(vo.value).toEqual(newDate);
      }
    });

    it('Should not create an invalid date', () => {
      const newDate = new Date('invalid');
      const invalidDate = Valid.create(newDate);

      expect(Either.isLeft(invalidDate)).toBeTruthy();

      if (Either.isLeft(invalidDate)) {
        const error = invalidDate.left;
        expect(error).toBeInstanceOf(DateInvalidError);
        expect(error.scope).toEqual('VALUE_OBJECT_ERROR');
        expect(error.code).toEqual('DATE_INVALID_ERROR');
        expect(error.data).toEqual({ value: newDate });
      }
    });

    it('Should have 1 validation function', () => {
      const validators = Valid.validationMap.get(Valid.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('validValidator');
    });
  });

  describe('Date Past', () => {
    it('Should create a date in the past', () => {
      const newDate = new Date('2021-01-01');
      const pastDate = Past.create(newDate);

      expect(Either.isRight(pastDate)).toBeTruthy();

      if (Either.isRight(pastDate)) {
        const vo = pastDate.right;
        expect(vo).toBeInstanceOf(Past);
        expect(vo.value).toBeInstanceOf(Date);
        expect(vo.value).toEqual(newDate);
      }
    });

    it('Should not create a date in the future', () => {
      const newDate = new Date('2200-01-01');
      const pastDate = Past.create(newDate);

      expect(Either.isLeft(pastDate)).toBeTruthy();

      if (Either.isLeft(pastDate)) {
        const error = pastDate.left;
        expect(error).toBeInstanceOf(DatePastError);
        expect(error.scope).toEqual('VALUE_OBJECT_ERROR');
        expect(error.code).toEqual('DATE_PAST_ERROR');
        expect(error.data).toEqual({ value: newDate });
      }
    });

    it('Should have 1 validation function', () => {
      const validators = Past.validationMap.get(Past.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('pastValidator');
    });
  });

  describe('Date Future', () => {
    it('Should create a date in the future', () => {
      const newDate = new Date('2200-01-01');
      const futureDate = Future.create(newDate);

      expect(Either.isRight(futureDate)).toBeTruthy();

      if (Either.isRight(futureDate)) {
        const vo = futureDate.right;
        expect(vo).toBeInstanceOf(Future);
        expect(vo.value).toBeInstanceOf(Date);
        expect(vo.value).toEqual(newDate);
      }
    });

    it('Should not create a date in the past', () => {
      const newDate = new Date('2021-01-01');
      const futureDate = Future.create(newDate);

      expect(Either.isLeft(futureDate)).toBeTruthy();

      if (Either.isLeft(futureDate)) {
        const error = futureDate.left;
        expect(error).toBeInstanceOf(DateFutureError);
        expect(error.scope).toEqual('VALUE_OBJECT_ERROR');
        expect(error.code).toEqual('DATE_FUTURE_ERROR');
        expect(error.data).toEqual({ value: newDate });
      }
    });

    it('Should have 1 validation function', () => {
      const validators = Future.validationMap.get(Future.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('futureValidator');
    });
  });

  describe('Date After', () => {
    it('Should create a date after the expected date', () => {
      const expectedDate = new Date('2021-01-01');
      const newDate = new Date(expectedDate.getTime() + 1000);
      const afterDate = After.create(newDate);

      expect(Either.isRight(afterDate)).toBeTruthy();

      if (Either.isRight(afterDate)) {
        const vo = afterDate.right;
        expect(vo).toBeInstanceOf(After);
        expect(vo.value).toBeInstanceOf(Date);
        expect(vo.value).toEqual(newDate);
      }
    });

    it('Should not create a date before the expected date', () => {
      const expectedDate = new Date('2021-01-01');
      const newDate = new Date(expectedDate.getTime() - 1000);
      const afterDate = After.create(newDate);

      expect(Either.isLeft(afterDate)).toBeTruthy();

      if (Either.isLeft(afterDate)) {
        const error = afterDate.left;
        expect(error).toBeInstanceOf(DateBeforeError);
        expect(error.scope).toEqual('VALUE_OBJECT_ERROR');
        expect(error.code).toEqual('DATE_BEFORE_ERROR');
        expect(error.data).toEqual({ value: newDate });
      }
    });

    it('Should have 1 validation function', () => {
      const validators = After.validationMap.get(After.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('afterValidator');
    });
  });

  describe('Date Before', () => {
    it('Should create a date before the expected date', () => {
      const expectedDate = new Date('2021-01-01');
      const newDate = new Date(expectedDate.getTime() - 1000);
      const beforeDate = Before.create(newDate);

      expect(Either.isRight(beforeDate)).toBeTruthy();

      if (Either.isRight(beforeDate)) {
        const vo = beforeDate.right;
        expect(vo).toBeInstanceOf(Before);
        expect(vo.value).toBeInstanceOf(Date);
        expect(vo.value).toEqual(newDate);
      }
    });

    it('Should not create a date after the expected date', () => {
      const expectedDate = new Date('2021-01-01');
      const newDate = new Date(expectedDate.getTime() + 1000);
      const beforeDate = Before.create(newDate);

      expect(Either.isLeft(beforeDate)).toBeTruthy();

      if (Either.isLeft(beforeDate)) {
        const error = beforeDate.left;
        expect(error).toBeInstanceOf(DateAfterError);
        expect(error.scope).toEqual('VALUE_OBJECT_ERROR');
        expect(error.code).toEqual('DATE_AFTER_ERROR');
        expect(error.data).toEqual({ value: newDate });
      }
    });

    it('Should have 1 validation function', () => {
      const validators = Before.validationMap.get(Before.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('beforeValidator');
    });
  });

  describe('Date Max Age', () => {
    it('Should create a date with the expected age', () => {
      const newDate = new Date('2000-01-01');
      const maxAgeDate = MaxAge.create(newDate);

      expect(Either.isRight(maxAgeDate)).toBeTruthy();

      if (Either.isRight(maxAgeDate)) {
        const vo = maxAgeDate.right;
        expect(vo).toBeInstanceOf(MaxAge);
        expect(vo.value).toBeInstanceOf(Date);
        expect(vo.value).toEqual(newDate);
      }
    });

    it('Should not create a date with an age higher than the expected age', () => {
      const newDate = new Date('2018-01-01');
      const maxAgeDate = MaxAge.create(newDate);

      expect(Either.isLeft(maxAgeDate)).toBeTruthy();

      if (Either.isLeft(maxAgeDate)) {
        const error = maxAgeDate.left;
        expect(error).toBeInstanceOf(DateMaxAgeError);
        expect(error.scope).toEqual('VALUE_OBJECT_ERROR');
        expect(error.code).toEqual('DATE_MAX_AGE_ERROR');
        expect(error.data).toEqual({ value: newDate });
      }
    });

    it('Should have 1 validation function', () => {
      const validators = MaxAge.validationMap.get(MaxAge.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('maxAgeValidator');
    });
  });

  describe('Date In Range', () => {
    it('Should create a date in the expected range', () => {
      const newDate = new Date('2021-06-01');
      const inRangeDate = InRange.create(newDate);

      expect(Either.isRight(inRangeDate)).toBeTruthy();

      if (Either.isRight(inRangeDate)) {
        const vo = inRangeDate.right;
        expect(vo).toBeInstanceOf(InRange);
        expect(vo.value).toBeInstanceOf(Date);
        expect(vo.value).toEqual(newDate);
      }
    });

    it('Should not create a date out of the expected range', () => {
      const newDate = new Date('2022-06-01');
      const inRangeDate = InRange.create(newDate);

      expect(Either.isLeft(inRangeDate)).toBeTruthy();

      if (Either.isLeft(inRangeDate)) {
        const error = inRangeDate.left;
        expect(error).toBeInstanceOf(DateNotInRangeError);
        expect(error.scope).toEqual('VALUE_OBJECT_ERROR');
        expect(error.code).toEqual('DATE_NOT_IN_RANGE_ERROR');
        expect(error.data).toEqual({ value: newDate });
      }
    });

    it('Should have 1 validation function', () => {
      const validators = InRange.validationMap.get(InRange.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('inRangeValidator');
    });
  });

  describe('Date Weekday', () => {
    it('Should create a date on a weekday', () => {
      const newDate = new Date('2024-08-13');
      const weekdayDate = Weekday.create(newDate);

      expect(Either.isRight(weekdayDate)).toBeTruthy();

      if (Either.isRight(weekdayDate)) {
        const vo = weekdayDate.right;
        expect(vo).toBeInstanceOf(Weekday);
        expect(vo.value).toBeInstanceOf(Date);
        expect(vo.value).toEqual(newDate);
      }
    });

    it('Should not create a date on a weekend', () => {
      const newDate = new Date('2024-08-18');
      const weekdayDate = Weekday.create(newDate);

      expect(Either.isLeft(weekdayDate)).toBeTruthy();

      if (Either.isLeft(weekdayDate)) {
        const error = weekdayDate.left;
        expect(error).toBeInstanceOf(DateNotWeekdayError);
        expect(error.scope).toEqual('VALUE_OBJECT_ERROR');
        expect(error.code).toEqual('DATE_NOT_WEEKDAY_ERROR');
        expect(error.data).toEqual({ value: newDate });
      }
    });

    it('Should have 1 validation function', () => {
      const validators = Weekday.validationMap.get(Weekday.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('weekdayValidator');
    });
  });

  describe('Date Weekend', () => {
    it('Should create a date on a weekend', () => {
      const newDate = new Date('2024-08-18');
      const weekendDate = Weekend.create(newDate);

      expect(Either.isRight(weekendDate)).toBeTruthy();

      if (Either.isRight(weekendDate)) {
        const vo = weekendDate.right;
        expect(vo).toBeInstanceOf(Weekend);
        expect(vo.value).toBeInstanceOf(Date);
        expect(vo.value).toEqual(newDate);
      }
    });

    it('Should not create a date on a weekday', () => {
      const newDate = new Date('2024-08-13');
      const weekendDate = Weekend.create(newDate);

      expect(Either.isLeft(weekendDate)).toBeTruthy();

      if (Either.isLeft(weekendDate)) {
        const error = weekendDate.left;
        expect(error).toBeInstanceOf(DateNotWeekendError);
        expect(error.scope).toEqual('VALUE_OBJECT_ERROR');
        expect(error.code).toEqual('DATE_NOT_WEEKEND_ERROR');
        expect(error.data).toEqual({ value: newDate });
      }
    });

    it('Should have 1 validation function', () => {
      const validators = Weekend.validationMap.get(Weekend.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(1);
      expect(validatorsNames).toContain('weekendValidator');
    });
  });

  describe('All Date', () => {
    it('Should have 9 validation functions', () => {
      const validators = AllDate.validationMap.get(AllDate.KEY);
      const validatorsNames = validators?.map((validator) => validator.name);

      expect(validators).toHaveLength(9);
      expect(validatorsNames).toContain('validValidator');
      expect(validatorsNames).toContain('pastValidator');
      expect(validatorsNames).toContain('futureValidator');
      expect(validatorsNames).toContain('afterValidator');
      expect(validatorsNames).toContain('beforeValidator');
      expect(validatorsNames).toContain('maxAgeValidator');
      expect(validatorsNames).toContain('inRangeValidator');
      expect(validatorsNames).toContain('weekdayValidator');
      expect(validatorsNames).toContain('weekendValidator');
    });
  });
});
