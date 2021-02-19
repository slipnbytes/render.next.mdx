import type { Scope } from './types';

export function makeScopeMock(components: string[]): Scope {
  return components.reduce(
    (currentScope, currentComponent) =>
      Object.assign(currentScope, {
        [currentComponent]: () => null,
      }),
    {},
  );
}
