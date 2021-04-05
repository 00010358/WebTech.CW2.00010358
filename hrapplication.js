const express = require('express')
const hrapplication = express()
//file system
const fs = require('fs')
//require validation, db and ID
const Validator = require('./utils').Validator
const DB = require('./utils').DB
const id = require('./utils').id 
const v = new Validator()

//putting pug template engine
hrapplication.set('view engine', 'pug')
//serving static files
hrapplication.use('/static', express.static('public'))
//parse application/x-www-form-urlencoded
hrapplication.use(express.urlencoded({ extended: false }))

//route url for employees
const employees = require('./routes/employees')
hrapplication.use('/employees', employees)

//route url for add button
const add = require('./routes/add')
hrapplication.use('/add', add)

//localhost:4000 will show the home page 
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
// creating delete button
hrapplication.get('/:id/delete', (req, res) => {
	const id = req.params.id

	fs.readFile(DB, (err, data) => {
		if (err) res.statusCode(500)

		const employees = JSON.parse(data) // parsing the data from json file
		const filteredEmployee = employees.filter(employee => employee.id != id) // filtering and deleting the id from the db

		fs.writeFile(DB, JSON.stringify(filteredEmployee), err => {
			if (err) res.statusCode(500)// in case of error

			res.render('employees', { employees: filteredEmployee}) // rendering or going back to the employees page 
		})
	})
})

hrapplication.listen(4000, err => { // Port number
	if (err) console.log(err)

	console.log('Server is running on port 4000...')
})

