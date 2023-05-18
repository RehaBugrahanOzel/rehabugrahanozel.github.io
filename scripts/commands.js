#! /usr/bin/env node

var shell = require("shelljs");
var yargs = require("yargs");
var rimraf = require("rimraf");

var argv = yargs
  .usage("$0 command")
  .command("deploy", "It will run deploy commands.", function (yargs) {
    shell.exec(
      "git checkout --orphan gh-pages && npm run build && git --work-tree dist add --all && git --work-tree dist commit -m 'Deploy' && git push origin HEAD:gh-pages --force"
    );
    rimraf("./dist", function () {
      console.log("done");
    });
    shell.exec("git checkout -f main && git branch -D gh-pages");
    console.log("Deployed successfully");
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help").argv;
