import express from "express";
import User from "../models/Users.js";

const userRouter = express.Router();


/**
 * POST create a new user
 */
userRouter.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
});


/**
 * GET get all users
 */
userRouter.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: e.message });
    }
})

/**
 * GET user by the id
 */
userRouter.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(201).json(user);
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: e.message });
    }
})

//Update user 
userRouter.patch("/:id", async(req,res) =>{
  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,   //update user
      {new: true} //return updated document in postman
    );

    if(!updatedUser) res.send("User not found").status(404);
    else res.send(updatedUser).status(200)

  }catch(e){
    console.error(e);
    res.status(400).json({ message: e.message });
  }
})

export default userRouter;