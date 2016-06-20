# require-symlink

Creates symlinks within the node_modules directory to bypass annoying relative require paths to access deep nested files or folders.

Instead of resolving a relative path like `require('../../../../config')` with require-symlink its possible to create a symlink to this folder `require('symlink')`.

## Installation

``` bash
npm install --save-dev bubleify
```

## Usage

Add a section `requireSymlinks` into your package.json file and add as many key value pairs, with key as the shortcut and a value as the path, to the file/ folder into it.

```
// package.json
{
    "requireSymlinks": {
        "symlink": "./some/folder/to/link/to"
    }
}
```

Now execute `require-link` from command line to generate the links.

``` bash
require-link
```

Its also possible to remove all symlinks by using `require-link unlink`.

It is recommented to add `require-link` into npm `postinstall` hook to execute it when installing other dependencies and ensure that it is available on all machines.

## Gotchas

### NPM Shrinkwrap

npm shrinkwrap does not allow symlinks in the node_modules folder and will throw an error. Its recommended to add `require-link unlink` to `preshrinkwrap` and `require-link` to `postshrinkwrap` to ensure that it will work as expected.

Please also not that `preshrinkwrap` and `postshrinkwrap` hooks are only available in npm >= v3.10.0. You can introduce a workaround by calling `npm run shrinkwrap` with the following script definition.

``` json
{
    "scripts": {
        "preshrinkwrap": "require-link unlink",
        "shrinkwrap": "npm shrinkwrap",
        "postshrinkwrap": "require-link"
    }
}
```

## License

Licensed under the [MIT License](https://opensource.org/licenses/mit-license.php).
