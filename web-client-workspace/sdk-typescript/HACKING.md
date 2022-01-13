## TypeScript support for Node package exports

Currently, TypeScript's support for Node package exports isn't quite straightforward;
see this upstream issue:

- [Support for NodeJS 12.7+ package exports #33079](https://github.com/microsoft/TypeScript/issues/33079)

The invocation that seems to work, for a `src` directory as the package root, is:

```json
{
  "exports": {
    "./*": "./src/*.ts"
  },
  "typesVersions": {
    "*": {
      "*": [
        "src/*.ts"
      ]
    }
  }
}
```
