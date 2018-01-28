"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var ActionTypes;
(function (ActionTypes) {
    ActionTypes["Add"] = "add";
    ActionTypes["Subtract"] = "subtract";
})(ActionTypes || (ActionTypes = {}));
function ofType() {
    var types = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        types[_i] = arguments[_i];
    }
    return function (source) {
        return source.pipe(operators_1.filter(function (action) { return types.indexOf(action.type) !== -1; }));
    };
}
function getAddActions(source) {
    return source.pipe(ofType(ActionTypes.Add));
}
