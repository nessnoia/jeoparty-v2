import * as dotenv from "dotenv";
import { connectToDatabase } from "$lib/server/database";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}
 
connectToDatabase(ATLAS_URI).then(() => {
	console.log('Mongo started');
}).catch(e => {console.error(e)})
