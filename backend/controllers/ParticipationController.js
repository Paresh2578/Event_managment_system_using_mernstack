const SingleParticipation = require("../models/singleParticipation");
const GroupParticipation = require("../models/groupParticipation");
const SubEvent = require('../models/subEvent');


exports.singleRegister = async (req , resp)=>{
    try{
        let {eventName , subEventName  , subEventId,  name ,  Enrollment , email ,mobile } = req.body;

        //create single participation
        let singleparticipation = new SingleParticipation({eventName , subEventName  , subEventId,  name ,  Enrollment , email ,mobile });
        await singleparticipation.save();
        let singleParticipationId = singleparticipation._id;

         
        //add singleparticiption id in subEvent
        let subEvent = await SubEvent.findOne({_id : subEventId});
        let singleParticipationList = subEvent.singleParticipation;
        await SubEvent.updateOne(
            {_id : subEventId},
            {$set : {singleParticipation : [...singleParticipationList , singleParticipationId]}}
        );



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

exports.groupRegister = async (req , resp)=>{
    try{

        let {eventName ,subEventName ,  subEventId} = req.body;
        let members = req.body.members;


         //create group participation
         let groupParticipation = new GroupParticipation({eventName , subEventName  , subEventId,   members });
         await groupParticipation.save();
         let groupParticipationId = groupParticipation._id;




        //add singleparticiption id in subEvent
        let subEvent = await SubEvent.findOne({_id : subEventId});
        let groupParticipationList = subEvent.groupParticipation;
        console.log(members);

        await SubEvent.updateOne(
            {_id : subEventId},
            {$set : {groupParticipation : [...groupParticipationList , groupParticipationId]}}
        );



        
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