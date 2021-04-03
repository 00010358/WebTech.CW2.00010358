
// const express = require("express")
// const router = express.Router()
// const fs = require('fs')





// router.get('/', (req, res) => {


// 	fs.readFile('./data/employees.json', (err, data) => {
// 		if (err) throw err

// 		const employees = JSON.parse(data)

// 		res.render('employees', { employees: employees})

// 	})
// } )


// router.get('/:id', (req, res) => {

// 	const id = req.params.id



// 	fs.readFile('./data/employees.json', (err, data) => {
// 		if (err) throw err

// 		const employees = JSON.parse(data)


// 		const employee = employees.filter(employee => employee.id == id)[0]

// 		res.render('details', { employee: employee})



// 	})
// })


// /*load edit form*/
// router.get('/edit/:id', (req, res) => {

// 	const id = req.params.id



// 	fs.readFile('./data/employees.json', (err, data) => {
// 		if (err) throw err

// 		const employees = JSON.parse(data)


// 		const employee = employees.filter(employee => employee.id == id)[0]

// 		res.render('edit', { employee: employee})

// 	})
// })

// router.get('/employees/edit/:id', (req, res) => {
// 	const id = req.params.id
	
// 	fs.readFile('./data/employees.json', (err, data) => {
// 	    if (err) res.sendStatus(500)

// 	    const employees = JSON.parse(data)
// 	    const employee = employees.filter(employee => employee.id == id)[0]
// 	    const employeeIdx = employees.indexOf(employee)
// 	    const splicedEmployee = employees.splice(employeeIdx, 1)[0]
	    
// 		splicedEmployee.name = req.body.name
// 		splicedEmployee.surname = req.body.surname
// 		splicedEmployee.dob = req.body.dob
// 		splicedEmployee.position = req.body.position
// 		splicedEmployee.about = req.body.about

// 	    employees.push(splicedEmployee)

// 		fs.writeFile('./data/employees.json', JSON.stringify(employees), err => {
// 			if (err) throw err

// 			res.redirect('/')
// 		})
	
// 	})


// })



// module.exports = router