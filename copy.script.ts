import * as fs from 'fs';

async function main() {
  try {
    const content = await fs.promises.readFile(`${__dirname}/docs/index.html`, 'utf8');

    await fs.promises.writeFile(`${__dirname}/docs/404.html`, content);

    console.log('404.html created/updated succesfully');
  } catch (error) {
    console.log('404.html error occur : ', error);
  }
}


// launch the programme

main();
