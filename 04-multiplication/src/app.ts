import { argsv } from "./plugins/args.plugis";
import { RunOptions, ServerApp } from "./presentation/server-app";

(async () => {
  main();
})();

async function main() {
  const { b: base, l: limit, s: showTable, n: name, d: destination } = argsv;
  ServerApp.run({ base, limit, showTable, name, destination   });
}