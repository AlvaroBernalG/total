const fs = require('fs');
const promisify = require('util').promisify;
const path = require('path');

const _normalizePath = (fn: (path: string, ...rest: any[]) => any) => {
	return (filePath: string, ...args: any[]): any => {
		return fn.call(fn, path.join(__dirname, `../${filePath}`), ...args);
	};
};

const _getBodyFileName = (filename: string): string => {
	return filename.match(/^(.*?)\.[A-z]{1,2}$/)[1];
};

const _stats = promisify(fs.stat);

const _read = promisify(fs.read);

const _appendPath = (path: string, fileName: string): string => `${path}/${fileName}`;

const _load = _normalizePath(async (path: string) => {
	const file = await import(path);
	return file.default;
});

export const dir = _normalizePath(async (path: string, fullPath = false) => {
	const files = fs.readdirSync(path);
	return fullPath ? files.map(_appendPath.bind(undefined, path)) : files;
});

export const load = async (paths: string | string[]): Promise<any[]> => {
	if (Array.isArray(paths)) return Promise.all(paths.map((name: string) => {
		const fileName = _getBodyFileName(name);
		return _load(fileName);
	}));

	return _load(paths);
};

export const stats = async (paths: string | string[]): Promise<any[]> => {
	if (Array.isArray(paths)) return Promise.all(paths.map((fileName: string) => _stats(fileName)));

	return _stats(paths);
};

export const read = async (paths: string | string[]): Promise<any[]> => {
	if (Array.isArray(paths)) return Promise.all(paths.map((fileName: string) => _read(fileName)));

	return _read(paths);
};
