import fs from 'fs';
import tar from 'tar';

// write a file with a specific content.
export const writeFile = (
  content: string,
  file: string,
  dest: string,
): string => {
  const file_path = `${dest}/code/src/${file}`;
  fs.writeFileSync(file_path, content);
  return file_path;
};

// create a tar file of a file.
export const tarFile = async (file: string, dest: string) => {
  await tar.c(
    {
      gzip: false,
      file: `${dest}/archive.tar`,
      cwd: `${dest}/code/src/`,
    },
    [file],
  );
};

// get a file of a path.
export const getFile = (file: string) => {
  return fs.readFileSync(file);
};
