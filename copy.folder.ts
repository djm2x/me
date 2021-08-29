import * as fse from 'fs-extra';

fse.ensureDirSync(`${process.cwd()}/dist/docs`);

fse.copySync(`${process.cwd()}/docs`, `${process.cwd()}/dist/docs`);

process.exit(0);