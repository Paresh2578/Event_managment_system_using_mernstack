const Coordinators = require('../models/coordinator');
const SubEvents = require('../models/subEvent');
const Events = require('../models/event');
const Admin = require('../models/admin');


exports.createEvnet = async (req , resp)=>{
   try{
      //check admin auth
      let validAdmin;
      try{
       validAdmin = await Admin({email : req.adminData.email});
      }catch(err){
         const error = new Error("authentication error");
        throw error;
      }

      if(!validAdmin){
         const error = new Error("Invalid credentials, could not log you in.");
        throw error;
      }
    

      // coordinatorName data
      let {coordinatorName , email , password} = req.body;
      let coordinator = new Coordinators({coordinatorName , email , password});
      await coordinator.save();
      let coordinatorId = coordinator._id;

      // subEvent data
      let {subEventname ,category , time , seats , groupMember ,isGroup , subEventPosterUrl } = req.body;
      let subEvent = new SubEvents({subEventname , category,time  , seats , groupMember , isGroup , subEventPosterUrl , coordinatorId})
      await subEvent.save();
      let subEventId = subEvent._id;

      console.log(subEventId);

      //event data
      let {name , date , eventPosterUrl } = req.body;
      let subEvents = [subEventId];
      let event = new Events({name , date , eventPosterUrl , subEvents});
      await event.save();

      resp.status(201).json({
         success: true,
       });

   }catch(error){
    resp.status(500).json({
        success: false,
        message: error,
      });
   }
}

exports.editEvent = async (req , resp)=>{
   try{
      //check admin auth
      let validAdmin;
      try{
       validAdmin = await Admin({email : req.adminData.email});
      }catch(err){
         const error = new Error("authentication error");
        throw error;
      }

      if(!validAdmin){
         const error = new Error("Invalid credentials, could not log you in.");
        throw error;
      }


      let event = await Events.updateOne(
         {id : req.params.id},
         {$set : req.body}
      )

      
      resp.status(201).json({
         success: true,
       });

   }catch(error){
      resp.status(500).json({
         success: false,
         message: error,
       });
   }
}

exports.deletEvent = async (req , resp)=>{
   try{
      //check admin auth
      let validAdmin;
      try{
       validAdmin = await Admin({email : req.adminData.email});
      }catch(err){
         const error = new Error("authentication error");
        throw error;
      }

      if(!validAdmin){
         const error = new Error("Invalid credentials, could not log you in.");
        throw error;
      }

      console.log("done");

      //delete corrdinator
      let event = await Events.findOne({_id  : req.params.id});

      for(let i=0;i<event.subEvents.length;i++){
         let subEvents = await SubEvents.find({_id : event.subEvents[i]});
         
         //coordinator delete
         for(let j=0;j<subEvents.length;j++){
            await Coordinators.deleteOne({_id : subEvents[j].coordinatorId});
         }

         //subEvent delete
         await SubEvents.deleteOne({_id : event.subEvents[i]});
      }

         // event delete
       await Events.deleteOne(
         {id : req.params.id}
      )

      
      resp.status(201).json({
         success: true,
       });

   }catch(error){
      resp.status(500).json({
         success: false,
         message: error,
       });
   }
}

