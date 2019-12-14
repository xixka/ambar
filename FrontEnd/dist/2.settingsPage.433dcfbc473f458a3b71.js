webpackJsonp([2],{

/***/ 871:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.folderHitsModel = exports.crawlersModel = exports.hitsModel = undefined;
	
	var _hitsModel = __webpack_require__(872);
	
	var hitsModel = _interopRequireWildcard(_hitsModel);
	
	var _crawlersModel = __webpack_require__(882);
	
	var crawlersModel = _interopRequireWildcard(_crawlersModel);
	
	var _folderHitsModel = __webpack_require__(885);
	
	var folderHitsModel = _interopRequireWildcard(_folderHitsModel);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.hitsModel = hitsModel;
	exports.crawlersModel = crawlersModel;
	exports.folderHitsModel = folderHitsModel;

/***/ }),

/***/ 872:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.updateHits = exports.getHit = exports.contentHighlightFromApi = exports.fromApi = undefined;
	
	var _extends2 = __webpack_require__(291);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _map = __webpack_require__(873);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _moment = __webpack_require__(468);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _utils = __webpack_require__(457);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var fromApi = exports.fromApi = function fromApi(resp) {
	    var hits = new _map2.default();
	    resp.hits.forEach(function (hit) {
	        hits.set(hit.file_id, (0, _extends3.default)({}, hit, {
	            fetching: false
	        }));
	    });
	    return hits;
	};
	
	var contentHighlightFromApi = exports.contentHighlightFromApi = function contentHighlightFromApi(resp) {
	    return resp.highlight;
	};
	
	var getHit = exports.getHit = function getHit(state, fileId) {
	    var hit = state.hits.get(fileId);
	    return hit;
	};
	
	var updateHits = exports.updateHits = function updateHits(state, fileId, hit) {
	    var newState = (0, _extends3.default)({}, state, { hits: new _map2.default(state.hits) });
	    newState.hits.set(fileId, hit);
	    return newState;
	};

/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(874), __esModule: true };

/***/ }),

/***/ 874:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(371);
	__webpack_require__(345);
	__webpack_require__(356);
	__webpack_require__(875);
	__webpack_require__(877);
	__webpack_require__(880);
	__webpack_require__(881);
	module.exports = __webpack_require__(297).Map;


/***/ }),

/***/ 875:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(876);
	var validate = __webpack_require__(619);
	var MAP = 'Map';
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(620)(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong.getEntry(validate(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, strong, true);


/***/ }),

/***/ 876:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var dP = __webpack_require__(301).f;
	var create = __webpack_require__(351);
	var redefineAll = __webpack_require__(616);
	var ctx = __webpack_require__(298);
	var anInstance = __webpack_require__(617);
	var forOf = __webpack_require__(618);
	var $iterDefine = __webpack_require__(347);
	var step = __webpack_require__(359);
	var setSpecies = __webpack_require__(639);
	var DESCRIPTORS = __webpack_require__(305);
	var fastKey = __webpack_require__(364).fastKey;
	var validate = __webpack_require__(619);
	var SIZE = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = validate(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        validate(this, NAME);
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(validate(this, NAME), key);
	      }
	    });
	    if (DESCRIPTORS) dP(C.prototype, 'size', {
	      get: function () {
	        return validate(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = validate(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};


/***/ }),

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(295);
	
	$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(878)('Map') });


/***/ }),

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(400);
	var from = __webpack_require__(879);
	module.exports = function (NAME) {
	  return function toJSON() {
	    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};


/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(618);
	
	module.exports = function (iter, ITERATOR) {
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ }),

/***/ 880:
/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
	__webpack_require__(622)('Map');


/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
	__webpack_require__(624)('Map');


