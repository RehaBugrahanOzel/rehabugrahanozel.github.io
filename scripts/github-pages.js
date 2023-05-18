#! /usr/bin/env node

var shell = require("shelljs");
var yargs = require("yargs");

var argv = yargs
  .usage("$0 command")
  .command("deploy", "It will run deploy commands.", function (yargs) {
    shell.exec(
      "git checkout --orphan gh-pages && npm run build && git --work-tree dist add --all && git --work-tree dist commit -m 'Deploy' && git push origin HEAD:gh-pages --force && del -r 'dist' && git checkout -f main && git branch -D gh-pages"
    );
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help").argv;
