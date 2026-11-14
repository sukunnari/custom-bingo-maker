"use strict";

function main() {
	// ======= Storage check =======
	const storageSupport = storageAvailable("localStorage");
	if (!storageSupport) {
		alert("This website requires localStorage support.");
		return;
	}

	// More stuffs here...
}

main();
