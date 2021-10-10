import config from "../config.json";
import { createDI } from "./di";
import { setupExpress } from "./setup/setupExpress";
import { setupRoutes } from "./setup/setupRoutes";
import { setupMongo } from "./setup/setupMongo";

async function runApp() {
    const di = createDI();
    
    setupExpress(di);
    await setupMongo(di);
    setupRoutes(di);

    await di.express.listen(config.port);
    console.log("\n\u001b[32mCompile successfully!\u001b[0m\n");
    console.log(`Server listening: \u001b[36m\u001b[4mhttp://localhost:${config.port}\u001b[0m\n`)
}

runApp();