/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fromApiSingle = exports.fromApi = undefined;
	
	var _map = __webpack_require__(873);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _extends2 = __webpack_require__(291);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _stringify = __webpack_require__(883);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _moment = __webpack_require__(468);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _utils = __webpack_require__(457);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getCawlerJson = function getCawlerJson(crawler) {
	    return (0, _stringify2.default)((0, _extends3.default)({}, crawler), null, 2);
	};
	
	var parseCrawlerFromApi = function parseCrawlerFromApi(apiResp) {
	    return {
	        settings: (0, _extends3.default)({}, apiResp),
	        meta: {
	            fetching: false,
	            state: apiResp.state,
	            json: getCawlerJson(apiResp)
	        },
	        log: {
	            fetching: false,
	            records: []
	        },
	        displayArgs: {
	            isSettingsModalOpen: false
	        }
	    };
	};
	
	var fromApi = exports.fromApi = function fromApi(resp) {
	    var crawlers = new _map2.default();
	    resp.map(function (crawlerFromApi) {
	        var crawler = parseCrawlerFromApi(crawlerFromApi);
	        crawlers.set(crawler.settings.id, crawler);
	    });
	    return crawlers;
	};
	
	var fromApiSingle = exports.fromApiSingle = function fromApiSingle(resp) {
	    return parseCrawlerFromApi(resp);
	};

/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(884), __esModule: true };

/***/ }),

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(297);
	var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
	module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};


/***/ }),

/***/ 885:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fromApi = undefined;
	
	var _moment = __webpack_require__(468);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _utils = __webpack_require__(457);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var fromApi = exports.fromApi = function fromApi(resp) {
	    var transformModelToView = function transformModelToView(hit) {
	        return {
	            path: hit.path,
	            name: hit.name,
	            type: hit.type,
	            childNodes: hit.children.map(function (child) {
	                return transformModelToView(child);
	            }),
	            hitsCount: hit.hits_count,
	            isExpanded: false,
	            depth: hit.depth,
	            parentPath: hit.parent_path,
	            thumbAvailable: hit.thumb_available,
	            contentType: hit.content_type,
	            sha256: hit.sha256,
	            fileId: hit.file_id
	        };
	    };
	
	    return resp.tree.map(function (node) {
	        return transformModelToView(node);
	    });
	};

/***/ }),

/***/ 1502:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(382);
	
	var _utils = __webpack_require__(457);
	
	var _SettingsPage = __webpack_require__(1503);
	
	var _Settings = __webpack_require__(1504);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapDispatchToProps = {
	  loadPipelineLog: _SettingsPage.loadPipelineLog,
	  setSettingsModalOpen: _SettingsPage.setSettingsModalOpen
	};
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    fetching: state['global'].fetching,
	    pipeline: state['settingsPage'].pipeline,
	    localization: _utils.stateValueExtractor.getLocalization(state)
	  };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Settings2.default);

/***/ }),

