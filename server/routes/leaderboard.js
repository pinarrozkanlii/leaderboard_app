const mongoose = require('mongoose');
const { db } = require('../models/Players');

module.exports = function(app,db){
    app.put('/leaderboard/:username',(req,res) =>{
        const username = req.params.username;
        const updatedMoney = {username:req.body.username,total_money:req.body.score}
        db.collection('total_money').update(username,updatedMoney,(err,result)=>{
            if (err){
                res.send({'error':'an error has occures'});
            } else {
                res.send(updatedMoney);
            }
        })
    })
    app.get('/leaderboard', (req, res) => {
        client.zrevrange("leaderboard_set", 0, -1, "withscores", function(err, leaderboard) {
            if (err) {
                next(err);
                return err;
            } else {
                var leaderboardArr = new Array(leaderboard.length/2);           
                var fetchedUserCount = 0;   
    
                for (let i = 0; i < leaderboard.length; i += 2) {
                    client.hmget(leaderboard[i], ["name", "country"], function(err, playerData) {
                        const player = {
                            rank: (i/2) + 1,
                            updatedMoney: leaderboard[i+1],
                            username: playerData[0],
                            country: playerData[1]
                        }
                        leaderboardArr[i/2] = player;
                        fetchedUserCount++;
    
                        if (fetchedUserCount == leaderboard.length/2) {
                            res.send(leaderboardArr);
                        }
                    })
                }
            }
        })
 	 });
}
