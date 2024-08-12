export class GenericClass {
  public name = GenericClass.name;

  constructor(
    public value1: string,
    public value2: string,
  ) {}

  public isTrue() {
    return true;
  }

  static className() {
    return this.name;
  }
}
