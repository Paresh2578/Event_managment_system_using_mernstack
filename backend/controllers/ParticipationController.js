const SingleParticipation = require("../models/singleParticipation");
const GroupParticipation = require("../models/groupParticipation");
const SubEvent = require("../models/subEvent");

//utils
const checkValidAdmin = require("../utils/checkValidAdmin");
// const res = require("express/lib/response");

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
      
      if (
        singleParticipation.Enrollment == Enrollment ||
        singleParticipation.email == email
        ) {
          studentAreAlreadyRegister = true;
          break;
        }
      }
      
    if (studentAreAlreadyRegister) {
      return resp.status(200).json({
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

    resp.status(200).json({
      success: true,
      id: singleparticipation._id,
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
    let { eventName, subEventName, subEventId , university, groupName } = req.body;
    let members = req.body.members;

    let subEvent = await SubEvent.findOne({ _id: subEventId });
    let groupParticipationList = subEvent.groupParticipation;

    //check student already group member in this event
    let studentAlreadyRegister = false;

    for (var alredyGroupParticipationId of groupParticipationList) {
      let groupParticipationData = await GroupParticipation.findOne({
        _id: alredyGroupParticipationId,
      });

      for (var memberData of groupParticipationData.members) {
        for (var newRegisterMemberData of members) {
          if (
            memberData.Enrollment == newRegisterMemberData.Enrollment ||
            memberData.email == newRegisterMemberData.email
          ) {
            studentAlreadyRegister = true;
            break;
          }
        }
      }
    }

    if (studentAlreadyRegister) {
      return resp.status(200).json({
        success: false,
        message: "alrady register in this event ",
      });
    }

    //create group participation
    let groupParticipation = new GroupParticipation({
      eventName,
      subEventName,
      university,
      subEventId,
      groupName,
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
      id: groupParticipation._id,
    });
  } catch (error) {
    resp.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.getSingleParticipationsList = async (req, resp) => {
  try {
    //verify admin
    if (!checkValidAdmin(req.adminData.email)) {
      return resp.status(500).json({
        success: false,
        message: "invalid admin",
      });
    }

    let subEvent = await SubEvent.findOne({ _id: req.params.id });
    let singleParticipationList = [];

    for (var singleParticipationId of subEvent.singleParticipation) {
      let singleParticipationInfo = await SingleParticipation.findOne({
        _id: singleParticipationId,
      });

      singleParticipationList.push(singleParticipationInfo);
    }

    resp.status(201).json({
      success: true,
      data: singleParticipationList,
    });
  } catch (error) {
    resp.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.getGroupParticipationsList = async (req, resp) => {
  try {
    //verify admin
    if (!checkValidAdmin(req.adminData.email)) {
      return resp.status(500).json({
        success: false,
        message: "invalid admin",
      });
    }

    let subEvent = await SubEvent.findOne({ _id: req.params.id });
    let groupParticipationList = [];

    for (var groupParticipationId of subEvent.groupParticipation) {
      let groupParticipationInfo = await GroupParticipation.findOne({
        _id: groupParticipationId,
      });

      groupParticipationList.push(groupParticipationInfo);
    }

    resp.status(200).json({
      success: true,
      data: groupParticipationList,
    });
  } catch (error) {
    resp.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.deleteSingleParticipations = async (req, resp) => {


  try {
    let singleParticipation = await SingleParticipation.findOne({ _id: req.params.id });
    await SingleParticipation.deleteOne({ _id: req.params.id });
    
    //remove singleParticiptioId from SingleParticipatioList in SubEvent
    let subEvent = await SubEvent.findOne({ _id: singleParticipation.subEventId });
    let singleParticipationList = subEvent.singleParticipation;
    singleParticipationList = singleParticipationList.filter((s)=> s != req.params.id);
    
    
   await SubEvent.updateOne({ _id: singleParticipation.subEventId }, {$set : {singleParticipation : singleParticipationList}});
    resp.status(200).json({
      success: true,
    });
  } catch (error) {
    resp.status(500).json({
      success: false,
    });
  }
};

exports.deleteGroupParticipations = async (req, resp) => {
  try {
     let groupParticipation = await GroupParticipation.findOne({_id : req.params.id});
    await GroupParticipation.deleteOne({ _id: req.params.id });

     //remove groupParticipationId from GroupParticipatioList in SubEvent
     let subEvent = await SubEvent.findOne({ _id: groupParticipation.subEventId });
     let groupParticipationList = subEvent.groupParticipation;
     groupParticipationList = groupParticipationList.filter((s)=> s != req.params.id);

     await SubEvent.updateOne({ _id: groupParticipation.subEventId }, {$set : {groupParticipation : groupParticipationList}});
   

    resp.status(200).json({
      success: true,
    });
  } catch (error) {
    resp.status(500).json({
      success: false,
    });
  }
};
