import { db } from "../database/db.js";
import { and, eq, gt } from "drizzle-orm";
import { valid_tokens } from "../database/schema.js";

async function generate(): Promise<{
	token: string;
	maxAge: number;
}> {
	const randomUUID = crypto.randomUUID();

	const maxAge = 5 * 60;
	const now = new Date();

	await db.insert(valid_tokens).values({
		token: randomUUID,
		expiry: new Date(now.getTime() + maxAge * 1000),
	});

	return {
		token: randomUUID,
		maxAge: maxAge,
	};
}

async function check(token: string): Promise<boolean> {
	if (!token) {
		return false;
	}

	const now = new Date();
	const tokenCheck = await db
		.select()
		.from(valid_tokens)
		.where(and(eq(valid_tokens.token, token), gt(valid_tokens.expiry, now)));

	if (tokenCheck.length < 1) {
		return false;
	}

	return true;
}

async function revoke(token: string): Promise<void> {
	await db.delete(valid_tokens).where(eq(valid_tokens.token, token));
}

export { generate, check, revoke };
