'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _reactTransformHmr2 = require('react-transform-hmr');

var _reactTransformHmr3 = _interopRequireDefault(_reactTransformHmr2);

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _components = {
	_$SavingLabel: {
		displayName: 'SavingLabel'
	}
};

var _reactComponentWrapper = (0, _reactTransformCatchErrors3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/SavingLabel/SavingLabel.js',
	components: _components,
	locals: [module],
	imports: [_react, _redboxReact]
});

var _reactComponentWrapper2 = (0, _reactTransformHmr3['default'])({
	filename: '/Users/brennanerbeznik/Dropbox/FrontEnd/app/components/CreateSet/SavingLabel/SavingLabel.js',
	components: _components,
	locals: [module],
	imports: [_react]
});

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return _reactComponentWrapper2(_reactComponentWrapper(ReactClass, uniqueId), uniqueId);
	};
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SavingLabel = (function (_Component) {
	_inherits(SavingLabel, _Component);

	function SavingLabel() {
		_classCallCheck(this, _SavingLabel);

		_get(Object.getPrototypeOf(_SavingLabel.prototype), 'constructor', this).apply(this, arguments);

		this.state = {
			message: ''
		};
	}

	_createClass(SavingLabel, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (this.props.set == null) this.setState({ message: 'Draft' });
			if (this.props.set !== null) {
				this.setState({ message: 'Created ' + _moment2['default'].utc(this.props.set.creation).fromNow() });
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this = this;

			if (nextProps.isCreatingSet || nextProps.isUpdatingSet || nextProps.isCreatingItem) {
				this.setState({
					message: 'Saving...'
				});
				setTimeout(function () {
					_this.setState({
						message: _this.props.set == null ? 'Draft' : 'Saved'
					});
				}, 500);
				return;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'saving_label' },
				_react2['default'].createElement(
					'div',
					{ className: 'saving_message' },
					this.state.message
				)
			);
		}
	}], [{
		key: 'propTypes',
		value: {},
		enumerable: true
	}]);

	var _SavingLabel = SavingLabel;
	SavingLabel = _wrapComponent('_$SavingLabel')(SavingLabel) || SavingLabel;
	return SavingLabel;
})(_react.Component);

exports['default'] = SavingLabel;
module.exports = exports['default'];

//# sourceMappingURL=SavingLabel-compiled.js.map