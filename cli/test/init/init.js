'use strict';

const expect = require('expect');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const Promise = require('bluebird')

describe('init command', () => {

  let init, defaultArgs, stubs;

  beforeEach(() => {
    defaultArgs = {
      serverUrl: 'http://localhost:8001'
    };

    stubs = {
      fs: {
        existsSync: sinon.stub()
      },
      inquirer: {
        prompt: sinon.stub()
      }
    }

    init = proxyquire('lib/init', stubs)
  })

  it('should not overwrite existing config without confirmation', () => {
    stubs.fs.existsSync.returns(true)
    stubs.inquirer.prompt.returns(Promise.resolve({
      overwrite: false
    }))

    return init(defaultArgs)
  })

});
