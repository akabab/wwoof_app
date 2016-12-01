/* eslint-disable */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollLock = function (_Component) {
  _inherits(ScrollLock, _Component);

  function ScrollLock() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ScrollLock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScrollLock.__proto__ || Object.getPrototypeOf(ScrollLock)).call.apply(_ref, [this].concat(args))), _this), _this.onScrollHandler = function (e) {
      var elem = _this.scrollingElement;
      var scrollTop = elem.scrollTop;
      var scrollHeight = elem.scrollHeight;
      var clientHeight = elem.clientHeight;

      var wheelDelta = e.deltaY;
      var isDeltaPositive = wheelDelta > 0;

      if (isDeltaPositive && wheelDelta > scrollHeight - clientHeight - scrollTop) {
        elem.scrollTop = scrollHeight;
        return _this.cancelScrollEvent(e);
      } else if (!isDeltaPositive && -wheelDelta > scrollTop) {
        elem.scrollTop = 0;
        return _this.cancelScrollEvent(e);
      }
    }, _this.cancelScrollEvent = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      e.returnValue = false;
      return false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ScrollLock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollingElement.addEventListener('wheel', this.onScrollHandler, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.scrollingElement.removeEventListener('wheel', this.onScrollHandler, false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { ref: function ref(r) {
            return _this2.scrollingElement = r && r.firstChild;
          } },
        this.props.children
      );
    }
  }]);

  return ScrollLock;
}(_react.Component);

exports.default = ScrollLock;
//# sourceMappingURL=ScrollLock.js.map