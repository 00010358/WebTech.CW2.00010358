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

const employees = require('./routes/employees')
hrapplication.use('/employees', employees)

//localhost:4000 will show below mentioned things
hrapplication.get('/', (req, res) => {
	res.render('home')
})


hrapplication.get('/add', (req, res) => {
	res.render('add')
})

/*creating add page for adding employees with validation*/
hrapplication.post('/add', (req, res) =>{
	if (v.isValid(req.body)) {
		fs.readFile(DB, (err, data) => {
			if (err) res.statusCode(500)

			const employees = JSON.parse(data)

			employees.push({
				id: id (),
				name: req.body.name,
				surname: req.body.surname,
				dob: req.body.dob,
				position: req.body.position,
				about: req.body.about
			})

			fs.writeFile(DB, JSON.stringify(employees), err => {
				if (err) res.statusCode(500)

				res.render('add', { success: true })
			})
		})		
	} else {
		res.render("add", { error: true, success: false})
	}	
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

