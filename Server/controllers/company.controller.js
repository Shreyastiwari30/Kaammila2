import {Company} from '../models/CompanyModel.js';

export const registerCompany= async(req,res)=>{
   try{
    const {companyname} =req.body;
    if(!companyname){
        return res.status(400).json({
            message: "Company name is required",
            success: false
        })
    }
    let company=await Company.findOne({name: companyname})
    if(company){
        return res.status(400).json({
            message: "Company already exist",
            success: false
        })
    }

    company=await Company.create({
         name: companyname,
         userid: req.id
    })

    return res.status(201).json({
            message: "Company created succesfully",
            company,
            success: false
    })

   }
   catch(error){
       console.log(error);
   }
}

export const getcompany= async (req,res)=>{
    try{
        const userid=req.id;
        const companies=await Company.find({userid});
        if(!companies){
             return res.status(404).json({
            message: "Company not found",
            success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    }
    catch(error){
       console.log(error);
    }
}

export const getcompanyById= async (req,res)=>{
    try{
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
           if(!company){
             return res.status(404).json({
            message: "Company not found",
            success: false
           })
        }
        return res.status(200).json({
            company,
            success: true
           })
    }
    catch(error){
       console.log(error);
    }
}

export const updateCompany= async (req,res)=>{
    try{
           const {name,description,website,location}=req.body;
           const file=req.file;

           const updatedata={name,description,website,location};
           const company=await Company.findByIdAndUpdate(req.params.id,updatedata,{new: true});
           
           if(!company){
               return res.status(404).json({
              message: "Company not found",
              success: false
             })
           }
           return res.status(200).json({
            message:"Company information updated.",
            success:true
           })

        }
    catch(error){
       console.log(error);
    } 
}
