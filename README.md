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

### Node.js

    ❯ node perf/script && node perf/module && \
      node perf/script --locations && node perf/module --locations

    Parsing jquery.js as a script by...
      esprima x 92.34 ops/sec ±0.82% (79 runs sampled)
      acorn x 94.69 ops/sec ±0.61% (81 runs sampled)
      babel x 45.87 ops/sec ±2.62% (61 runs sampled)
      hermes x 23.77 ops/sec ±5.10% (44 runs sampled)
      meriyah x 182 ops/sec ±0.83% (84 runs sampled)
      kataw x 115 ops/sec ±1.63% (84 runs sampled)
      seafox x 104 ops/sec ±1.95% (76 runs sampled)
      cherow x 135 ops/sec ±2.11% (77 runs sampled)
      escaya x 91.67 ops/sec ±1.76% (70 runs sampled)
      tenko x 68.73 ops/sec ±1.37% (71 runs sampled)

    Parsing collection-view.js as a module by...
      esprima x 1,558 ops/sec ±0.73% (91 runs sampled)
      acorn x 1,467 ops/sec ±0.58% (94 runs sampled)
      babel x 1,228 ops/sec ±3.77% (88 runs sampled)
      hermes x 460 ops/sec ±0.58% (93 runs sampled)
      meriyah x 2,659 ops/sec ±2.09% (86 runs sampled)
      kataw x 2,234 ops/sec ±1.03% (89 runs sampled)
      seafox x 2,272 ops/sec ±3.51% (89 runs sampled)
      cherow x 2,911 ops/sec ±1.04% (92 runs sampled)
      escaya x 2,456 ops/sec ±2.24% (90 runs sampled)
      tenko x 1,152 ops/sec ±1.10% (90 runs sampled)
      tree-sitter x 325 ops/sec ±1.09% (86 runs sampled)

    Parsing jquery.js as a script with locations by...
      esprima x 75.89 ops/sec ±1.98% (66 runs sampled)
      acorn x 55.51 ops/sec ±2.35% (59 runs sampled)
      babel x 43.29 ops/sec ±3.45% (58 runs sampled)
      hermes x 24.15 ops/sec ±4.71% (44 runs sampled)
      meriyah x 91.36 ops/sec ±3.27% (67 runs sampled)
      kataw x 86.75 ops/sec ±2.78% (65 runs sampled)
      seafox x 79.40 ops/sec ±2.77% (69 runs sampled)
      cherow x 85.76 ops/sec ±2.68% (64 runs sampled)
      escaya x 81.44 ops/sec ±2.02% (70 runs sampled)
      tenko x 55.39 ops/sec ±2.80% (59 runs sampled)

    Parsing collection-view.js as a module with locations by...
      esprima x 1,368 ops/sec ±1.39% (92 runs sampled)
      acorn x 1,190 ops/sec ±0.95% (92 runs sampled)
      babel x 1,151 ops/sec ±0.88% (91 runs sampled)
      hermes x 426 ops/sec ±1.06% (87 runs sampled)
      meriyah x 2,206 ops/sec ±0.74% (90 runs sampled)
      kataw x 2,071 ops/sec ±1.26% (86 runs sampled)
      seafox x 2,057 ops/sec ±0.85% (90 runs sampled)
      cherow x 2,228 ops/sec ±0.84% (90 runs sampled)
      escaya x 2,171 ops/sec ±1.11% (85 runs sampled)
      tenko x 1,015 ops/sec ±1.09% (90 runs sampled)
      tree-sitter x 309 ops/sec ±1.31% (87 runs sampled)

The `hermes` parser always creates an AST with source code locations. They cannot be disabled to gain more performance.

The `tree-sitter` parser always creates an AST with source code locations. They cannot be disabled to gain more performance. It makes no difference between a script and a module either.

The `tree-sitter` parser failed witn an invalid argument when parsing `jquery.js`.

