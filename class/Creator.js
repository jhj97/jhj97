import ora from 'ora';
import util from 'util';
import path from 'path';
import downloadGitRepo from 'download-git-repo';

async function loading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start(); // 开启加载
  try {
    let Res = await fn(...args);
    spinner.succeed();
    return Res;
  } catch (error) {
    spinner.fail("request fail");
  }
}

export default class Creator {
  constructor(name, target) {
    this.name = name;
    this.target = target;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async download(repo, tag) {
    // 下载地址
    const requestUrl = ``;
    await loading(
      this.downloadGitRepo,
      'wait download',
      requestUrl,
      path.resolve(process.cwd(), this.target)
    )
  }

  // 创建项目
  create() {
    console.log(this.name, this.target)
    this.download('demo', this.target)
  }
}