/***/ 1503:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.loadPipelineLog = undefined;
	
	var _defineProperty2 = __webpack_require__(626);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _map = __webpack_require__(873);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _extends2 = __webpack_require__(291);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _ACTION_HANDLERS;
	
	exports.default = settingsPageReducer;
	
	var _utils = __webpack_require__(457);
	
	var _models = __webpack_require__(871);
	
	var _CoreLayout = __webpack_require__(627);
	
	var _MainLayout = __webpack_require__(625);
	
	__webpack_require__(598);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var UPDATE_CRAWLER = 'SETTINGS.UPDATE_CRAWLER';
	var FILL_CRAWLERS = 'SETTINGS.FILL_CRAWLERS';
	var UPDATE_NEW_CRAWLER = 'SETTINGS.UPDATE_NEW_CRAWLER';
	var UPDATE_PIPELINE = 'SETTINGS.UPDATE_PIPELINE';
	
	var REQUEST_SIZE = 10;
	var PIPELINE_LOG_SIZE = 30;
	
	var loadPipelineLog = exports.loadPipelineLog = function loadPipelineLog(pipeline) {
	    return function (dispatch, getState) {
	        var urls = _utils.stateValueExtractor.getUrls(getState());
	        var defaultSettings = _utils.stateValueExtractor.getDefaultSettings(getState());
	
	        dispatch((0, _MainLayout.stopLoadingIndicator)());
	
	        fetch(urls.ambarWebApiGetLogs(PIPELINE_LOG_SIZE), (0, _extends3.default)({
	            method: 'GET'
	        }, defaultSettings)).then(function (resp) {
	            if (resp.status == 200) {
	                return resp.json();
	            } else {
	                throw resp;
	            }
	        }).then(function (data) {
	            dispatch(updatePipeline((0, _extends3.default)({}, pipeline, { log: { records: data } })));
	        }).catch(function (errorPayload) {
	            dispatch(updatePipeline((0, _extends3.default)({}, pipeline, { log: (0, _extends3.default)({}, pipeline.log) })));
	            console.error('loadPipelineLog', errorPayload);
	        });
	    };
	};
	
	var fillCrawlers = function fillCrawlers(crawlers) {
	    return {
	        type: FILL_CRAWLERS,
	        crawlers: crawlers
	    };
	};
	
	var updateCrawler = function updateCrawler(crawler) {
	    return {
	        type: UPDATE_CRAWLER,
	        crawler: crawler
	    };
	};
	
	var updatePipeline = function updatePipeline(pipeline) {
	    return {
	        type: UPDATE_PIPELINE,
	        pipeline: pipeline
	    };
	};
	
	var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, (0, _defineProperty3.default)(_ACTION_HANDLERS, FILL_CRAWLERS, function (state, action) {
	    var newState = (0, _extends3.default)({}, state);
	    newState.crawlers = action.crawlers;
	    return newState;
	}), (0, _defineProperty3.default)(_ACTION_HANDLERS, UPDATE_CRAWLER, function (state, action) {
	    var newState = (0, _extends3.default)({}, state);
	    newState.crawlers = new _map2.default(state.crawlers);
	    newState.crawlers.set(action.crawler.settings.id, action.crawler);
	    return newState;
	}), (0, _defineProperty3.default)(_ACTION_HANDLERS, UPDATE_PIPELINE, function (state, action) {
	    return (0, _extends3.default)({}, state, { pipeline: action.pipeline });
	}), _ACTION_HANDLERS);
	
	var initialState = {
	    crawlers: new _map2.default(),
	    pipeline: { log: { records: [] } }
	};
	
	function settingsPageReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];
	
	    var handler = ACTION_HANDLERS[action.type];
	    return handler ? handler(state, action) : state;
	}

/***/ }),

/***/ 1504:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Settings = __webpack_require__(1505);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _Settings2.default;

/***/ }),

/***/ 1505:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(331);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(336);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(337);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(341);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(374);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PipelineCard = __webpack_require__(1506);
	
	var _PipelineCard2 = _interopRequireDefault(_PipelineCard);
	
	var _Settings = __webpack_require__(1514);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Settings = function (_Component) {
	    (0, _inherits3.default)(Settings, _Component);
	
	    function Settings() {
	        (0, _classCallCheck3.default)(this, Settings);
	        return (0, _possibleConstructorReturn3.default)(this, (Settings.__proto__ || (0, _getPrototypeOf2.default)(Settings)).apply(this, arguments));
	    }
	
	    (0, _createClass3.default)(Settings, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _props = this.props,
	                loadPipelineLog = _props.loadPipelineLog,
	                pipeline = _props.pipeline,
	                setPageTitle = _props.setPageTitle,
	                setAppHeader = _props.setAppHeader,
	                localization = _props.localization;
	
	
	            setPageTitle(localization.settingsPage.pageTitle);
	            setAppHeader({ left: function left() {
	                    return localization.settingsPage.pageTitle;
	                } });
	            loadPipelineLog(pipeline);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props2 = this.props,
	                fetching = _props2.fetching,
	                crawlers = _props2.crawlers,
	                startStopCrawler = _props2.startStopCrawler,
	                setSettingsModalOpen = _props2.setSettingsModalOpen,
	                refreshCrawler = _props2.refreshCrawler,
	                pipeline = _props2.pipeline,
	                loadPipelineLog = _props2.loadPipelineLog,
	                localization = _props2.localization;
	
	
	            return _react2.default.createElement(
	                'div',
	                { className: 'pageContainer' },
	                !fetching && _react2.default.createElement(_PipelineCard2.default, {
	                    pipeline: pipeline,
	                    loadPipelineLog: loadPipelineLog,
	                    localization: localization
	                })
	            );
	        }
	    }]);
	    return Settings;
	}(_react.Component);
	
	Settings.propTypes = {
	    fetching: _react2.default.PropTypes.bool.isRequired,
	    pipeline: _react2.default.PropTypes.object.isRequired,
	    loadPipelineLog: _react2.default.PropTypes.func.isRequired,
	    setPageTitle: _react2.default.PropTypes.func.isRequired,
	    localization: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = Settings;

/***/ }),

