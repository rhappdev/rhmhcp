/**
 * RHMHCP
 * Red Hat Mobile Hot Code Push API
 *
 * OpenAPI spec version: 0.1.0
 * Contact: kxiang@redhat.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.2.3
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.Rhmhcp) {
      root.Rhmhcp = {};
    }
    root.Rhmhcp.ProjectDeploymentTarget = factory(root.Rhmhcp.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ProjectDeploymentTarget model module.
   * @module model/ProjectDeploymentTarget
   * @version 0.1.0
   */

  /**
   * Constructs a new <code>ProjectDeploymentTarget</code>.
   * Deployment target configuration
   * @alias module:model/ProjectDeploymentTarget
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ProjectDeploymentTarget</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProjectDeploymentTarget} obj Optional instance to populate.
   * @return {module:model/ProjectDeploymentTarget} The populated <code>ProjectDeploymentTarget</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('uri')) {
        obj['uri'] = ApiClient.convertToType(data['uri'], 'String');
      }
      if (data.hasOwnProperty('params')) {
        obj['params'] = ApiClient.convertToType(data['params'], Object);
      }
    }
    return obj;
  }

  /**
   * Place to retrieve app code
   * @member {String} uri
   */
  exports.prototype['uri'] = undefined;
  /**
   * Parameters
   * @member {Object} params
   */
  exports.prototype['params'] = undefined;



  return exports;
}));

