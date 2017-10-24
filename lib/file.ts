const fs = require('fs');
const promisify = require('util').promisify;
const path = require('path');

export const stats = promisify(fs.stat)
export const read = promisify(fs.read)

const normalizePath = (fn: (path: string, ...rest: any[])=> any) => (filePath: string, ...args: any[]): any=>{
	return fn.call(fn, path.join(__dirname, `../${filePath}`), ...args)
}

const getFileBodyName = (filename: string): string => filename.match(/^(.*?)\.[A-z]{1,2}$/)[1]

export const appendPath = (path:string, fileName:string ) : string => `${path}/${fileName}`

export async function loadAll(files: string[]): Promise<any[]> {
  return Promise.all(files.map(async (name: string) => {
      const fileName = getFileBodyName(name)
			const file = await load(name)
			return file
  }))
}

export const load = normalizePath(async (path: string) => {
  const file = await import(path);
  return file.default
})

export const dir = normalizePath(async (path: string, fullPath=false) =>{
	const files = fs.readdirSync(path)
	return fullPath ? files.map(appendPath.bind(null, path)): files
})

export function statsAll(paths: string[]): Promise<any[]> {
  return Promise.all(paths.map(async (fileName: string) => {
			return await stats(fileName)
  }))
}

export function readAll(paths: string[]): Promise<any[]> {
  return Promise.all(paths.map(read))
}

