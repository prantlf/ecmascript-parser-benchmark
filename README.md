# ECMAScript Parser and Code Generator Benchmark

Compares the speed and package size of various ECMAScript parsers and code generators.

The new contender `meriyah` (well, it's been sever years already) runs 1.3x - 2.4x faster and is 1.6x smaller than the old bard `esprima`. Other fast parsers haven't been maintained for several years. Babel produces an AST, which is not compatible with the other parsers.

Generating code with `astring` is 5x - 19x faster than with `escodegen` and `astring` is 6.5x smaller.

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
      esprima x 88.56 ops/sec ±1.48% (76 runs sampled)
      acorn x 71.71 ops/sec ±1.30% (74 runs sampled)
      babel x 48.61 ops/sec ±2.48% (64 runs sampled)
      hermes x 27.28 ops/sec ±3.16% (50 runs sampled)
      meriyah x 115 ops/sec ±1.19% (73 runs sampled)
      kataw x 86.72 ops/sec ±2.37% (70 runs sampled)
      seafox x 106 ops/sec ±1.38% (78 runs sampled)
      cherow x 151 ops/sec ±1.97% (81 runs sampled)
      escaya x 90.78 ops/sec ±1.53% (73 runs sampled)
      tenko x 66.70 ops/sec ±2.06% (68 runs sampled)
      tree-sitter x 25.69 ops/sec ±1.41% (46 runs sampled)

    Parsing collection-view.js as a module by...
      esprima x 1,417 ops/sec ±0.96% (92 runs sampled)
      acorn x 1,313 ops/sec ±2.05% (90 runs sampled)
      babel x 1,250 ops/sec ±1.06% (93 runs sampled)
      hermes x 511 ops/sec ±0.82% (91 runs sampled)
      meriyah x 2,391 ops/sec ±0.71% (94 runs sampled)
      kataw x 2,222 ops/sec ±0.76% (91 runs sampled)
      seafox x 2,368 ops/sec ±0.85% (95 runs sampled)
      cherow x 2,765 ops/sec ±1.36% (92 runs sampled)
      escaya x 2,471 ops/sec ±1.09% (92 runs sampled)
      tenko x 1,185 ops/sec ±0.87% (92 runs sampled)
      tree-sitter x 399 ops/sec ±0.76% (88 runs sampled)

    Parsing jquery.js as a script with locations by...
      esprima x 54.46 ops/sec ±1.59% (63 runs sampled)
      acorn x 55.30 ops/sec ±2.48% (64 runs sampled)
      babel x 46.62 ops/sec ±2.44% (62 runs sampled)
      hermes x 27.98 ops/sec ±3.17% (51 runs sampled)
      meriyah x 101 ops/sec ±0.84% (74 runs sampled)
      kataw x 89.18 ops/sec ±1.92% (68 runs sampled)
      seafox x 94.25 ops/sec ±1.95% (70 runs sampled)
      cherow x 100 ops/sec ±1.30% (74 runs sampled)
      escaya x 84.42 ops/sec ±1.61% (71 runs sampled)
      tenko x 63.20 ops/sec ±2.18% (66 runs sampled)
      tree-sitter x 26.80 ops/sec ±1.12% (48 runs sampled)

    Parsing collection-view.js as a module with locations by...
      esprima x 1,346 ops/sec ±1.70% (92 runs sampled)
      acorn x 1,411 ops/sec ±0.51% (94 runs sampled)
      babel x 1,192 ops/sec ±1.19% (91 runs sampled)
      hermes x 518 ops/sec ±0.31% (93 runs sampled)
      meriyah x 2,054 ops/sec ±1.07% (92 runs sampled)
      kataw x 2,224 ops/sec ±1.54% (92 runs sampled)
      seafox x 2,159 ops/sec ±0.82% (93 runs sampled)
      cherow x 2,359 ops/sec ±0.66% (95 runs sampled)
      escaya x 2,298 ops/sec ±0.91% (91 runs sampled)
      tenko x 1,143 ops/sec ±0.91% (93 runs sampled)
      tree-sitter x 412 ops/sec ±0.55% (91 runs sampled)

The `hermes` parser always creates an AST with source code locations. They cannot be disabled to gain more performance.

The `tree-sitter` parser always creates an AST with source code locations. They cannot be disabled to gain more performance. It makes no difference between a script and a module either.

### Bun

    ❯ bun perf/script.js && bun perf/module.js && \
      bun perf/script --locations && node perf/module --locations

    Parsing jquery.js as a script by...
      esprima x 62.11 ops/sec ±2.65% (64 runs sampled)
      acorn x 76.15 ops/sec ±3.04% (69 runs sampled)
      babel x 45.45 ops/sec ±3.39% (60 runs sampled)
      hermes x 40.80 ops/sec ±2.08% (55 runs sampled)
      meriyah x 149 ops/sec ±2.20% (77 runs sampled)
      kataw x 122 ops/sec ±2.48% (73 runs sampled)
      seafox x 140 ops/sec ±1.86% (78 runs sampled)
      cherow x 156 ops/sec ±1.80% (80 runs sampled)
      escaya x 122 ops/sec ±1.68% (78 runs sampled)
      tenko x 82.51 ops/sec ±1.65% (71 runs sampled)

    Parsing collection-view.js as a module by...
      esprima x 1,226 ops/sec ±0.65% (92 runs sampled)
      acorn x 1,129 ops/sec ±2.14% (85 runs sampled)
      babel x 865 ops/sec ±3.60% (81 runs sampled)
      hermes x 548 ops/sec ±4.86% (88 runs sampled)
      meriyah x 2,219 ops/sec ±2.28% (89 runs sampled)
      kataw x 2,293 ops/sec ±1.62% (90 runs sampled)
      seafox x 2,255 ops/sec ±3.26% (82 runs sampled)
      cherow x 2,272 ops/sec ±4.31% (85 runs sampled)
      escaya x 2,178 ops/sec ±0.99% (92 runs sampled)
      tenko x 1,337 ops/sec ±1.32% (89 runs sampled)

    Parsing jquery.js as a script with locations by...
      esprima x 59.34 ops/sec ±3.47% (63 runs sampled)
      acorn x 65.42 ops/sec ±2.44% (68 runs sampled)
      babel x 42.77 ops/sec ±3.48% (57 runs sampled)
      hermes x 39.17 ops/sec ±4.18% (54 runs sampled)
      meriyah x 126 ops/sec ±2.47% (74 runs sampled)
      kataw x 122 ops/sec ±2.08% (78 runs sampled)
      seafox x 119 ops/sec ±2.08% (77 runs sampled)
      cherow x 136 ops/sec ±2.13% (77 runs sampled)
      escaya x 116 ops/sec ±1.92% (74 runs sampled)
      tenko x 77.95 ops/sec ±1.80% (68 runs sampled)

    Parsing collection-view.js as a module with locations by...
      esprima x 1,259 ops/sec ±1.14% (89 runs sampled)
      acorn x 1,226 ops/sec ±2.10% (85 runs sampled)
      babel x 1,212 ops/sec ±0.77% (92 runs sampled)
      hermes x 506 ops/sec ±1.06% (91 runs sampled)
      meriyah x 2,057 ops/sec ±0.83% (94 runs sampled)
      kataw x 2,234 ops/sec ±0.71% (90 runs sampled)
      seafox x 2,111 ops/sec ±1.67% (92 runs sampled)
      cherow x 2,359 ops/sec ±0.62% (93 runs sampled)
      escaya x 2,323 ops/sec ±0.98% (94 runs sampled)
      tenko x 1,137 ops/sec ±1.22% (91 runs sampled)
      tree-sitter x 397 ops/sec ±1.38% (88 runs sampled)

## Code Generating Speed

### Node.js

    ❯ node perf/generator && node perf/generator --source-map

    Generating code for an AST from jquery.js by...
      escodegen x 104 ops/sec ±0.49% (76 runs sampled)
      astring x 436 ops/sec ±1.21% (88 runs sampled)
      babel x 65.52 ops/sec ±0.88% (68 runs sampled)

    Generating code with source maps for an AST from jquery.js by...
      escodegen x 4.79 ops/sec ±2.38% (16 runs sampled)
      astring x 94.14 ops/sec ±3.21% (65 runs sampled)
      babel x 36.20 ops/sec ±1.11% (63 runs sampled)

### Bun

    ❯ bun perf/generator.js && bun perf/generator.js --source-map

    Generating code for an AST from jquery.js by...
      escodegen x 75.67 ops/sec ±1.17% (65 runs sampled)
      astring x 422 ops/sec ±2.29% (81 runs sampled)
      babel x 57.87 ops/sec ±1.17% (61 runs sampled)

    Generating code with source maps for an AST from jquery.js by...
      escodegen x 7.56 ops/sec ±2.29% (23 runs sampled)
      astring x 138 ops/sec ±1.39% (79 runs sampled)
      babel x 30.08 ops/sec ±5.61% (54 runs sampled)

## Exported Parser Size

    ❯ node perf/size esprima acorn @babel/parser hermes meriyah \
        seafox kataw  cherow @azariasb/escaya tenko

    package                   bundled     minified    gzipped    brotlied
    esprima@4.0.1             292.89 KB   135.35 KB   29.65 KB   24.05 KB
    acorn@8.15.0              195.09 KB   116.87 KB   33.27 KB   27.69 KB
    @babel/parser@7.28.4      553.56 KB   299.96 KB   77.24 KB   62.28 KB
    hermes@0.4.4               98.64 KB    33.55 KB   12.54 KB   11.33 KB
    meriyah@6.1.4             184.14 KB   136.75 KB   41.84 KB   35.74 KB
    seafox@1.7.1              135.25 KB    93.19 KB   26.89 KB   23.52 KB
    kataw@0.0.81              343.67 KB   256.92 KB   60.17 KB   49.76 KB
    cherow@1.6.9              205.31 KB    86.89 KB   25.23 KB   22.05 KB
    @azariasb/escaya@0.0.63   137.88 KB    96.11 KB   27.17 KB   23.62 KB
    tenko@2.0.1               400.35 KB   141.63 KB   41.28 KB   35.70 KB

The `tree-sitter` parser uses native libraries, which have to considered, when computing the package size:

    ❯ node perf/tree-sitter-size

    tree-sitter-javascript: 443.48 KB

## Exported Code Generator Size

    ❯ node perf/size escodegen astring

    package                   bundled     minified    gzipped    brotlied
    escodegen@2.1.0           201.17 KB    98.12 KB   26.92 KB   22.57 KB
    astring@1.9.0              31.08 KB    15.61 KB    4.43 KB    3.97 KB
    @babel/generator@7.28.3   740.37 KB   371.72 KB   79.82 KB   66.16 KB

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code.

## License

Copyright (c) 2022-2025 Ferdinand Prantl

Licensed under the MIT license.
