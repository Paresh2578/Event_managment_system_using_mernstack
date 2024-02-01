

module.exports = async(email)=>{
    let validAdmin;
    try{
        validAdmin = await Admin.findOne({email : email});

        if(validAdmin){
            return true;
         }else{
            return false;
         }
       }catch(err){
          return false;
       }
}