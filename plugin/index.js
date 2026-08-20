import stylelint from 'stylelint';

import orderPlugins from 'stylelint-order';

import configCreator from '../config/configCreator.js';

export const ruleName = 'plugin/rational-order';

const propertiesOrderRuleName = 'order/properties-order';

// stylelint-order exposes only its package root, which default-exports the
// result of `createPlugin()` for each of its rules — i.e. `{ruleName, rule}`
// objects. Reaching the rule through that array keeps us on the public API;
// importing `stylelint-order/rules/properties-order/index.js` is blocked by
// the package's `exports` field since stylelint-order 7.
const { rule: propertiesOrderRule } = orderPlugins.find(
  orderPlugin => orderPlugin.ruleName === propertiesOrderRuleName,
);

const rule = (enabled, options, context) => (postcssRoot, postcssResult) => {
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

  // Warnings are reported under `order/properties-order`, but stylelint reads
  // `config.rules[thatName][1]` without an optional chain while deciding
  // whether a fix is disabled. Seed the key so `--fix` does not throw when the
  // plugin is used on its own, without the shareable config.
  const { config } = postcssResult.stylelint;
  if (config && config.rules && !(propertiesOrderRuleName in config.rules)) {
    config.rules[propertiesOrderRuleName] = [];
  }

  const expectation = configCreator(options);
  propertiesOrderRule(expectation, undefined, context)(postcssRoot, postcssResult);
};

rule.ruleName = ruleName;
rule.meta = {
  fixable: true,
  url: 'https://github.com/AlexPavlof/stylelint-config-rational-order',
};

export default stylelint.createPlugin(ruleName, rule);
