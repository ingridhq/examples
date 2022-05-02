const fileContent = `VITE_SITE_ID=`;
const filePath = ".env";

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(".env", fileContent);
  console.log(chalk.yellow("Fill out variables in .env file before runing!"));
}
