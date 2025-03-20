import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Title is required"],
            Unique: true,
            minlength: [3, "Title must be atleast 3 characters long"],
            maxlength: [50, "Title cannot be more than 50 characters long"]
        }, 
        author:{
            type: String,
            required: [true, "Author is required"],
            minlength: [3, "Author name must be atleast 3 characters long"],
            maxlength: [50, "Author name cannot exceed 50 characters long"],
            match: [/^[A-Za-z,.-_\s]+$/,"Author name can only contain alphabetical characters, space and special characters(,._-\s)"]
        },
        publication_date:{
            type: Date,
            required: [true, "Publication date is required"],
            min:[`1900-01-01`,"Publication date cannot be before 1900"],
            max:[new Date(), 'The publication date cannot be future date']
        },
    },
        {timestamps: true}
)