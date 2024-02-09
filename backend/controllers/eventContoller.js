const Coordinators = require('../models/coordinator');
const SubEvents = require('../models/subEvent');
const Events = require('../models/event');
const Admin = require('../models/admin');


exports.getAllEvent = async (req , resp) =>{
   try{
       let events = await Events.find();
       resp.send({success : true , data : events});
   }catch(error){
      resp.status(500).json({
         success: false,
         message: error,
       });
   }
}

exports.createEvnet = async (req , resp)=>{
   try{
      //check admin auth
      let validAdmin;
      try{
       validAdmin = await Admin.findOne({email : req.adminData.email});
      }catch(err){
         const error = new Error("authentication error");
        throw error;
      }
      
      
      if(!validAdmin){
         const error = new Error("Invalid credentials, could not log you in.");
         throw error;
      }
      
      // coordinatorName data
      let {coordinatorName , email , mobile} = req.body;
      let coordinator = new Coordinators({coordinatorName , email , mobile});
      await coordinator.save();
      let coordinatorId = coordinator._id;
      
      //create empty event 
      let {name , date , eventPosterUrl } = req.body;
      let subEvents = [];
      let event = new Events({name , date , eventPosterUrl , subEvents});
      await event.save();
      let eventId = event._id;
      
      // create subEvent data
      let {subEventname ,category , time , seats , groupMember ,isGroup , subEventPosterUrl} = req.body;
      let subEvent = new SubEvents({eventId ,  subEventname , category,time  , seats , groupMember , isGroup , subEventPosterUrl , coordinatorId})
      await subEvent.save();
      let subEventId = subEvent._id;

      //add subevent id in this event
      await Events.updateOne(
         {_id : eventId},
         {$set : {subEvents : [subEventId]}}
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

exports.editEvent = async (req , resp)=>{
   try{
      //check admin auth
      let validAdmin;
      try{
       validAdmin = await Admin.findOne({email : req.adminData.email});
      }catch(err){
         const error = new Error("authentication error");
        throw error;
      }

      if(!validAdmin){
         const error = new Error("Invalid credentials, could not log you in.");
        throw error;
      }


      let event = await Events.updateOne(
         {_id : req.params.id},
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
       validAdmin = await Admin.findOne({email : req.adminData.email});
      }catch(err){
         const error = new Error("authentication error");
        throw error;
      }

      if(!validAdmin){
         const error = new Error("Invalid credentials, could not log you in.");
        throw error;
      }

      //delete corrdinator
      let event = await Events.findOne({_id  : req.params.id});

      for(let i=0;i<event.subEvents.length;i++){
         let subEvents = await SubEvents.findOne({_id : event.subEvents[i]});
         
         //coordinator delete
         // for(let j=0;j<subEvents.length;j++){
            await Coordinators.deleteOne({_id : subEvents.coordinatorId});
         // }

         //subEvent delete
         await SubEvents.deleteOne({_id : subEvents._id});
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


exports.getSubEvents = async (req , resp)=>{
   try{
      //find event
      let event = await Events.findOne({_id : req.params.id});

      let allSubEvents = [];

      for(let i=0;i<event.subEvents.length;i++){
          let subEvent = await SubEvents.findOne({_id :  event.subEvents[i]});
          let coordinatorData = await Coordinators.findOne({_id : subEvent.coordinatorId});

          let subEventDataAndCoordinatorData = subEvent;
          subEventDataAndCoordinatorData = {...subEventDataAndCoordinatorData._doc , coordinator : coordinatorData}
          allSubEvents.push(subEventDataAndCoordinatorData);
      }

      resp.send({success : true , data : allSubEvents});

   }catch(error){
      resp.status(500).json({
         success: false,
         message: error,
       });
   }
}