CREATE TABLE `bingos` (
	`bingo_id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`name` text NOT NULL,
	`activated` integer NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `csrf_login_token` (
	`token` text NOT NULL,
	`expiry` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `player_selection` (
	`selection_id` text PRIMARY KEY NOT NULL,
	`player_id` text NOT NULL,
	`room_id` text NOT NULL,
	`selection` text NOT NULL,
	`win_condition` text NOT NULL,
	`last_update` integer NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`player_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `players` (
	`player_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`token` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_rooms` (
	`room_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`last_bingo_update` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_rooms`("room_id", "name", "last_bingo_update") SELECT "room_id", "name", "last_bingo_update" FROM `rooms`;--> statement-breakpoint
DROP TABLE `rooms`;--> statement-breakpoint
ALTER TABLE `__new_rooms` RENAME TO `rooms`;--> statement-breakpoint
PRAGMA foreign_keys=ON;