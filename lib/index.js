// Generated by CoffeeScript 1.8.0
(function() {
  var Teambition, exports, http, https, qs;

  http = require('http');

  https = require('https');

  qs = require('querystring');

  Teambition = (function() {
    Teambition.prototype.port = 443;

    Teambition.prototype.host = 'api.teambition.com';

    function Teambition(token, host, port) {
      this.token = token;
      if (port) {
        this.port = port;
      }
      if (host) {
        this.host = host;
      }
      this.protocol = this.port === 443 ? https : http;
    }

    Teambition.prototype.invokeGeneric = function(method, apiURL, params, callback) {
      var options, postData, req;
      if (typeof params === 'function') {
        callback = params;
        params = {};
      }
      params || (params = {});
      options = {
        host: this.host,
        port: this.port,
        path: apiURL,
        method: method,
        headers: {
          "Authorization": "OAuth2 " + this.token
        }
      };
      if (method.toLowerCase() === 'get') {
        options.path += "?" + qs.stringify(params);
      } else {
        postData = JSON.stringify(params);
        options.headers["Content-Type"] = "application/json";
        options.headers["Content-Length"] = postData.length;
      }
      req = this.protocol.request(options, function(res) {
        var data;
        res.setEncoding('utf8');
        data = "";
        res.on('data', function(part) {
          return data += part;
        });
        return res.on("end", function() {
          if (res.statusCode !== 200) {
            return callback(data);
          } else {
            return callback(null, JSON.parse(data));
          }
        });
      });
      if (method.toLowerCase() !== 'get') {
        req.write(postData);
      }
      req.end();
      return req.on('error', function(e) {
        throw e;
      });
    };

    Teambition.prototype.api = function(apiURL, params, callback) {
      return this.invokeGeneric('GET', apiURL, params, callback);
    };

    Teambition.prototype.get = function() {
      return this.api.apply(this, arguments);
    };

    Teambition.prototype.post = function(apiURL, params, callback) {
      return this.invokeGeneric('POST', apiURL, params, callback);
    };

    Teambition.prototype.put = function(apiURL, params, callback) {
      return this.invokeGeneric('PUT', apiURL, params, callback);
    };

    Teambition.prototype.del = function(apiURL, params, callback) {
      return this.invokeGeneric('DELETE', apiURL, params, callback);
    };

    return Teambition;

  })();

  exports = module.exports = Teambition;

}).call(this);