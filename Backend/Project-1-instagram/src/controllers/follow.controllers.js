const followModel = require('../models/follow.models')

async function userControllers(req,res){

    const followersUser = req.user.username;
    const followeeUser = req.params.username

    
    if(followersUser === followeeUser){
        return res.status(400).json({
            message : "you cannot follow yourself"
        })
    }

   

    const isUserAlreadyFollowing = await followModel.findOne({
        followers : followersUser,
        followee : followeeUser
    })
    if(isUserAlreadyFollowing){
        return res.status(400).json({
            message:"you are already following this user",
            
        })
    }

    const followRecords = await followModel.create({
        followers : followersUser,
        followee : followeeUser
    })
    res.status(201).json({
        message : `you are following ${followeeUser}`,
        followRecords
    })


}

async function unfollowController(req, res) {

    const followersUser = req.user.username;
    const followeeUser = req.params.username;

    // Check self-unfollow
    if (followersUser === followeeUser) {
        return res.status(400).json({
            message: "You cannot unfollow yourself"
        });
    }

    // Find and delete follow relationship
    const unfollowRecord = await followModel.findOneAndDelete({
        followers: followersUser,
        followee: followeeUser
    });

    // Check whether relationship existed
    if (!unfollowRecord) {
        return res.status(404).json({
            message: "You are not following this user"
        });
    }

    return res.status(200).json({
        message: `You have unfollowed ${followeeUser}`,
        unfollowRecord
    });
}
module.exports = {
    userControllers,
    unfollowController
}