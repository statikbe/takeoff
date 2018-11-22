'use strict';

import jQuery from 'jquery';

window.$ = jQuery;

window.app = window.app || {};
window.app.variables = window.app.variables || {};

require('./components/common');
require('./components/form');
require('./components/flyout');

require('../icons/iconfont.font');
