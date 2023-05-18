#! /usr/bin/env node

var shell = require("shelljs");
var yargs = require("yargs");
const fs = require("fs");
const path = require("path");

var argv = yargs
  .usage("$0 command")
  .command("deploy", "It will run deploy commands.", function (yargs) {
    shell.exec(
      "git checkout --orphan gh-pages && npm run build && git --work-tree dist add --all && git --work-tree dist commit -m 'Deploy' && git push origin HEAD:gh-pages --force"
    );
    fs.rmdir("./dist", (err) => {
      if (err) {
        return console.log("error occurred in deleting directory", err);
      }

      console.log("Directory deleted successfully");
    });
    shell.exec("git checkout -f main && git branch -D gh-pages");
    console.log("Deployed successfully");
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help").argv;
