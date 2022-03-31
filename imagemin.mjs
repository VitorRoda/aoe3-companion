import fs from "fs"
import imagemin from "imagemin"
import imageminPngquant from "imagemin-pngquant"
import path from "path"
import jimp from 'jimp'

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
    try {
      const destDir = "./min/" + inDir;
      const filesInDir = await imagemin([`${inDir}/*.png`], {
        destination: destDir,
        plugins: [
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      });
      files.push(...filesInDir);
    } catch (error) {
      console.log(error, inDir)
    }
  }

    // Rename file
    // files.map((file) => {
    //   const ext = path.extname(file.destinationPath);
    //   const filename = path.basename(file.destinationPath, ext);
    //   const newPath = path.join(
    //     path.dirname(file.destinationPath),
    //     `${filename}.png`
    //   );
    //   jimp.read(file.destinationPath, function (err, image) {
    //     if (err) {
    //       console.log(err)
    //     } else {
    //       image.write(newPath)
    //     }
    //   })
    //   // fs.renameSync(file.destinationPath, newPath);
    // });
})();