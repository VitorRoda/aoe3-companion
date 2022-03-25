import fs from "fs"
import imagemin from "imagemin"
import imageminJpegtran from "imagemin-jpegtran"
import imageminPngquant from "imagemin-pngquant"

const getDirRecursively = (dir) => {
  const getChildrenRecursively = (dir) => {
    // Get child directories under the dir.
    const readdir = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    if (readdir.length === 0) {
      // There're no directories under the dir.
      return dir;
    } else {
      // Get directories recursively. Require >=Node11
      return [dir, ...readdir
        .map((p) => getChildrenRecursively(`${dir}/${p.name}`))
        .flat()];
    }
  };
  return [dir, ...getChildrenRecursively(dir)];
};

(async () => {
  const files = [];
  const sourceDirs = getDirRecursively('./resources');

  console.log("sourceDirs", sourceDirs);

  for (let inDir of sourceDirs) {
    const destDir = "public/" + inDir;
    const filesInDir = await imagemin([`${inDir}/*.{jpg,png,JPG,PNG}`], {
      destination: destDir,
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });
    files.push(...filesInDir);
  }
})();