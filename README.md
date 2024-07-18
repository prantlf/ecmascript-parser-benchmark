# ECMAScript Parser and Code Generator Benchmark

Compares the speed and package size of various ECMAScript parsers and code generators.

The new contender `meriyah` runs twice as fast as the old bard `esprima`. Babel produces an AST, which is not compatible with the other parsers.

Generating code with `astring` is faster than with `escodegen`.

## Synopsis

    git clone https://github.com/prantlf/ecmascript-parser-benchmark.git
    cd ecmascript-parser-benchmark
    pnpm i
    npm start

## Parsing Speed

    $ node perf/script && node perf/module && \
      node perf/script --locations && node perf/module --locations

    Parsing jquery.js as a script by...
      esprima x 91.91 ops/sec ±0.85% (78 runs sampled)
      acorn x 91.55 ops/sec ±0.49% (79 runs sampled)
      babel x 46.68 ops/sec ±2.53% (62 runs sampled)
      hermes x 26.12 ops/sec ±4.30% (47 runs sampled)
      meriyah x 151 ops/sec ±2.41% (71 runs sampled)
      kataw x 87.17 ops/sec ±3.11% (65 runs sampled)
      seafox x 109 ops/sec ±1.81% (80 runs sampled)
      cherow x 142 ops/sec ±1.78% (78 runs sampled)
      escaya x 93.83 ops/sec ±2.06% (69 runs sampled)
      tenko x 62.02 ops/sec ±7.86% (67 runs sampled)
      tree-sitter x 29.87 ops/sec ±1.67% (46 runs sampled)

    Parsing collection-view.js as a module by...
      esprima x 1,581 ops/sec ±0.73% (92 runs sampled)
      acorn x 1,502 ops/sec ±0.44% (93 runs sampled)
      babel x 1,278 ops/sec ±1.02% (91 runs sampled)
      hermes x 532 ops/sec ±0.93% (92 runs sampled)
      meriyah x 3,107 ops/sec ±1.16% (94 runs sampled)
      kataw x 2,491 ops/sec ±0.79% (96 runs sampled)
      seafox x 2,613 ops/sec ±0.58% (90 runs sampled)
      cherow x 2,877 ops/sec ±1.42% (91 runs sampled)
      escaya x 2,760 ops/sec ±0.82% (94 runs sampled)
      tenko x 1,183 ops/sec ±0.90% (93 runs sampled)
      tree-sitter x 479 ops/sec ±0.71% (84 runs sampled)

    Parsing jquery.js as a script with locations by...
      esprima x 79.59 ops/sec ±0.46% (69 runs sampled)
      acorn x 53.86 ops/sec ±2.22% (59 runs sampled)
      babel x 40.50 ops/sec ±6.18% (55 runs sampled)
      hermes x 26.04 ops/sec ±4.52% (48 runs sampled)
      meriyah x 108 ops/sec ±1.07% (71 runs sampled)
      kataw x 89.44 ops/sec ±3.12% (67 runs sampled)
      seafox x 86.19 ops/sec ±3.31% (69 runs sampled)
      cherow x 82.27 ops/sec ±2.72% (64 runs sampled)
      escaya x 83.81 ops/sec ±2.18% (72 runs sampled)
      tenko x 51.95 ops/sec ±7.58% (58 runs sampled)
      tree-sitter x 30.92 ops/sec ±1.55% (49 runs sampled)

    Parsing collection-view.js as a module with locations by...
      esprima x 1,424 ops/sec ±0.63% (94 runs sampled)
      acorn x 1,349 ops/sec ±0.66% (93 runs sampled)
      babel x 1,213 ops/sec ±1.01% (90 runs sampled)
      hermes x 537 ops/sec ±0.85% (93 runs sampled)
      meriyah x 2,514 ops/sec ±0.50% (92 runs sampled)
      kataw x 2,506 ops/sec ±0.68% (93 runs sampled)
      seafox x 2,398 ops/sec ±0.67% (91 runs sampled)
      cherow x 2,595 ops/sec ±0.86% (94 runs sampled)
      escaya x 2,549 ops/sec ±0.66% (93 runs sampled)
      tenko x 1,157 ops/sec ±0.77% (93 runs sampled)
      tree-sitter x 469 ops/sec ±1.06% (81 runs sampled)

The `hermes` parser always creates an AST with source code locations. They cannot be disabled to gain more performance.

The `tree-sitter` parser always creates an AST with source code locations. They cannot be disabled to gain more performance. It makes no difference between a script and a module either.

## Code Generating Speed

    $ node perf/generator && node perf/generator --source-map

    Generating code for an AST from jquery.js by...
      escodegen x 91.99 ops/sec ±1.57% (73 runs sampled)
      astring x 362 ops/sec ±1.21% (83 runs sampled)
      babel x 28.71 ops/sec ±4.65% (52 runs sampled)

    Generating code with source maps for an AST from jquery.js by...
      escodegen x 4.47 ops/sec ±6.08% (16 runs sampled)
      astring x 98.70 ops/sec ±1.40% (72 runs sampled)
      babel x 16.80 ops/sec ±6.85% (33 runs sampled)

## Exported Parser Size

    $ package-size esprima acorn @babel/parser hermes meriyah seafox kataw \
        cherow @azariasb/escaya tenko tree-sitter tree-sitter-javascript

    package                        size       minified   gzipped
    esprima@4.0.1                  278.47 KB  132.14 KB  28.59 KB
    acorn@8.8.0                    206.72 KB  107.29 KB  30.81 KB
    @babel/parser@7.19.0           469.98 KB  271 KB     69.84 KB
    hermes@0.4.4                   308.87 KB  53.94 KB   17.98 KB
    meriyah@4.3.0                  128.94 KB  127.33 KB  40.25 KB
    seafox@1.7.1                   95 KB      93.41 KB   25.57 KB
    kataw@0.0.81                   297.65 KB  291.29 KB  59.47 KB
    cherow@1.6.9                   300.63 KB  89.85 KB   25.12 KB
    @azariasb/escaya@0.0.63        98.24 KB   96.53 KB   25.97 KB
    tenko@2.0.1                    371.71 KB  142.41 KB  39.75 KB
    tree-sitter@0.20.0             51.28 KB   22.81 KB   6.8 KB
    tree-sitter-javascript@0.19.0  37.99 KB   29.81 KB   2.68 KB

## Exported Code Generator Size

    $ package-size escodegen astring

    package          size       minified  gzipped
    escodegen@2.0.0  278.79 KB  96.82 KB  25.41 KB
    astring@1.8.1    35.61 KB   15.4 KB   4.26 KB

Estimating the size of `@babel/generator` failed.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code.

## License

Copyright (c) 2022-2024 Ferdinand Prantl

Licensed under the MIT license.