/***/ 1506:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _PipelineCard = __webpack_require__(1507);
	
	var _PipelineCard2 = _interopRequireDefault(_PipelineCard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _PipelineCard2.default;

/***/ }),

/***/ 1507:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(331);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(336);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(337);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(341);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(374);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Card = __webpack_require__(776);
	
	var _Paper = __webpack_require__(704);
	
	var _Paper2 = _interopRequireDefault(_Paper);
	
	var _LogView = __webpack_require__(1508);
	
	var _LogView2 = _interopRequireDefault(_LogView);
	
	var _PipelineCard = __webpack_require__(1512);
	
	var _PipelineCard2 = _interopRequireDefault(_PipelineCard);
	
	var _Settings = __webpack_require__(1514);
	
	var _Settings2 = _interopRequireDefault(_Settings);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PipelineCard = function (_Component) {
	    (0, _inherits3.default)(PipelineCard, _Component);
	
	    function PipelineCard() {
	        (0, _classCallCheck3.default)(this, PipelineCard);
	        return (0, _possibleConstructorReturn3.default)(this, (PipelineCard.__proto__ || (0, _getPrototypeOf2.default)(PipelineCard)).apply(this, arguments));
	    }
	
	    (0, _createClass3.default)(PipelineCard, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _props = this.props,
	                pipeline = _props.pipeline,
	                loadPipelineLog = _props.loadPipelineLog;
	
	            this.updateDescriptor = setInterval(function () {
	                return loadPipelineLog(pipeline);
	            }, 3 * 1000);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            clearInterval(this.updateDescriptor);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props2 = this.props,
	                log = _props2.pipeline.log,
	                localization = _props2.localization;
	
	
	            return _react2.default.createElement(
	                _Paper2.default,
	                { zDepth: 1, className: _Settings2.default.settingsCard },
	                _react2.default.createElement(
	                    _Card.Card,
	                    null,
	                    _react2.default.createElement(_Card.CardTitle, {
	                        title: localization.settingsPage.pipelineLabel,
	                        subtitle: localization.settingsPage.pipelineDescriptionLabel,
	                        actAsExpander: false,
	                        showExpandableButton: false
	                    }),
	                    _react2.default.createElement(
	                        _Card.CardText,
	                        { expandable: false },
	                        _react2.default.createElement(_LogView2.default, { log: log, style: { height: '630px' } })
	                    )
	                )
	            );
	        }
	    }]);
	    return PipelineCard;
	}(_react.Component);
	
	PipelineCard.propTypes = {
	    pipeline: _react2.default.PropTypes.object.isRequired,
	    loadPipelineLog: _react2.default.PropTypes.func.isRequired
	};
	
	exports.default = PipelineCard;

/***/ }),

/***/ 1508:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _LogView = __webpack_require__(1509);
	
	var _LogView2 = _interopRequireDefault(_LogView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _LogView2.default;

/***/ }),

