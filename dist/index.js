"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var helper_module_imports_1 = require("@babel/helper-module-imports");
var Babel = __importStar(require("@babel/core"));
function generateExpression(path, oriValue, targetSdkVersion) {
    var t = Babel.types;
    return t.conditionalExpression(t.logicalExpression("&&", t.binaryExpression("===", t.memberExpression((0, helper_module_imports_1.addNamed)(path, "Platform", "react-native"), t.identifier("OS")), t.stringLiteral("android")), t.binaryExpression(">", t.memberExpression((0, helper_module_imports_1.addNamed)(path, "Platform", "react-native"), t.identifier("Version")), t.numericLiteral(targetSdkVersion !== null && targetSdkVersion !== void 0 ? targetSdkVersion : 30))), t.booleanLiteral(false), oriValue);
}
function default_1(_a, opt) {
    var t = _a.types;
    return {
        name: "babel-plugin-rn-disable-native-divider",
        visitor: {
            ObjectExpression: function (path) {
                path.node.properties.forEach(function (e, index) {
                    var _a;
                    if (((_a = e.key) === null || _a === void 0 ? void 0 : _a.name) === "useNativeDriver") {
                        path
                            .get("properties")[index].get("value")
                            .replaceWith(generateExpression(path, path.node.properties[index].value, opt.targetSdkVersion));
                    }
                });
            },
        },
    };
}
exports.default = default_1;
