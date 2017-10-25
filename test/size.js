const { exec } = require('child_process')
const test = require('ava')
const between = require('in-between')

test('--size kb', (t) => {
	return new Promise((resolve, reject)=>{

		exec('find test/data | node ./dist/total.js --size kb', (err, stdout, stderr) => {
			if(err) return reject(err)
			if(stderr) return reject(stderr)

			t.true(between(64.00, 65.81)(Number(stdout)))
			resolve()
		})
	})
})

test('--size b', (t) => {
	return new Promise((resolve, reject)=>{

		exec('find test/data | node ./dist/total.js --size b', (err, stdout, stderr) => {
			if(err) return reject(err)
			if(stderr) return reject(stderr)
			
			t.true(between(64000, 65010)(Number(stdout)))
			resolve()
		})
	})
})

test('--size', (t) => {
	return new Promise((resolve, reject)=>{
		exec('find test/data | node ./dist/total.js --size', (err, stdout, stderr) => {
			if(err) return reject(err)
			if(stderr) return reject(stderr)
			

			t.true(between(64700, 65010)(Number(stdout)))
			resolve()

		})
	})
})