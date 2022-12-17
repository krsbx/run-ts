import _ from 'lodash';

export const declarationErrorHandler = (message: string) => {
  const matches = message.match(new RegExp(' `npm i --save-dev (.*)` ', 'g'));

  const pkgs: { declaration: string; module: string }[] = [];

  _.forEach(matches, (str) => {
    str = str.trimStart();
    str = str.trimEnd();

    str = str.replaceAll('`', '');
    str = str.replace('npm i --save-dev ', '');

    const pkg: typeof pkgs[0] = {
      declaration: str,
      module: str,
    };

    if (str.startsWith('@types')) {
      pkg.module = str.split('@types').pop() as string;
    }

    pkgs.push(pkg);
  });

  return pkgs;
};
