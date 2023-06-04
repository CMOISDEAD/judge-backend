import path from 'path';
import { Injectable } from '@nestjs/common';

import docker from 'src/configs/docker';
import { writeFile, tarFile, getFile } from 'src/utils/files';

const CONTAINERS_PATH = path.join(process.cwd(), 'src', 'utils', 'containers');

@Injectable()
export class CodeService {
  async create(code: string, lang: string) {
    const selector = {
      java: async () =>
        await this.serveContainer(
          'test-java:Dockerfile',
          lang,
          'Main.java',
          code,
        ),
      python: async () =>
        await this.serveContainer(
          'test-python:Dockerfile',
          lang,
          'main.py',
          code,
        ),
      c: async () =>
        await this.serveContainer('test-c:Dockerfile', lang, 'main.c', code),
    };
    return selector[lang]();
  }

  async serveContainer(
    image: string,
    lang: string,
    file: string,
    code: string,
  ): Promise<string> {
    const WORKDIR = path.join(CONTAINERS_PATH, `${lang}_container`);
    writeFile(code, file, WORKDIR);
    await tarFile(file, WORKDIR);
    const tarArchive = getFile(path.join(WORKDIR, 'archive.tar'));
    const container = await docker.createContainer({
      Image: image,
    });
    await container.putArchive(tarArchive, {
      path: '/app',
    });
    await container.start(); // container start
    await container.wait(); // wait until the container finish
    const logs = await container.logs({
      stderr: true,
      stdout: true,
    });
    const output = logs.toString('utf-8');
    return output;
  }
}
