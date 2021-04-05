const express = require('express')
const hrapplication = express()

const fs = require('fs')

const Validator = require('./utils').Validator
const DB = require('./utils').DB
const id = require('./utils').id
const v = new Validator()

hrapplication.set('view engine', 'pug')
hrapplication.use('/static', express.static('public'))
hrapplication.use(express.urlencoded({ extended: false }))

//route url for employees
const employees = require('./routes/employees')
hrapplication.use('/employees', employees)

//route url for add button
const add = require('./routes/add')
hrapplication.use('/add', add)

//localhost:4000 will show below mentioned things
hrapplication.get('/', (req, res) => {
	res.render('home')
})

/*REST API*/
hrapplication.get('/api/v1/employees', (req, res) => {	
	fs.readFile(DB, (err, data) => {
		if (err) res.statusCode(500)

		const employees = JSON.parse(data)

		res.json(employees)

	})
})

hrapplication.get('/:id/delete', (req, res) => {
	const id = req.params.id

	fs.readFile(DB, (err, data) => {
		if (err) res.statusCode(500)

		const employees = JSON.parse(data)
		const filteredEmployee = employees.filter(employee => employee.id != id)

		fs.writeFile(DB, JSON.stringify(filteredEmployee), err => {
			if (err) res.statusCode(500)

			res.render('employees', { employees: filteredEmployee, deleted: true })
		})
	})
})

hrapplication.listen(4000, err => {
	if (err) console.log(err)

	console.log('Server is running on port 4000...')
})

