'use strict';

import jQuery from 'jquery';

window.$ = jQuery;

window.app = window.app || {};
window.app.variables = window.app.variables || {};

require('./components/common');
require('./components/form');
require('./components/flyout');

//  Icon font generation - do not remove
require('../icons/iconfont.font');
