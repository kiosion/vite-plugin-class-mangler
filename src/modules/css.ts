import { cssPseudoSelectorRegex } from "../utils";
import { escapeClassName, removeCssPsuedoSelector } from "../utils";

export default function transformCSSFiles(
  code: string,
  classMapping: Map<string, string>
) {
  const cssClassNameRegex = /\.([a-z-0-9\?\\\[\]\/\(\)\.': ])*{/gi;

  let cssClassNames = code.match(cssClassNameRegex);

  if (!cssClassNames) {
    return { code };
  }

  cssClassNames = cssClassNames.map((className) => {
    // Remove . from the beginning and { from the end
    className = className.slice(1, -1);

    if (className.endsWith(" ")) {
      className = className.slice(0, -1);
    }
    return className;
  });

  cssClassNames
    .sort((a, b) => b.length - a.length)
    .forEach((className) => {
      const escapedClassName = escapeClassName(
        removeCssPsuedoSelector(className)
      );

      const normalClassName = removeCssPsuedoSelector(
        className.replace(/\\/gi, "")
      );

      if (classMapping.has(normalClassName)) {
        const regex = new RegExp(
          `\.${escapedClassName}(:?(${cssPseudoSelectorRegex})?[\(\\w\d\) ]*){`,
          "g"
        );
        code = code.replace(
          regex,
          "." + classMapping.get(normalClassName) + "$1{"
        );
      }
    });

  return {
    code,
    map: null,
  };
}