/***/ 1509:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _LogView = __webpack_require__(1510);
	
	var _LogView2 = _interopRequireDefault(_LogView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var red600 = '#E53935';
	var lightGreen600 = '#7CB342';
	var lime600 = '#C0CA33';
	
	var LogView = function LogView(_ref) {
	    var log = _ref.log,
	        style = _ref.style;
	    return _react2.default.createElement(
	        'div',
	        { className: _LogView2.default.logFrame, style: style },
	        log.records.map(function (record, idx) {
	            var logRecordColor = record.type === 'info' ? lime600 : record.type === 'error' ? red600 : lightGreen600;
	
	            return _react2.default.createElement(
	                'p',
	                { key: idx, style: { color: logRecordColor, lineHeight: '20px' } },
	                record.created_datetime,
	                ': [',
	                record.source_id,
	                '] [',
	                record.type,
	                '] ',
	                record.message
	            );
	        }),
	        _react2.default.createElement(
	            'p',
	            null,
	            _react2.default.createElement(
	                'span',
	                { className: 'blink' },
	                '.'
	            )
	        )
	    );
	};
	
	LogView.propTypes = {
	    log: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = LogView;

/***/ }),

/***/ 1510:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(1511);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(720)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(1511, function() {
				var newContent = __webpack_require__(1511);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 1511:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(719)();
	// imports
	
	
	// module
	exports.push([module.id, ".LogView__logFrame___cM_8L{background-color:#263238;font-weight:700;font-family:Courier New,monospace;margin-left:-16px;margin-right:-16px;padding:7px;height:230px;overflow-y:hidden;overflow-x:hidden;text-overflow:ellipsis;white-space:nowrap}.LogView__logFrame___cM_8L p{margin:0}.blink{animation:blinker .5s linear infinite;color:#7cb342}@keyframes blinker{50%{opacity:0}}", "", {"version":3,"sources":["/./src/components/Settings/components/LogView/src/components/Settings/components/LogView/LogView.scss"],"names":[],"mappings":"AAAA,2BACI,yBAA0B,gBACT,kCACqB,kBACnB,mBACC,YACP,aACC,kBACK,kBACA,uBACK,kBACJ,CAXxB,6BAcQ,QACH,CAAC,OAOD,sCAAwC,aACzB,CAChB,mBAGA,IAAM,SAAW,CAAA,CAAA","file":"LogView.scss","sourcesContent":[".logFrame {\n    background-color: #263238;\n    font-weight: 700;\n    font-family: \"Courier New\", monospace;\n    margin-left: -16px;\n    margin-right: -16px;\n    padding: 7px;\n    height: 230px;\n    overflow-y: hidden;\n    overflow-x: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n\n    p {\n        margin: 0\n    }\n}\n\n\n\n:global {\n   .blink {\n     animation: blinker 0.5s linear infinite;\n     color: #7CB342;\n   }    \n\n   @keyframes :global(blinker) {  \n    50% { opacity: 0; }\n}\n}\n\n\n"],"sourceRoot":"webpack://"}]);
	
	// exports
	exports.locals = {
		"logFrame": "LogView__logFrame___cM_8L"
	};

/***/ }),

/***/ 1512:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(1513);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(720)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(1513, function() {
				var newContent = __webpack_require__(1513);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 1513:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(719)();
	// imports
	
	
	// module
	exports.push([module.id, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"PipelineCard.scss","sourceRoot":"webpack://"}]);
	
	// exports


/***/ }),

/***/ 1514:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(1515);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(720)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(1515, function() {
				var newContent = __webpack_require__(1515);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 1515:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(719)();
	// imports
	
	
	// module
	exports.push([module.id, ".Settings__settingsCard___qYfao{margin:10px}", "", {"version":3,"sources":["/./src/components/Settings/src/components/Settings/Settings.scss"],"names":[],"mappings":"AAAA,gCACI,WAAa,CAChB","file":"Settings.scss","sourcesContent":[".settingsCard {    \n    margin: 10px;\n}"],"sourceRoot":"webpack://"}]);
	
	// exports
	exports.locals = {
		"settingsCard": "Settings__settingsCard___qYfao"
	};

/***/ })

});
//# sourceMappingURL=2.settingsPage.433dcfbc473f458a3b71.js.map