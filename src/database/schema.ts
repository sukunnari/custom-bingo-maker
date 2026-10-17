import { sqliteTable } from "drizzle-orm/sqlite-core";
import { int, text } from "drizzle-orm/sqlite-core";

export const csrf_login_token = sqliteTable("csrf_login_token", {
	token: text().notNull(),
	expiry: int({ mode: "timestamp" }).notNull(),
});

export const rooms = sqliteTable("rooms", {
	room_id: text().notNull().primaryKey(),
	name: text().notNull(),
	last_bingo_update: int({ mode: "timestamp" }).notNull(),
});

export const bingos = sqliteTable("bingos", {
	bingo_id: text().notNull().primaryKey(),
	room_id: text()
		.notNull()
		.references(() => rooms.room_id),
	name: text().notNull(),
	activated: int({ mode: "boolean" }).notNull(),
});

export const players = sqliteTable("players", {
	player_id: text().notNull().primaryKey(),
	name: text().notNull(),
	token: text().notNull(),
});

export const player_selection = sqliteTable("player_selection", {
	selection_id: text().notNull().primaryKey(),
	player_id: text()
		.notNull()
		.references(() => players.player_id),
	room_id: text()
		.notNull()
		.references(() => rooms.room_id),
	selection: text({ mode: "json" }).notNull(),
	win_condition: text({ mode: "json" }).notNull(),
	last_update: int({ mode: "timestamp" }).notNull(),
});
