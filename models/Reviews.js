import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        bookid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Books
        },
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Users
        },
        rating:{
            type: Number,
            min: [1, "Rating must be atleast 1"],
            max: [5, "Rating annot be more than 5"]
        },
        review:{
            type: String,
            maxlength:[500, "Please enter not more than 500 characters"]
        }
    }
)