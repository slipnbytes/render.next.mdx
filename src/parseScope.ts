import { isValidElementType } from 'react-is';

import { makeScopeMock } from './makeScopeMock';
import type { Scope } from './types';

export function parseScope(components: string[], providedScope: Scope): Scope {
  const scopeMock = makeScopeMock(components);
  const providedScopeParsed: Scope = Object.keys(providedScope).reduce(
    (currentScope, key) => {
      const currentComponent = providedScope[key];

      if (
        typeof currentComponent !== 'function' &&
        !isValidElementType(currentComponent)
      ) {
        return currentScope;
      }

      return Object.assign(currentScope, {
        [key]: currentComponent,
      });
    },
    {},
  );

  return Object.assign(scopeMock, providedScopeParsed);
}
