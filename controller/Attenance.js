import attenance from "../schema/Attenance.js"

const Attenance=async(req,res)=>{
    // const findAttenance=await attenance.find({studentname:req.body.studentname})
    let data={
        regno:req.body.regno,
        studentname:req.body.studentname,
        dept:req.body.dept,
        date:req.body.date,
        DayOrder:req.body.DayOrder,
        Faculty:req.body.Faculty,
        status:req.body.status   
    }
    try {
        var insert=await attenance.insertMany([data])
        res.send(insert)
    } catch (error) {
        res.send(error.message)
    }
}

const Update=async(req,res)=>{
    const upd=await attenance.findOne({$and:[{regno:req.body.regno},{date:req.body.date}]},{})
    if(upd.length<=0){
        return res.send("There Is No Absent Student");
    }else{
        const Updateone=await attenance.findOneAndUpdate({regno:upd.regno},{$set:{status:"Present"}},{new:true})
        return res.send(Updateone)
    }
}
export {Attenance,Update}