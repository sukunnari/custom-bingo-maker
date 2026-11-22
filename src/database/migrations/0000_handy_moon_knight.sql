CREATE TABLE `bingos` (
	`bingo_id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`name` text NOT NULL,
	`activated` integer NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `player_selection` (
	`selection_id` text PRIMARY KEY NOT NULL,
	`player_username` text NOT NULL,
	`room_id` text NOT NULL,
	`selection` text NOT NULL,
	`win_condition` text NOT NULL,
	`last_update` integer NOT NULL,
	FOREIGN KEY (`player_username`) REFERENCES `players`(`username`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `players` (
	`username` text PRIMARY KEY NOT NULL,
	`displayname` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`room_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`last_bingo_update` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `valid_tokens` (
	`token` text NOT NULL,
	`expiry` integer NOT NULL
);
