import { db } from "../database/db.js";
import { players, player_sessions } from "../database/schema.js";
import { eq, and, gt } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function checkIfUsernameAvailable(username: string) {
	const existing = await db
		.select()
		.from(players)
		.where(eq(players.username, username));

	if (existing.length === 0) {
		return true;
	}

	return false;
}

async function addPlayer(
	username: string,
	displayname: string,
	password: string,
) {
	const hashedPassword = await bcrypt.hash(password, 10);

	await db.insert(players).values({
		username: username,
		displayname: displayname,
		password: hashedPassword,
	});
}

async function verifyPassword(username: string, password: string) {
	const existing = await db
		.select()
		.from(players)
		.where(eq(players.username, username));

	if (existing.length !== 1) {
		return false;
	}

	const compareResult = await bcrypt.compare(password, existing[0].password);

	if (!compareResult) {
		return false;
	}

	return true;
}

async function generateSession(username: string) {
	const randomUUID = crypto.randomUUID();

	const maxAge = 60 * 60 * 24 * 30;
	const now = new Date();

	await db.insert(player_sessions).values({
		session_token: randomUUID,
		player_username: username,
		expiry: new Date(now.getTime() + maxAge * 1000),
	});

	return {
		session_token: randomUUID,
		maxAge: maxAge,
	};
}

// This could also be used to check session validity
async function getUsernameFromSession(session: string) {
	const now = new Date();
	const existingSession = await db
		.select()
		.from(player_sessions)
		.where(
			and(
				eq(player_sessions.session_token, session),
				gt(player_sessions.expiry, now),
			),
		);

	if (existingSession.length === 1) {
		return existingSession[0].player_username;
	} else {
		return null;
	}
}

export {
	addPlayer,
	verifyPassword,
	checkIfUsernameAvailable,
	generateSession,
	getUsernameFromSession,
};
