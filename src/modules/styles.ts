import { cssPseudoRegex, escapeClassName, removeCssPsuedoSelector } from '../utils';

export default function transformStyles(code: string, classMapping: Map<string, string>) {
  const cssClassNameRegex = /\.([a-z-0-9?\\[\]/().':\-_ ])*{/gi;

  let cssClassNames = code.match(cssClassNameRegex);

  if (!cssClassNames) {
    return { code };
  }

  cssClassNames = cssClassNames.map((className) => {
    // Remove . from the beginning and { from the end
    className = className.slice(1, -1);

    if (className.endsWith(' ')) {
      className = className.slice(0, -1);
    }
    return className;
  });

  cssClassNames
    .sort((a, b) => b.length - a.length)
    .forEach((className) => {
      const classNameSplit = className.split('.');
      let classNames = [];

      classNameSplit.forEach((classNamePart) => {
        classNames = [
          ...classNames,
          {
            raw: classNamePart,
            normal: removeCssPsuedoSelector(classNamePart),
            escaped: escapeClassName(removeCssPsuedoSelector(classNamePart))
          }
        ];
      });

      classNames.forEach((className) => {
        if (classMapping.has(className.normal)) {
          // Regex to match either being first, middle, or last in css selector (including pseudo selectors and comma)
          const regex = new RegExp(
            `\\.(?:${className.escaped})(?=[\\w\\d .:{]+)((?::(?:${cssPseudoRegex}))*(?:[(\\w\\d )]*))`,
            'g'
          );
          code = code.replace(regex, '.' + classMapping.get(className.normal) + '$1');
        }
      });
    });

  return {
    code,
    map: null
  };
}
