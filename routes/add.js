const express = require("express")
const router = express.Router()
const fs = require('fs')

//calling validation, db and id
const Validator = require('../utils').Validator
const DB = require('../utils').DB
const id = require('../utils').id
const v = new Validator()

router.get('/', (req, res) => {
	res.render('add')
})

//creating add page for adding employees with validation. It will get the information from the form and will push it to the employees.json
router.post('/', (req, res) =>{
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
		res.render("add", { error: true, success: false})// if invalid data is written, user will see the error
	}	
})

module.exports = router
