import { addNamed } from "@babel/helper-module-imports";
import type { PluginObj, PluginPass } from "@babel/core";
import * as Babel from "@babel/core";

function generateExpression(path, oriValue, targetSdkVersion) {
  // RNPlatform.OS === 'android' && RNPlatform.Version > 30 ? false : true
  const t = Babel.types;
  return t.conditionalExpression(
    t.logicalExpression(
      "&&",
      t.binaryExpression(
        "===",
        t.memberExpression(
          addNamed(path, "Platform", "react-native"),
          t.identifier("OS")
        ),
        t.stringLiteral("android")
      ),
      t.binaryExpression(
        ">",
        t.memberExpression(
          addNamed(path, "Platform", "react-native"),
          t.identifier("Version")
        ),
        t.numericLiteral(targetSdkVersion ?? 30)
      )
    ),
    t.booleanLiteral(false),
    oriValue
  );
}

export default function (
  { types: t }: typeof Babel,
  opt: {
    targetSdkVersion?: number;
  }
): PluginObj<PluginPass> {
  return {
    name: "babel-plugin-rn-disable-native-divider",
    visitor: {
      ObjectExpression(path) {
        path.node.properties.forEach((e, index) => {
          if (e.key?.name === "useNativeDriver") {
            path
              .get("properties")
              [index].get("value")
              .replaceWith(
                generateExpression(
                  path,
                  path.node.properties[index].value,
                  opt.targetSdkVersion
                )
              );
          }
        });
      },
    },
  };
}
