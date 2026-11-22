CREATE TABLE `player_sessions` (
	`session_token` text NOT NULL,
	`player_username` text NOT NULL,
	`expiry` integer NOT NULL,
	FOREIGN KEY (`player_username`) REFERENCES `players`(`username`) ON UPDATE no action ON DELETE no action
);
