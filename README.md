# next-mdx

MDX Render tool for [NextJS](https://nextjs.org/).

## Installation

NPM

```shell
$ npm install @hitechline/next-mdx
```

Yarn

```shell
$ yarn add @hitechline/next-mdx
```

## Usage

You must use the [`render()`](#rendermarkdown-options) method in `getInitialProps` and hydrate in your component. See:

```tsx
import { render } from '@hitechline/next-mdx';

// ...

export async function getStaticProps() {
  const markdown = `
# next-mdx

MDX Rendering tool for NextJS.
`;

  const renderData = await render(markdown /* ,options */);

  return {
    props: {
      renderData,
    },
  };
}
```

In component:

```tsx
import { render } from '@hitechline/next-mdx';
import { Provider } from '@hitechline/next-mdx/provider';

const Page = ({ renderData }) => {
  return (
    <div>
      <Provider {...renderData} />
    </div>
  );
};

export async function getStaticProps() {
  // ...
}

export default Page;
```

## API

### render(markdown, [options])

\> **Return** - `RenderData`

```ts
{
  html: string;
  code: string;
  requiredComponents: string[];
}
```

\> **Parameters**

**markdown**

type: `string`  
required: `true`

**options** - `RenderOptions`

type: `object`  
required: `false`

**options.scope**

type: `object`  
required: `false`

```ts
{
  scope: {
    [ComponentName: string]: React.ComponentType;
  }
}
```

**options.remarkPlugins**

type: `array`  
required: `false`

```ts
{
  remarkPlugins: [...RemarkPlugin];
}
```

**options.rehypePlugins**

type: `array`  
required: `false`

```ts
{
  rehypePlugins: [...RehypePlugin];
}
```

## License

MIT © [Hitechline](https://github.com/hitechline)
