import path from 'path';

import { fileURLToPath } from 'url';
import specialProps from '../groups/special.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const extendedConfig = ({
  'border-in-box-model': borderInBoxModel = false,
  'empty-line-between-groups': emptyLineBetweenGroups = false,
} = {}) => ({
  plugins: ['stylelint-order', path.join(__dirname, '../plugin')],
  rules: {
    'order/properties-order': [],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: specialProps,
      },
    ],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': borderInBoxModel,
        'empty-line-between-groups': emptyLineBetweenGroups,
      },
    ],
  },
});

export default extendedConfig;
