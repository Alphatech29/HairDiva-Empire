import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontend = path.join(__dirname, "views");
const backend = path.join(__dirname);

const run = (cmd, cwd) =>
  new Promise((resolve, reject) => {
    const p = exec(cmd, { cwd });
    p.stdout.on("data", (d) => console.log(d.toString()));
    p.stderr.on("data", (d) => console.error(d.toString()));
    p.on("close", (code) => (code === 0 ? resolve() : reject(code)));
  });

async function deploy() {
  try {
    console.log("Installing frontend...");
    await run("npm install", frontend);
    console.log("Building frontend...");
    await run("npm run build", frontend);
    console.log("Installing backend...");
    await run("npm install", backend);
    console.log("Starting backend...");
    await run("node server.js", backend);
  } catch (err) {
    console.error("Deployment failed:", err);
  }
}

deploy();
