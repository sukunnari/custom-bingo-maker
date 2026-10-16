import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { convertNumber } from "./utils/convert.js";
import { db } from "./database/db.js";
import { rooms } from "./database/schema.js";

const PORT: number = convertNumber(process.env.SERVER_PORT);
const BASE_PATH: string = process.env.BASE_PATH || "/";

const app = new Hono().basePath(BASE_PATH);

app.get("/", async (c) => {
	await db.select().from(rooms);
	return c.text("Hi");
});

serve(
	{
		fetch: app.fetch,
		port: PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
