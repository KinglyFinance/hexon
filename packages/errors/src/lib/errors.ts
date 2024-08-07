import { join } from 'node:path';

import { valueObjects } from '@hexon/value-objects';

export function errors(): string {
  valueObjects();

  console.log(join(__dirname, 'value-objects.ts'));

  return 'errors';
}
