# Using [Eyeglass] in a [Lerna] monorepo

I was running into bugs where [Eyeglass] was breaking when attempting to compile my Sass files which were housed in a monorepo. When trying to compile cross-package Sass, where _some_ packages are importing npm-module-based Sass files, I would get errors like this:

```bash
Error in plugin 'sass'
Message:
    ../one/one.scss
Error: Error: Could not import normalize-eyeglass from any of the following locations:
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/normalize-eyeglass.scss
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/normalize-eyeglass.sass
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/normalize-eyeglass.css
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/_normalize-eyeglass.scss
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/_normalize-eyeglass.sass
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/_normalize-eyeglass.css
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/normalize-eyeglass/index.scss
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/normalize-eyeglass/index.sass
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/normalize-eyeglass/index.css
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/normalize-eyeglass/_index.scss
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/normalize-eyeglass/_index.sass
         /Users/meow/development/gitrepos/lerna-eyeglass/packages/one/normalize-eyeglass/_index.css
        on line 1 of ../one/one.scss
        from line 1 of two.scss
>> @import 'normalize-eyeglass';
   --------^
```

## How to fix "Could not import _meow_ from any of the following locations" eyeglass error in a Lerna monorepo

1. _each_ package that imports a Sass file that includes eyeglass exports must have as dependencies:
    * [Eyeglass]
    * _all_ dependencies that the imported Sass file require

## Lerna setup

/learna-eyeglass (this repo)
  /packages
    /one
      - one.scss file imports modules via eyeglass
    /two
      - imports one.scss via the eyeglass/node-module path
      - lerna-eyeglass-one is a dependency
      - shares eyeglass-imported dep with lerna-eyeglass-one ([normalize-eyeglass])
      - compiles without error
    /three
      - imports one.scss using a relative path
      - lerna-eyeglass-one is a dependency
      - shares eyeglass-imported dep with lerna-eyeglass-one ([normalize-eyeglass])
      - compiles without error
    /four
      - imports one.scss using a relative path
      - lerna-eyeglass-one is a dependency
      - does _not_ share eyeglass-imported dependency
      - compiles without error
    /four
      - imports one.scss using a relative path
      - lerna-eyeglass-one is _not_ a dependency
      - does _not_ share eyeglass-imported dependency
      - compililation fails

## Packages setup


[Eyeglass]: 
[Lerna]: 
[normalize-eyeglass]: