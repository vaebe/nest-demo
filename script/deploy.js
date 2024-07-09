/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 定义项目根目录
const projectRoot = path.resolve(__dirname, '..');
// 定义打包输出目录
const buildOutputDir = path.join(projectRoot, 'dist');

// 读取并修改 package.json 文件
function modifyPackageJson(curPath, outputPath) {
  fs.readFile(curPath, 'utf8', (err, data) => {
    if (err) {
      console.error(`读取 package.json 文件时出错: ${err.message}`);
      return;
    }

    let packageJson = JSON.parse(data);
    if (packageJson.scripts && packageJson.scripts.prepare) {
      delete packageJson.scripts.prepare;
    }

    fs.writeFile(
      outputPath,
      JSON.stringify(packageJson, null, 2),
      'utf8',
      (err) => {
        if (err) {
          console.error(`写入 package.json 文件时出错: ${err.message}`);
          return;
        }
        console.log(`package.json 文件已成功拷贝到 ${buildOutputDir}`);
      },
    );
  });
}

// 拷贝文件到打包输出目录
function copyFilesToDist(filePathList) {
  filePathList.forEach((item) => {
    const curPath = path.join(projectRoot, item);
    const outputPath = path.join(buildOutputDir, item);

    if (item === 'package.json') {
      modifyPackageJson(curPath, outputPath);
    } else {
      fs.copyFile(curPath, outputPath, (err) => {
        if (err) {
          console.error(`拷贝 ${item} 文件时出错: ${err.message}`);
          return;
        }
        console.log(`${item} 文件已成功拷贝到 ${buildOutputDir}`);
      });
    }
  });
}

// 执行 build 命令
function runBuildCommand() {
  exec('npm run build', { cwd: projectRoot }, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行 build 命令时出错: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`build 命令标准错误输出: ${stderr}`);
      return;
    }
    console.log(`build 命令标准输出: ${stdout}`);

    const filePathList = [
      'package.json',
      'pnpm-lock.yaml',
      'pm2.config.js',
      '.env',
    ];
    copyFilesToDist(filePathList);
  });
}

// 主函数
function main() {
  runBuildCommand();
}

main();
