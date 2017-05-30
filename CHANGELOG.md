# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.4.3] - 2017-05-30
### Fixed
- Components where no longer concatenated and uglified to main.min.js

## [1.4.2] - 2017-05-12
### Updated
- Social icons
- Gallery component

### Added
- Download icon

## [1.4.1] - 2017-04-25
### Changed
- package.json: updated the version to the one corresponding in the changelog file
- package.json: removed grunt as a dependency (it already was a dev dependency, which was throwing warnings when running grunt)
- package.json: added a script to package.json so we can use yarn/npm to run our build ('yarn run build').

## [1.4.0] - 2017-04-24
### Changed
- Added babel to the default buildtasks in order to be able to start to use ES6 functionality for new projects today

## [1.3.0] - 2017-04-26
### Changed
- Flyout.scss: Full refactor new animations, new styling
### Added
- Scaffold.scss: Added class .clearfix
### Removed
- mixins/_type.scss: Removed hide-text
