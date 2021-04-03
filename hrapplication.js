
const express = require('express')
const hrapplication = express()
const path = require('path')

const fs = require('fs')
const router = express.Router()


hrapplication.set('view engine', 'pug')


hrapplication.use('/static', express.static('public'))

hrapplication.use(express.urlencoded({ extended: false }))



//localhost:4000 will show below mentioned things
hrapplication.get('/', (req, res) => {
	res.render('home')
})


hrapplication.get('/add', (req, res) => {
	res.render('add')
})

/*creating add page for adding employees with validation*/
hrapplication.post('/add', (req, res) =>{
	const name = req.body.name
	const surname = req.body.surname
	const dob = req.body.dob
	const position = req.body.position
	const about = req.body.about


	if (name.trim() === '') {
		res.render('add', { error: true}) 

	} 
	else if (surname.trim() === ''){
		res.render('add', { error: true})

		
	}
	else if (dob.trim() === ''){
		res.render('add', { error: true})

		
	}
	else if (position.trim() === ''){
		res.render('add', { error: true})

		
	}
	else if (about.trim() === ''){
		res.render('add', { error: true})

		
	}
	else {
		fs.readFile('./data/employees.json', (err, data) => {
			if (err) throw err

			const employees = JSON.parse(data)

			employees.push({

				id: id (),
				name: name,
				surname: surname,
				dob: dob,
				position: position,
				about: about

			})

			fs.writeFile('./data/employees.json', JSON.stringify(employees), err => {
				if (err) throw err

				res.render('add', { success: true })
			})



		})
	}
})


function id () {
	return '_' + Math.random().toString(36).substr(2, 9);
  };




/*REST API*/
hrapplication.get('/api/v1/employees', (req, res) => {
	
	fs.readFile('./data/employees.json', (err, data) => {
		if (err) throw err

		const employees = JSON.parse(data)

		res.json(employees)

	})

})




hrapplication.get('/employees', (req, res) => {


	fs.readFile('./data/employees.json', (err, data) => {
		if (err) throw err

		const employees = JSON.parse(data)

		res.render('employees', { employees: employees})

	})
} )


hrapplication.get('/employees/:id', (req, res) => {

	const id = req.params.id



	fs.readFile('./data/employees.json', (err, data) => {
		if (err) throw err

		const employees = JSON.parse(data)


		const employee = employees.filter(employee => employee.id == id)[0]

		res.render('details', { employee: employee})



	})
})


/*load edit form*/
hrapplication.get('/employees/edit/:id', (req, res) => {

	const id = req.params.id



	fs.readFile('./data/employees.json', (err, data) => {
		if (err) throw err

		const employees = JSON.parse(data)


		const employee = employees.filter(employee => employee.id == id)[0]

		res.render('edit', { employee: employee})

	})
})

hrapplication.post('/employees/edit/:id', (req, res) => {
	const id = req.params.id
	
	fs.readFile('./data/employees.json', (err, data) => {
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

		fs.writeFile('./data/employees.json', JSON.stringify(employees), err => {
			if (err) throw err

			res.redirect('/')
		})
	
	})


})

hrapplication.listen(4000, err => {
	if (err) console.log(err)

	console.log('Server is running on port 4000...')
})