const execa = require("execa");
const fs = require("fs");

(async () => {
  try {
    await execa("git", ["checkout", "--orphan", "gh-pages"]);
    console.log("Building...");
    await execa("npm", ["run", "build"]);
    // Understand if it's dist or build folder
    await execa("git", ["--work-tree", "dist", "add", "--all"]);
    await execa("git", ["--work-tree", "dist", "commit", "-m", "Deploy"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
    console.log("Pushed to gh-pages.");
    await execa("rm", ["-r", "dist"]);
    console.log("1");
    await execa("git", ["checkout", "-f", "main"]);
    console.log("2");
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("gh-pages branch deleted.");
    console.log("Successfully deployed");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();
