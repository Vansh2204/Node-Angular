const express = require('express');
const mongoose = require('mongoose')
const Employee = require('./models/employeeModel')
const cors = require('cors')
const app = express();
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Get All

app.get('/employees', async (req, res) => {
    const employees = await Employee.find({});
    res.json(employees)
})

//Get by ID

app.get('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.json(employee)
})

//Add data

app.post('/employees', async (req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.json(employee)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })

    }
})

//Update data

app.put('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.updateOne({ _id: id }, req.body);
        if (!employee) {
            return res.status(404).json({ message: `cannot find ${id}` })
        }
        const updatedEmployee = await Employee.findById(id)
        res.json(employee);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete data

app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: `connot find ${id}` })
        }
        res.status(200).json(employee);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('mongodb+srv://vanshhathi2204:rFsoeS254vO4LkXl@vanshapi.7mrdl9s.mongodb.net/Node-API?retryWrites=true&w=majority&appName=VanshAPI')
    .then(() => {
        console.log('Connected to Database')
        app.listen(5000, () => {
            console.log('NODE API running on PORT 5000 !!!')
        })
    }).catch((error) => {
        console.log(error)
    })