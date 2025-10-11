# [1.0.0](https://github.com/prantlf/ecmascript-parser-benchmark/compare/v0.4.0...v1.0.0) (2025-10-11)

## Features

* Upgrade parsers and tools ([617c673](https://github.com/prantlf/ecmascript-parser-benchmark/commit/617c67382e838050713948b4170d27283f32d305))

## BREAKING CHANGES

Sizes are computed differently by package-cost,
which tries to build an application with the dependency to be able
to measure all bundles files, sucluding sub-dependencies. The new
computed sizes may differ, but generally they should correlate
with the earlier results.

# [0.4.0](https://github.com/prantlf/ecmascript-parser-benchmark/compare/v0.3.0...v0.4.0) (2025-10-11)

## Features

* Test with Bun too ([1600f75](https://github.com/prantlf/ecmascript-parser-benchmark/commit/1600f75a7caf09651e98dfd3188c8852df0b96b9))

## Bug Fixes

* Upgrade parsers ([cb46dd4](https://github.com/prantlf/ecmascript-parser-benchmark/commit/cb46dd4e4e0be58a3aaf02ae5db151e3ee4ced4f))
* Measure sizes of native libraries in tree-sitter ([f2c98bf](https://github.com/prantlf/ecmascript-parser-benchmark/commit/f2c98bfde99828fa166a4e2ee8495c8c5454223e))

# [0.3.0](https://github.com/prantlf/ecmascript-parser-benchmark/compare/v0.2.0...v0.3.0) (2022-09-10)


### Bug Fixes

* Upgrade parsers ([271f465](https://github.com/prantlf/ecmascript-parser-benchmark/commit/271f465e6eb10384995349946b69d0c5b8622233))


### Features

* Add tree-sitter parser ([47ec6bc](https://github.com/prantlf/ecmascript-parser-benchmark/commit/47ec6bc9087c7290122e42de1d14501ef8a183ec))



## 0.2.0

* Add a new parser - `hermes-parser`.
* Upgrade dependencies.

## 0.1.0

* Add a new parser - `cherow`.
* Add tests including the source code locations in the AST.
* Add tests of code generators.

## 0.0.1

Initial release showing script and module parsing speeds and package sizes.
