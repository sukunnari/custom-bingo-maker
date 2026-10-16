import { sqliteTable } from "drizzle-orm/sqlite-core";
import { int, text } from "drizzle-orm/sqlite-core";

export const rooms = sqliteTable("rooms", {
	room_id: int().notNull().primaryKey(),
	name: text().notNull(),
});
