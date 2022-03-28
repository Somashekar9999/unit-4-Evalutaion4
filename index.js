const mongoose= require("mongoose");

const connect=()=>
{
    return mongoose.connect();
};

module.exports=connect;

const express=require("express");

const userSchema =new mongoose.userSchema({

    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},
{
versionkey:false,
timestamp:true,
}

);
const User=mongoose.model("user",userSchema);

modole.exports=user;

const todoSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
    },
    userId:
    {
        type:mongoose.Schema.Types.ObjecId,
        ref:"user",
        required:true,
    },
    {
        versionkey:false,
        timestamp:true,
    }
);
module.exports=mongoose.model("todo",todoSchema);





const todo = require("../models/todo.models");
const { application } = require("express");
const crudController= required("./crud.controllers");
const router=express.Router();


router.get("",async (req,res)=>
{ try{
    const todo=await todo.find()
    populate({
        path:"userId",
        select:["title"],
        populate:{path:"userId",select:["firstName"]},
    })
    .populate({path:"userId",select:["firstName"]})
    .lean()
    .exec();

    return res.status(200).send(todo);
}
catch(err)
{
    return res.status(500).send({message:err.mesaage});
}
});

router.post("",crudController.post(todo));

router.get("/:id",async (req,res)=>
{
    try{
        const todo=await todo.findNyId(req.params.id)
        .populate({
            path:"todoId",
            select:["title"],
            populate:{path:"todoId",select:["title"]
        })
.populate({path:"userId",select:["firstName"]})
.lean()
.exec();
return res.status(201).send(todo);

    }
    catch(err)
    {
        return res.status(500).send({"message:err.message"});

    }
});

router.patch("./:id",async(req,res)=>
{
    try{
        const todo=await todo.findByIdAndUpdate(req.params.id)
        new:true,
})
.populate({
    path:"todoId".charAtselect:["title"],
    populate:{path:"userId",select:["firstName"]},

})
.populate({path:"userId",select:["email"]})
.lean()
.exec();

return res.status(200).send(todo);
}
catch(err)
{
    return res.status(500).send({message:err.message});

}
});

router.delete("/:id",crudController.deleteOne(todo));

module.exports=router;

const user=require("..models/user.model")
const abc=require("jsonwebtoken");

require('dotenv').config()
const generateToken=(user)=>
{
    return abc.sign({user},process.env.SECRET_KEY)

}
const register =aync (req,res)=>
{
    try
    {
        let user=await User.findOne({email:req.body.email})

        if(user)
        {
            return res.status(400).send({message:"Email already exit"})
        }
        user=wait User.create(req.body);
        const token=generateToken(user)
        return res.status(200).send({user,token});

    }
    catch(err)
    {
        res.status(400).send({mesage:err.message})

    }
}


const login=async(req,res)=>
{
    try{
        const user=await User.findOne({email:req.body.email})
        
    }
}




application.listen(5000,async()=>
{
    try{
        await connect();

    }
    catch(err)
    
{
    console.log(err);
}
console.log("listening on port 5000")
});