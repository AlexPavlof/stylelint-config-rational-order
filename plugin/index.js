import stylelint from 'stylelint';

import propertiesOrderRule from 'stylelint-order/rules/properties-order/index.js';

import configCreator from '../config/configCreator.js';

export const ruleName = 'plugin/rational-order';

export default stylelint.createPlugin(
  ruleName,
  (enabled, options, context) => (postcssRoot, postcssResult) => {
    const validOptions = stylelint.utils.validateOptions(
      postcssResult,
      ruleName,
      {
        actual: enabled,
        possible: [true, false],
      },
      {
        actual: options,
        optional: true,
        possible: {
          'border-in-box-model': [true, false],
          'empty-line-between-groups': [true, false],
        },
      },
    );
    if (!enabled || !validOptions) {
      return;
    }
    const expectation = configCreator(options);
    propertiesOrderRule(expectation, undefined, context)(postcssRoot, postcssResult);
  },
);