### Bun

    ❯ bun perf/script.js && bun perf/module.js && \
      bun perf/script --locations && node perf/module --locations

    Parsing jquery.js as a script by...
      esprima x 60.09 ops/sec ±1.71% (63 runs sampled)
      acorn x 68.57 ops/sec ±1.53% (71 runs sampled)
      babel x 44.51 ops/sec ±1.68% (58 runs sampled)
      hermes x 34.13 ops/sec ±1.99% (60 runs sampled)
      meriyah x 166 ops/sec ±1.38% (77 runs sampled)
      kataw x 108 ops/sec ±1.67% (72 runs sampled)
      seafox x 123 ops/sec ±2.14% (73 runs sampled)
      cherow x 126 ops/sec ±1.90% (72 runs sampled)
      escaya x 105 ops/sec ±1.94% (69 runs sampled)
      tenko x 56.54 ops/sec ±3.48% (60 runs sampled)

    Parsing collection-view.js as a module by...
      esprima x 1,034 ops/sec ±2.60% (89 runs sampled)
      acorn x 1,102 ops/sec ±1.26% (92 runs sampled)
      babel x 860 ops/sec ±3.69% (81 runs sampled)
      hermes x 572 ops/sec ±5.01% (92 runs sampled)
      meriyah x 2,681 ops/sec ±0.82% (92 runs sampled)
      kataw x 2,267 ops/sec ±0.83% (93 runs sampled)
      seafox x 2,353 ops/sec ±0.97% (91 runs sampled)
      cherow x 2,142 ops/sec ±1.29% (85 runs sampled)
      escaya x 2,117 ops/sec ±0.98% (91 runs sampled)
      tenko x 988 ops/sec ±1.21% (88 runs sampled)

    Parsing jquery.js as a script with locations by...
      esprima x 59.12 ops/sec ±1.38% (62 runs sampled)
      acorn x 62.63 ops/sec ±0.94% (66 runs sampled)
      babel x 43.48 ops/sec ±1.76% (58 runs sampled)
      hermes x 38.07 ops/sec ±1.76% (51 runs sampled)
      meriyah x 138 ops/sec ±1.70% (79 runs sampled)
      kataw x 119 ops/sec ±2.44% (77 runs sampled)
      seafox x 117 ops/sec ±1.80% (75 runs sampled)
      cherow x 113 ops/sec ±1.60% (74 runs sampled)
      escaya x 100 ops/sec ±1.56% (74 runs sampled)
      tenko x 60.35 ops/sec ±1.76% (63 runs sampled)

    Parsing collection-view.js as a module with locations by...
      esprima x 882 ops/sec ±4.56% (85 runs sampled)
      acorn x 985 ops/sec ±0.79% (91 runs sampled)
      babel x 861 ops/sec ±1.49% (87 runs sampled)
      hermes x 530 ops/sec ±5.70% (89 runs sampled)
      meriyah x 1,847 ops/sec ±1.86% (85 runs sampled)
      kataw x 1,795 ops/sec ±1.02% (83 runs sampled)
      seafox x 1,674 ops/sec ±0.89% (85 runs sampled)
      cherow x 1,491 ops/sec ±2.34% (82 runs sampled)
      escaya x 1,661 ops/sec ±1.53% (88 runs sampled)
      tenko x 908 ops/sec ±1.68% (87 runs sampled)

The `tree-sitter` parser uses native libraries and `node-gyp`, which doesn't run in Bun.

## Code Generating Speed

### Node.js

    ❯ node perf/generator && node perf/generator --source-map

    Generating code for an AST from jquery.js by...
      escodegen x 104 ops/sec ±0.92% (76 runs sampled)
      astring x 465 ops/sec ±0.84% (90 runs sampled)
      babel x 61.33 ops/sec ±0.80% (64 runs sampled)

    Generating code with source maps for an AST from jquery.js by...
      escodegen x 4.67 ops/sec ±2.16% (16 runs sampled)
      astring x 97.91 ops/sec ±2.25% (72 runs sampled)
      babel x 34.96 ops/sec ±3.29% (61 runs sampled)

### Bun

    ❯ bun perf/generator.js && bun perf/generator.js --source-map

    Generating code for an AST from jquery.js by...
      escodegen x 76.41 ops/sec ±2.72% (66 runs sampled)
      astring x 483 ops/sec ±2.03% (78 runs sampled)
      babel x 59.58 ops/sec ±0.89% (62 runs sampled)

    Generating code with source maps for an AST from jquery.js by...
      escodegen x 7.95 ops/sec ±1.87% (24 runs sampled)
      astring x 158 ops/sec ±1.18% (79 runs sampled)
      babel x 35.48 ops/sec ±1.20% (62 runs sampled)

## Exported Parser Size

    ❯ package-size esprima acorn @babel/parser hermes meriyah seafox kataw \
        cherow @azariasb/escaya tenko tree-sitter tree-sitter-javascript

    package                        size       minified   gzipped
    esprima@4.0.1                  278.47 KB  132.14 KB  28.59 KB
    acorn@8.12.1                   221.78 KB  113.71 KB  32.74 KB
    @babel/parser@7.24.8           476.68 KB  282.87 KB  73.59 KB
    hermes@0.4.4                   308.87 KB  53.94 KB   17.98 KB
    meriyah@4.3.0                  128.94 KB  127.33 KB  40.25 KB
    seafox@1.7.1                   95 KB      93.41 KB   25.57 KB
    kataw@0.0.81                   297.65 KB  291.29 KB  59.47 KB
    cherow@1.6.9                   300.63 KB  89.85 KB   25.12 KB
    @azariasb/escaya@0.0.63        98.24 KB   96.53 KB   25.97 KB
    tenko@2.0.1                    371.71 KB  142.41 KB  39.75 KB
    tree-sitter@0.20.0             51.28 KB   22.81 KB   6.8 KB
    tree-sitter-javascript@0.21.4  65.3 KB    40.06 KB   5.83 KB

Computing the package sizes may need `NODE_OPTIONS=--openssl-legacy-provider` depending on the state of `crypto` in your JavaScript VM. I had to keep `meriyah` and `tree-sitter` sizes from the previous update, because `package-size` wasn't able to compile their modern code.

The `tree-sitter` parser uses native libraries, which have to considered too, when computing the package size:

    ❯ node perf/tree-sitter-size.js

    tree-sitter:             395.30 KB
    tree-sitter-javascript:  389.42 KB

## Exported Code Generator Size

    ❯ package-size escodegen astring

    package          size       minified  gzipped
    escodegen@2.1.0  279.28 KB  97.02 KB  25.68 KB
    astring@1.8.6    36.07 KB   15.57 KB  4.32 KB

Estimating the size of `@babel/generator` failed with webpack compilation errors.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code.

## License

Copyright (c) 2022-2024 Ferdinand Prantl

Licensed under the MIT license.
