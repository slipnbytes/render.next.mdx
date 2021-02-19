import { useMDXComponents } from '@mdx-js/react';
import React, { useRef, useEffect } from 'react';
import { hydrate } from 'react-dom';

import { makeMarkdownElement } from './makeMarkdownElement';
import { parseScope } from './parseScope';
import type { RenderData } from './types';

export const Provider = ({
  html,
  code,
  requiredComponents,
}: RenderData): JSX.Element => {
  const elementRef = useRef<HTMLDivElement>(null);
  const components = useMDXComponents({});

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const scope = parseScope(requiredComponents, components);
    const markdownRendered = makeMarkdownElement(code, scope);

    hydrate(markdownRendered, elementRef.current);
  }, [html, code, requiredComponents]);

  return (
    <div
      ref={elementRef}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

/* eslint react/no-danger: 0 */
