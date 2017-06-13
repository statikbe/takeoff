takeoff
=======

A starter kit for an HTML project with sass. You can put this in any folder you like, we normally put it inside **[root]/takeoff**

After you've copied the files into the correct folder, get the needed dependencies with `$ yarn install`. After all the needed packages are downloaded, you can run Gulp with

```
$ gulp
```

Needed before you can use our takeoff

## Node.js and npm
```
https://docs.npmjs.com/getting-started/installing-node
```

## Gulp

https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

### Tasks

#### CSS

```
$ gulp css
```

1. Compiles Sass to CSS.
2. Adds vendor prefixes where needed.
3. Minifies into `<target>/css/main.min.css`.

#### Javascript

```
$ gulp js
```

1. Finds and reports javascript errors to the terminal.
2. Concatenates source javascript files.
3. Minifies into `<target>/js/main.min.js`.


#### Images

```
$ gulp img
```

1. Minifies .svg, .png, .jpg, .gif and .ico files.
2. Provides .png fallbacks for .svg images.
3. Builds into `<target>/img/`.

#### Fonts

#### Build

```
$ gulp build
```

Runs all the above tasks.