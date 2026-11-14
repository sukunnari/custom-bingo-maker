import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { serveStatic } from "@hono/node-server/serve-static";

import { convertNumber } from "./utils/convert.js";
import { db } from "./database/db.js";
import { rooms } from "./database/schema.js";

const PORT: number = convertNumber(process.env.SERVER_PORT);
const BASE_PATH: string = process.env.BASE_PATH || "/";
const STATIC_PATH = BASE_PATH + "static/";

const app = new Hono().basePath(BASE_PATH);

app.use(
	"*",
	jsxRenderer(({ children }) => {
		return <>{children}</>;
	}),
);

app.get("/", async (c) => {
	await db.select().from(rooms);
	return c.render(
		<html>
			<head>
				<title>Hello</title>
			</head>
			<body>
				<h1>Hello</h1>
				<p>This is a</p>
			</body>
			<link rel="stylesheet" href={STATIC_PATH + "global.css?v=1"} />
			<script src={STATIC_PATH + "storage-check.js?v=1"}></script>
			<script src={STATIC_PATH + "main.js?v=2"}></script>
		</html>,
	);
});

app.use(
	"/static/*",
	serveStatic({
		root: "./",
		rewriteRequestPath: (path) => path.replace(BASE_PATH, ""),
	}),
);

serve(
	{
		fetch: app.fetch,
		port: PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
