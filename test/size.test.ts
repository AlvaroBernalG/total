//const { exec } = require('child_pr,cnocess');
import {} from 'jest';
import { exec } from 'child_process';
const between = require('in-between');

test('--size kb', () => {
	return new Promise((resolve: any, reject: any) =>{

		exec('find test/data | node ./dist/total.js --size kb', (err: any, stdout:any, stderr: any) => {
			if(err) return reject(err);
			if(stderr) return reject(stderr);

			expect(between(64.00, 65.81)(Number(stdout))).toBe(true);
			resolve();
		})
	})
})


test('--size b', () => {
	return new Promise((resolve:any, reject:any)=>{
		exec('find test/data | node ./dist/total.js --size b', (err:any, stdout:any, stderr:any) => {
			if(err) return reject(err)
			if(stderr) return reject(stderr)
			
			expect(between(64000, 65010)(Number(stdout))).toBe(true);
			resolve();
		})
	})
})

test('--size', () => {
	return new Promise((resolve: any, reject: any)=>{
		exec('find test/data | node ./dist/total.js --size', (err: any, stdout: any, stderr:any) => {
			if(err) return reject(err);
			if(stderr) return reject(stderr);
			
			expect(between(64700, 65010)(Number(stdout))).toBe(true);
			resolve();

		})
	})
});
