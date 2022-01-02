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

    $ node perf/script && node perf/module && node perf/script --locations && node perf/module --locations

    Parsing jquery.js as a script by...
      esprima x 80.73 ops/sec ±1.79% (70 runs sampled)
      acorn x 77.70 ops/sec ±1.07% (68 runs sampled)
      babel x 43.30 ops/sec ±6.10% (55 runs sampled)
      meriyah x 157 ops/sec ±0.87% (79 runs sampled)
      kataw x 69.67 ops/sec ±5.21% (61 runs sampled)
      seafox x 93.94 ops/sec ±5.31% (65 runs sampled)
      cherow x 127 ops/sec ±3.61% (73 runs sampled)
      escaya x 104 ops/sec ±1.28% (76 runs sampled)
      tenko x 49.77 ops/sec ±8.91% (57 runs sampled)

    Parsing collection-view.js as a module by...
      esprima x 1,475 ops/sec ±1.40% (89 runs sampled)
      acorn x 1,414 ops/sec ±0.62% (91 runs sampled)
      babel x 1,219 ops/sec ±1.20% (87 runs sampled)
      meriyah x 2,745 ops/sec ±0.58% (90 runs sampled)
      kataw x 2,144 ops/sec ±1.04% (88 runs sampled)
      seafox x 2,376 ops/sec ±1.22% (90 runs sampled)
      cherow x 2,992 ops/sec ±1.66% (91 runs sampled)
      escaya x 2,540 ops/sec ±0.86% (91 runs sampled)
      tenko x 1,042 ops/sec ±1.43% (88 runs sampled)

    Parsing jquery.js as a script with locations by...
      esprima x 69.65 ops/sec ±2.46% (71 runs sampled)
      acorn x 50.15 ops/sec ±4.52% (54 runs sampled)
      babel x 40.07 ops/sec ±7.28% (55 runs sampled)
      meriyah x 75.03 ops/sec ±6.19% (53 runs sampled)
      kataw x 67.34 ops/sec ±5.19% (60 runs sampled)
      seafox x 66.59 ops/sec ±6.80% (57 runs sampled)
      cherow x 84.89 ops/sec ±4.46% (63 runs sampled)
      escaya x 71.82 ops/sec ±5.03% (64 runs sampled)
      tenko x 46.02 ops/sec ±9.27% (53 runs sampled)

    Parsing collection-view.js as a module with locations by...
      esprima x 1,264 ops/sec ±1.90% (88 runs sampled)
      acorn x 1,274 ops/sec ±1.19% (91 runs sampled)
      babel x 1,181 ops/sec ±1.28% (89 runs sampled)
      meriyah x 1,364 ops/sec ±4.32% (73 runs sampled)
      kataw x 2,286 ops/sec ±1.73% (89 runs sampled)
      seafox x 2,268 ops/sec ±1.26% (91 runs sampled)
      cherow x 2,514 ops/sec ±1.31% (94 runs sampled)
      escaya x 2,310 ops/sec ±0.88% (93 runs sampled)
      tenko x 622 ops/sec ±5.91% (68 runs sampled)

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
    acorn@8.7.0              206.63 KB  107.42 KB  30.85 KB
    @babel/parser@7.16.7     436.57 KB  255.28 KB  65.34 KB
    meriyah@4.2.0            128.56 KB  126.95 KB  40.17 KB
    seafox@1.7.1             95 KB      93.41 KB   25.57 KB
    kataw@0.0.81             297.61 KB  291.29 KB  59.47 KB
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
