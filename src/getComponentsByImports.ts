import parseImports from 'parse-imports';

const REGEX = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

// Logic will be make in later version
// Automatically resolve imports
export async function getComponentsByImports(code: string): Promise<string[]> {
  const matchArray: string[] = [];
  const match = matchArray.concat(code.match(REGEX) as any).filter(Boolean);

  const importsConcatenated = match.join('\n\n');

  const importsGenerator = await parseImports(importsConcatenated);
  const imports = [...importsGenerator];

  return imports.flatMap(({ isDynamicImport, importClause }) => {
    const components: string[] = [];

    if (isDynamicImport || !importClause) {
      return components;
    }

    const { named, namespace, default: defaultImport } = importClause;

    if (namespace) {
      components.push(namespace);
    }

    if (defaultImport) {
      components.push(defaultImport);
    }

    components.push(...named.map(({ binding }) => binding));
    return components;
  });
}
