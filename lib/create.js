import { program } from "commander";
import path from "path";
import fse from "fs-extra";
import Inquirer from "inquirer";
import Creator from "../class/Creator.js";
import { tableTypeChoices } from "../api/index.js";

// 获取模板信息及用户最终选择的模板
async function getRepoInfo() {
  // 获取组织下的仓库信息
  let tableTypeChoicesResult = await tableTypeChoices();
  // 选取模板信息
  let { repo } = await new Inquirer.prompt([
    {
      name: "repo",
      type: "list",
      message: "Please choose a template",
      choices: tableTypeChoicesResult,
    },
  ]);
  return repo;
}

export const createOption = () => {
  program
    .command("create <project-name>") // 增加创建指令
    .description("create a new project") // 添加描述信息
    .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
    .action(async (projectName, option) => {
      // 处理用户输入create 指令附加的参数
      console.log(projectName, option);
      const cwd = process.cwd();
      const targetDir = path.join(cwd, projectName);
      if (fse.existsSync(targetDir)) {
        if (option.force) {
          fse.remove(targetDir);
        } else {
          let { isOverwrite } = await new Inquirer.prompt([
            {
              name: "isOverwrite",
              type: "list",
              description: "Target directory exists, Please choose an action.（目标目录已存在，请选择一个操作）",
              choices: [
                { name: 'Overwrite', value: true },
                { name: 'Cannel', value: false },
              ],
            }
          ]);
          if (isOverwrite) {
            await fse.remove(targetDir);
            console.log("remove");
          } else {
            console.log("Cannel");
            return;
          }
        }
      }
      const repoInfo = await getRepoInfo()
      const creator = new Creator(projectName, targetDir);
      creator.create()
    });
}