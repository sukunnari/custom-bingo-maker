interface ResponseType {
	success: boolean;
	message?: string;
	data?: any;
}

function success(message?: string | null, data?: any): ResponseType {
	let resObject: ResponseType = {
		success: true,
	};

	if (message) {
		resObject.message = message;
	}

	if (data) {
		resObject.data = data;
	}

	return resObject;
}

function fail(message: string): ResponseType {
	return {
		success: false,
		message: message,
	};
}

export { success, fail };
