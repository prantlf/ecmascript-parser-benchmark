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
      esprima x 86.22 ops/sec ±1.98% (74 runs sampled)
      acorn x 88.63 ops/sec ±0.51% (76 runs sampled)
      babel x 44.15 ops/sec ±4.65% (60 runs sampled)
      hermes x 25.15 ops/sec ±4.46% (46 runs sampled)
      meriyah x 146 ops/sec ±2.54% (71 runs sampled)
      kataw x 84.97 ops/sec ±3.21% (63 runs sampled)
      seafox x 103 ops/sec ±1.90% (75 runs sampled)
      cherow x 179 ops/sec ±1.27% (83 runs sampled)
      escaya x 115 ops/sec ±1.27% (74 runs sampled)
      tenko x 56.79 ops/sec ±9.32% (63 runs sampled)

    Parsing collection-view.js as a module by...
      esprima x 1,485 ops/sec ±1.14% (90 runs sampled)
      acorn x 1,407 ops/sec ±1.05% (92 runs sampled)
      babel x 1,242 ops/sec ±1.24% (91 runs sampled)
      hermes x 517 ops/sec ±1.14% (93 runs sampled)
      meriyah x 3,046 ops/sec ±0.76% (95 runs sampled)
      kataw x 2,366 ops/sec ±0.98% (92 runs sampled)
      seafox x 2,516 ops/sec ±1.05% (90 runs sampled)
      cherow x 3,133 ops/sec ±0.72% (93 runs sampled)
      escaya x 2,628 ops/sec ±0.98% (91 runs sampled)
      tenko x 1,134 ops/sec ±1.03% (93 runs sampled)

    Parsing jquery.js as a script with locations by...
      esprima x 75.43 ops/sec ±0.99% (72 runs sampled)
      acorn x 50.94 ops/sec ±2.70% (58 runs sampled)
      babel x 38.88 ops/sec ±4.62% (52 runs sampled)
      hermes x 25.67 ops/sec ±4.59% (46 runs sampled)
      meriyah x 100 ops/sec ±2.17% (73 runs sampled)
      kataw x 80.06 ops/sec ±3.82% (61 runs sampled)
      seafox x 103 ops/sec ±3.43% (67 runs sampled)
      cherow x 80.43 ops/sec ±2.80% (62 runs sampled)
      escaya x 115 ops/sec ±1.44% (83 runs sampled)
      tenko x 47.22 ops/sec ±8.16% (53 runs sampled)

    Parsing collection-view.js as a module with locations by...
      esprima x 1,293 ops/sec ±1.29% (90 runs sampled)
      acorn x 1,268 ops/sec ±1.24% (90 runs sampled)
      babel x 1,132 ops/sec ±1.44% (89 runs sampled)
      hermes x 509 ops/sec ±1.22% (91 runs sampled)
      meriyah x 2,406 ops/sec ±1.31% (90 runs sampled)
      kataw x 2,333 ops/sec ±1.57% (91 runs sampled)
      seafox x 2,274 ops/sec ±1.26% (92 runs sampled)
      cherow x 2,551 ops/sec ±0.83% (94 runs sampled)
      escaya x 2,455 ops/sec ±0.65% (93 runs sampled)
      tenko x 1,085 ops/sec ±1.06% (93 runs sampled)

The `hermes` parser always creates an AST with source code locations. They cannot be disabled to gain more performance.

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

    $ package-size esprima acorn @babel/parser meriyah seafox kataw @azariasb/escaya tenko

    package                  size       minified   gzipped
    esprima@4.0.1            278.47 KB  132.14 KB  28.59 KB
    acorn@8.8.0              206.72 KB  107.29 KB  30.81 KB
    @babel/parser@7.18.11    469.19 KB  270.57 KB  69.8 KB
    hermes-parser@0.9.0      1.8 MB     1.23 MB    421.12 KB
    meriyah@4.3.0            128.94 KB  127.33 KB  40.25 KB
    seafox@1.7.1             95 KB      93.41 KB   25.57 KB
    kataw@0.0.81             297.65 KB  291.29 KB  59.47 KB
    @azariasb/escaya@0.0.63  98.24 KB   96.53 KB   25.97 KB
    tenko@2.0.1              371.71 KB  142.41 KB  39.75 KB

## Exported Code Generator Size

    $ package-size escodegen astring

    package          size       minified  gzipped
    escodegen@2.0.0  278.79 KB  96.82 KB  25.41 KB
    astring@1.8.1    35.61 KB   15.4 KB   4.26 KB

Estimating the size of `@babel/generator` failed.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code.

## License

Copyright (c) 2022 Ferdinand Prantl

Licensed under the MIT license.
