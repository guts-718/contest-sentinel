import { config } from "./core/env";
// import { log } from "./core/logger";
import { connectDB } from "./core/db";

connectDB();


// log.boot("system starting");
// log.db("connected");
// log.error("something failed");


console.log(config);
