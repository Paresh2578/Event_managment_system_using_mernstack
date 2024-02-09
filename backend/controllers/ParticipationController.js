const SingleParticipation = require("../models/singleParticipation");
const GroupParticipation = require("../models/groupParticipation");
const SubEvent = require("../models/subEvent");

//utils
const checkValidAdmin = require("../utils/checkValidAdmin");

exports.singleRegister = async (req, resp) => {
  try {
    let {
      eventName,
      subEventName,
      subEventId,
      name,
      Enrollment,
      email,
      mobile,
    } = req.body;

    let subEvent = await SubEvent.findOne({ _id: subEventId });
    let singleParticipationList = subEvent.singleParticipation;

    //check student already register in this event
    let studentAreAlreadyRegister = false;
    for (var alredySingleParticipationId of singleParticipationList) {
      let singleParticipation = await SingleParticipation.findOne({
        _id: alredySingleParticipationId,
      });

      if (singleParticipation.Enrollment == Enrollment) {
        studentAreAlreadyRegister = true;
        break;
      }
    }

    if(studentAreAlreadyRegister){
        return resp.status(500).json({
            success: false,
            message: "alrady register in this event ",
          });
    }

    
      //create single participation
      let singleparticipation = new SingleParticipation({
        eventName,
        subEventName,
        subEventId,
        name,
        Enrollment,
        email,
        mobile,
      });
      await singleparticipation.save();
      let singleParticipationId = singleparticipation._id;

      //add singleparticiption id in subEvent
      await SubEvent.updateOne(
        { _id: subEventId },
        {
          $set: {
            singleParticipation: [
              ...singleParticipationList,
              singleParticipationId,
            ],
          },
        }
      );
    

    resp.status(201).json({
      success: true,
    });
  } catch (error) {
    resp.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.groupRegister = async (req, resp) => {
  try {
    let { eventName, subEventName, subEventId , groupName } = req.body;
    let members = req.body.members;

    let subEvent = await SubEvent.findOne({ _id: subEventId });
    let groupParticipationList = subEvent.groupParticipation;

    //check student already group member in this event
    let studentAlreadyRegister = false;

    for(var alredyGroupParticipationId of groupParticipationList){
         let groupParticipationData = await GroupParticipation.findOne({_id : alredyGroupParticipationId});

         for(var memberData of groupParticipationData.members){
             for(var newRegisterMemberData of members){
                if(memberData.Enrollment == newRegisterMemberData.Enrollment){
                    studentAlreadyRegister = true;
                    break;
                }
             }
         }
    }

    if(studentAlreadyRegister){
        return resp.status(500).json({
            success: false,
            message: "alrady register in this event ",
          });
    }


    //create group participation
    let groupParticipation = new GroupParticipation({
      eventName,
      subEventName,
      subEventId,
      groupName , 
      members,
    });
    await groupParticipation.save();
    let groupParticipationId = groupParticipation._id;

    //add singleparticiption id in subEvent
    
    await SubEvent.updateOne(
      { _id: subEventId },
      {
        $set: {
          groupParticipation: [...groupParticipationList, groupParticipationId],
        },
      }
    );

    resp.status(201).json({
      success: true,
    });
  } catch (error) {
    resp.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.getSingleParticipationsList =  async (req , resp)=>{
    try{
        
      //verify admin
      if(!checkValidAdmin(req.adminData.email)){
       return  resp.status(500).json({
            success: false,
            message: "invalid admin",
          });
      }

      let subEvent = await SubEvent.findOne({_id : req.params.id})
      let singleParticipationList = [];

      for(var singleParticipationId of subEvent.singleParticipation){
           let singleParticipationInfo = await SingleParticipation.findOne({_id : singleParticipationId});

           singleParticipationList.push(singleParticipationInfo)
      }


      resp.status(201).json({
        success: true,
        data : singleParticipationList
      });



    }catch(error){
        resp.status(500).json({
            success: false,
            message: error,
          });
    }
}


exports.getGroupParticipationsList =  async (req , resp)=>{
  try{
      
    //verify admin
    if(!checkValidAdmin(req.adminData.email)){
     return  resp.status(500).json({
          success: false,
          message: "invalid admin",
        });
    }

    let subEvent = await SubEvent.findOne({_id : req.params.id})
    let groupParticipationList = [];

    for(var groupParticipationId of subEvent.groupParticipation){
         let groupParticipationInfo = await GroupParticipation.findOne({_id : groupParticipationId});

         groupParticipationList.push(groupParticipationInfo)
    }


    resp.status(201).json({
      success: true,
      data : groupParticipationList
    });



  }catch(error){
      resp.status(500).json({
          success: false,
          message: error,
        });
  }
}
