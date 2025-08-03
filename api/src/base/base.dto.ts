import { instanceToPlain } from 'class-transformer';

export abstract class BaseDto {
  toPlainObj() {
    return instanceToPlain(this);
  }

  toString() {
    return JSON.stringify(this.toPlainObj());
  }
}
