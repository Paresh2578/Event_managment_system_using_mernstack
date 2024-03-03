const SubEvent = require("../models/subEvent");
const Winner = require("../models/winner");
const GroupParticipations = require('../models/groupParticipation')
const SingleParticipations = require('../models/singleParticipation')


exports.getWinner = async(req , res)=>{
   try{
    try{
        let winner = await Winner.findOne({subEventId : req.params.id});
        res.status(200).json({
            success: true,
            data: winner,
        })
    }catch(error){
        throw new Error("sorry , something worng");
    }

   }catch(error){
    res.status(500).json({
        success: false,
        message: error.message,
      });
   }
}


exports.addWinner = async(req , res)=>{
    try{
     let winner = await Winner.findOne({subEventId : req.params.id});
     let subEvent = await SubEvent.findOne({_id : req.params.id});

     let {first,secound, third} = req.body;

     console.log(req.body);
     console.log("winner : " , winner);

     if(winner !=  null){
        
        await Winner.updateOne(
            {_id : winner._id},
            {$set : {...winner._doc , first : first, secound :secound , third : third }}
        )
     }else{
        let newWinner = new Winner({subEventId : req.params.id , first : first , secound : secound , third : third});
        await newWinner.save();

        console.log("subEvent after : " , subEvent);

        subEvent = {...subEvent , winnerId : newWinner._id};

        console.log("subEvent" , subEvent);

       
        // add winner id in subEvent
        await SubEvent.updateOne(
            {_id : req.params.id},
            {$set : {...subEvent._doc , winnerId : newWinner._id}}
        )
     }

     res.status(200).json({
        success: true,
      });
    }catch(error){
     res.status(500).json({
         success: false,
         message: error.message,
       });
    }
 }

 exports.getAllWinner = async(req , res)=>{
    try{
       let winnerData = [];
        let winners = await Winner.find();

        for(var winner of winners){
            console.log(winner);
            let participation = {subEventId: winner.subEventId};
            let subEvent = await SubEvent.findOne({_id :winner.subEventId })


    //         "first": "65e2fe6d73d6a43fe8e1757f",
    //   "secound": "65e2fe7d73d6a43fe8e1758b",
    //   "third": "",

    participation = {...participation , subEventName : subEvent.subEventname};
            if(subEvent.isGroup){

                let groupParticipationList = await GroupParticipations.find();

                for(var groupParticipation  of groupParticipationList){
                    if(groupParticipation._id == winner.first){
                        participation = {...participation , first : groupParticipation.groupName }
                    }else if(singleParticipation._id == winner.secound){
                      participation = {...participation , secound : groupParticipation.groupName }
                  }else if(singleParticipation._id == winner.third){
                      participation = {...participation , third : groupParticipation.groupName }
                  }
                }


            }else{
                let singleParticipationList = await SingleParticipations.find();

              for(var singleParticipation  of singleParticipationList){
                  if(singleParticipation._id == winner.first){
                      participation = {...participation , first : singleParticipation.name }
                  }else if(singleParticipation._id == winner.secound){
                    participation = {...participation , secound : singleParticipation.name }
                }else if(singleParticipation._id == winner.third){
                    participation = {...participation , third : singleParticipation.name }
                }
              }

                // participation = {...participation , firstName : first.name};
            }

            winnerData.push(participation);
            // let first = await 
        }

     res.status(200).json({
        success: true,
        data : winnerData
      });
    }catch(error){
     res.status(500).json({
         success: false,
         message: error.message,
       });
    }
 }


