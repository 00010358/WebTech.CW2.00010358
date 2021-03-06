const express = require("express")
const router = express.Router()
const fs = require('fs')
const db = require('../utils').DB

//here doing route grouping
router.get('/', (req, res) => {
	fs.readFile(db, (err, data) => {
		if (err) res.statusCode(500)

		const employees = JSON.parse(data)

		res.render('employees', { employees: employees})
	})
} )

// creating details page it will grab the id of the selected employee and shows the all information inside 
router.get('/:id', (req, res) => {
	const id = req.params.id

	fs.readFile(db, (err, data) => {
		if (err) res.statusCode(500)

		const employees = JSON.parse(data)
		const employee = employees.filter(employee => employee.id == id)[0]

		res.render('details', { employee: employee})
	})
})


/*load edit form*/
router.get('/edit/:id', (req, res) => {
	const id = req.params.id

	fs.readFile(db, (err, data) => {
		if (err) res.statusCode(500)

		const employees = JSON.parse(data)
		const employee = employees.filter(employee => employee.id == id)[0]

		res.render('edit', { employee: employee})
	})
})
//creating working edit button it using the splice it will update the employee data and get the written information from the form
router.post('/edit/:id', (req, res) => {
	const id = req.params.id
	
	fs.readFile(db, (err, data) => {
	    if (err) res.sendStatus(500)

	    const employees = JSON.parse(data)
	    const employee = employees.filter(employee => employee.id == id)[0]
	    const employeeIdx = employees.indexOf(employee)
	    const splicedEmployee = employees.splice(employeeIdx, 1)[0]
	    
		splicedEmployee.name = req.body.name
		splicedEmployee.surname = req.body.surname
		splicedEmployee.dob = req.body.dob
		splicedEmployee.position = req.body.position
		splicedEmployee.about = req.body.about

	    employees.push(splicedEmployee)

		fs.writeFile(db, JSON.stringify(employees), err => {
			if (err) res.statusCode(500)

			res.redirect('/')
		})
	})
})


module.exports = router