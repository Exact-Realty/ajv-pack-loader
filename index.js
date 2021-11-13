'use strict';
const Ajv = require('ajv');
const pack = require('ajv/dist/standalone').default;
const loaderUtils = require('loader-utils');

module.exports = function(source, sourceMap) {
    this.cacheable();

    const query = Object.assign({}, loaderUtils.getOptions(this));
    query.code = Object.assign(query.code || {}, { source: true });

    const callback = this.async();
    const ajv = new Ajv(query);
    const schema = ajv.compile(JSON.parse(source));

    callback(
        null,
        pack(
            ajv,
            schema
        ),
        sourceMap
    );
};
