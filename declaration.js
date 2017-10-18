const exec = require("child-process-promise").exec;
const DtsBundle = require("dts-bundle");
const fs = require("fs");

const tempFolder = "./bin/temp";
const destFolder = "./bin/ts";
const dtsFileName = "coveo-search-ui-tests";

function Bundle() {
  return DtsBundle.bundle({
    name: dtsFileName,
    // Relative to the "main" file, ¯\_(ツ)_/¯
    main: `${tempFolder}/Index.d.ts`
  });
}

function BuildDeclarationFiles() {
  return exec(
    `tsc --declaration --outDir ${tempFolder} --declarationDir ${tempFolder}`
  );
}

function CopyDtsInFolder() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder);
    }
    const stream = fs
      .createReadStream(`${tempFolder}/${dtsFileName}.d.ts`)
      .pipe(fs.createWriteStream(`${destFolder}/${dtsFileName}.d.ts`));
    stream.on("close", resolve);
    stream.on("error", reject);
  });
}

function RemoveTempFolder() {
  return exec(`rm -rf ${tempFolder}`);
}

BuildDeclarationFiles()
  .then(Bundle)
  .then(CopyDtsInFolder)
  .then(RemoveTempFolder);
