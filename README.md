# ECMAScript Parser Benchmark

Compares the speed and package size of various ECMAScript parsers.

The new contender `meriyah` runs twice as fast as the old bard `esprima`.

## Synopsis

    git clone https://github.com/prantlf/ecmascript-parser-benchmark.git
    cd ecmascript-parser-benchmark
    pnpm i
    npm start

## Parsing Speed

    $ node perf/script && node perf/module

    Parsing jquery.js as a script by...
      esprima x 85.93 ops/sec ±1.87% (74 runs sampled)
      acorn x 85.09 ops/sec ±1.59% (73 runs sampled)
      babel x 43.03 ops/sec ±4.43% (58 runs sampled)
      meriyah x 177 ops/sec ±1.24% (82 runs sampled)
      kataw x 101 ops/sec ±1.44% (73 runs sampled)
      seafox x 90.04 ops/sec ±4.07% (66 runs sampled)
      escaya x 103 ops/sec ±2.29% (75 runs sampled)
      tenko x 38.64 ops/sec ±11.23% (47 runs sampled)

    Parsing collection-view.js as a module by...
      esprima x 1,477 ops/sec ±1.25% (91 runs sampled)
      acorn x 1,396 ops/sec ±2.05% (89 runs sampled)
      babel x 1,222 ops/sec ±2.20% (86 runs sampled)
      meriyah x 2,907 ops/sec ±1.92% (90 runs sampled)
      kataw x 2,387 ops/sec ±1.22% (92 runs sampled)
      seafox x 2,501 ops/sec ±1.50% (91 runs sampled)
      escaya x 2,603 ops/sec ±1.18% (91 runs sampled)
      tenko x 1,068 ops/sec ±0.75% (91 runs sampled)

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

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code.

## License

Copyright (c) 2022 Ferdinand Prantl

Licensed under the MIT license.
