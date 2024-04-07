const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
    {
        ApplicationName: {
            type: String,
            required: [true, "Please enter this field"]
        },
        PositionAppliedFor: {
            type: String,
            required: false,

        },
        ApplicationDate: {
            type: String,
            required: false
        },
        Status: {
            type: String,
            required: false
        },
        id:{
            type:String,
            required:false
        }

    },
    {
        timestamps: false
    }
)

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee;

