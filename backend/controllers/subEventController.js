const Coordinators = require('../models/coordinator');
const SubEvents = require('../models/subEvent');
const Events = require('../models/event');
const Admin = require('../models/admin');


exports.createSubEvnet = async (req , resp)=>{
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
      
      
      // subEvent data
      let {subEventname ,category , time , seats , groupMember ,isGroup , subEventPosterUrl , discription  , paid , pay} = req.body;
      let {eventId} = req.params;
      let newSubEvent = new SubEvents({eventId ,  subEventname , category,time  , seats , groupMember , isGroup , pay,paid , subEventPosterUrl , discription , coordinatorId})
      await newSubEvent.save();

      //add to eventId in eventDocument
      let event = await Events.findOne({_id : eventId});
      let subEvents = event.subEvents;
      subEvents = [...subEvents , newSubEvent._id];


      await Events.updateOne(
         {_id : eventId},
         {$set : {subEvents : subEvents}}
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

exports.editSubEvent = async (req , resp)=>{
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


      //subEventdata update
       await SubEvents.updateOne(
         {_id : req.params.id},
         {$set : req.body}
      )


      //corrdinator update
      let subEvent = await SubEvents.findOne({_id : req.params.id});
      await Coordinators.updateOne(
         {_id : subEvent.coordinatorId},
         // {$set : updateCoordinatorDitals}
         {$set :req.body.coordinator}
      )
      // let coordinator = await Coordinators.findOne({_id : subEvent.coordinatorId});
      
// 
      // console.log(req.body.coordinator);

      // let updateCoordinatorDitals = {
      //   coordinatorName : req.body.coordinator.coordinatorName ? req.body.coordinator.coordinatorName : coordinator.coordinatorName,
      //   email : req.body.coordinator.email ? req.body.coordinator.email : coordinator.email,
      //   mobile : req.body.coordinator.mobile ? req.body.coordinator.mobile : coordinator.mobile
      // }
      

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

exports.deletSubEvent = async (req , resp)=>{
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

         let subEvents = await SubEvents.findOne({_id : req.params.id});

         //coordinator delete
            await Coordinators.deleteOne({_id : subEvents.coordinatorId});

            //update subEvents arr in event
            let event = await Events.findOne({_id : subEvents.eventId});

            let subEventIds = event.subEvents;
            console.log(subEventIds);
            subEventIds = subEventIds.filter((id)=> id !=req.params.id )
         console.log('and : ' , subEventIds);


            await Events.updateOne(
               {_id : subEvents.eventId},
               {$set : {subEvents:subEventIds}}
            )

            

         //subEvent delete
         await SubEvents.deleteOne({_id : subEvents._id});

      
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



exports.getSubEvents = async (req, resp) => {
   try {
     //find event
     let event = await Events.findOne({ _id: req.params.id });
 
     let allSubEvents = [];
 
     for (let i = 0; i < event.subEvents.length; i++) {
       let subEvent = await SubEvents.findOne({ _id: event.subEvents[i] });
       let coordinatorData = await Coordinators.findOne({
         _id: subEvent.coordinatorId,
       });
 
       let subEventDataAndCoordinatorData = subEvent;
       subEventDataAndCoordinatorData = {
         ...subEventDataAndCoordinatorData._doc,
         coordinator: coordinatorData,
       };
       allSubEvents.push(subEventDataAndCoordinatorData);
     }
 
     resp.send({ success: true, data: allSubEvents });
   } catch (error) {
     resp.status(500).json({
       success: false,
       message: error,
     });
   }
 };


 exports.getCoordinator = async (req, resp) => {
   try {
     //find event
     let coordinator = await Coordinators.findOne({ _id: req.params.id });
 
     resp.send({ success: true, data: coordinator });
   } catch (error) {
     resp.status(500).json({
       success: false,
       message: error,
     });
   }
 };