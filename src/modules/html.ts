import { escapeClassName, randomClassName } from '../utils';

export default function transformHtmlFiles(
  code: string,
  classMapping: Map<string, string>,
  config: GeneratorConfig
) {
  // /:class="[^"]*\?(?: *)?'([a-z-0-9\\\[\]\/\(\)\.: ]*)'(?: *)?[^"]*:(?: *)?'([a-z-0-9\\\[\]\/\(\)\.: ]*)'[^"]*/g,
  // // React class names
  // /className: "([a-z-0-9\?\\\[\]\/\(\)\.': ]*)"/g,
  // // React class names using tenary operator
  // /className: `([a-z-0-9\?\\\[\]\/\(\)\.': ]*)\${/g,
  // /className: `.* ?"([a-z-0-9\?\\\[\]\/\(\)\.': ]*)"/g,
  const classRegexs = [
    // /class="[^"]([a-zA-Z-0-9\\/.':\-_ ]*)"/gm,
    // /class="\${"([a-zA-Z-0-9\\/.':\-_ ]+)"}"/gm,
    // /class="\${"([a-zA-Z-0-9\\/.':\-_ ]*(?=:(?:[ ]*"+[ ]*)escape\(.*\) \+ " )*[a-zA-Z-0-9\\/.':\-_ ]*)"}"/gm,
    // /(class="\${\[\s*)(?:("[a-zA-Z-0-9\\/.':\-_ ]*",*\s*)*)(?:(?:\(.*?("[a-zA-Z-0-9\\/.':\-_ ]*") : ("[a-zA-Z-0-9\\/.':\-_ ]*")\))*(?:.*?\+ \(.*?\?.*?("[a-zA-Z-0-9\\/.':\-_ ]*")\))*\s*)(\](?:\.join\(.*\)\.trim\(\))*}")/gm,
    // /(?:class",\s*?)("[a-zA-Z-0-9\\/.':\-_ ]*")+/gm
    new RegExp('(?<=class["\'],\\s*["\']).*?(?=["\'])', 'gm')
  ];

  const rawClasses = getRawClasses(classRegexs, code);

  // const rawClasses = gotRawClasses.forEach((rawClass) => {
  //   rawClass.replace(/'/g, '').replace(/"/g, '');
  // });

  console.log('\n\nrawClasses:', rawClasses);

  const unqiueClasses = new Set(
    rawClasses
      .map((c) => c.split(' '))
      .flat()
      .filter((c) => c.length > 0)
      .sort((a, b) => b.length - a.length)
  );

  console.log('unqiueClasses:', unqiueClasses);

  unqiueClasses.forEach((className) => {
    let random = randomClassName(config);
    const classMappingList = Array.from(classMapping.values());

    while (classMappingList.includes(random)) {
      random = randomClassName(config);
    }

    classMapping.set(className, random);
  });

  const rawClassesMap = new Map();

  rawClasses.forEach((classNames) => {
    const randomClassNames = classNames
      .split(' ')
      .map((className) => {
        if (classMapping.has(className)) {
          return classMapping.get(className);
        }
      })
      .join(' ');

    rawClassesMap.set(classNames, randomClassNames);
  });

  console.log('rawClassesMap:', rawClassesMap);

  rawClasses
    .sort((a, b) => b.length - a.length)
    .forEach((classNames) => {
      let match: RegExpExecArray;
      const regex = new RegExp(escapeClassName(classNames), 'g');
      while ((match = regex.exec(code)) !== null) {
        if (match.index > 0 && code[match.index - 2] === ',') {
          code = code.replace(match[0], `"${rawClassesMap.get(classNames)}"`);
        } else {
          code = code.replace(match[0], `${rawClassesMap.get(classNames)}`);
        }
      }
    });

  return {
    code,
    map: null
  };
}

function getRawClasses(classRegexs: RegExp[], code: string) {
  const rawClasses: string[] = [];

  classRegexs.forEach((regex) => {
    let match: RegExpExecArray;
    while ((match = regex.exec(code)) !== null) {
      if (match[1]) {
        rawClasses.push(match[1]);
      }
      if (match[2]) {
        rawClasses.push(match[2]);
      }
    }
  });

  return rawClasses;
}
