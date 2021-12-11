const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { doc } = require('prettier');

const serviceAccount = require('../vue-podcast-firebase-adminsdk-2xwwm-284a62f752.json');

initializeApp({
  credential: cert(serviceAccount)
});

const firestore = getFirestore();
const addUser = async(req,res,next) =>{
    try {
        console.log(req)
        const {userID, name, isPodcaster, emailId} = req.body
        var score;
        if(req.body.isPodcaster){
            score = 0
        }   
        else{
            score = null
        }
        const data = {
            uid: userID,
            name:name,
            isPodcaster:isPodcaster,
            online:true,
            live:false,
            emailId: emailId,
            score:score
        }

       const success= await firestore.collection('userprofiles').doc(userID).set(data);
       res.json(success) 
       
    } catch (error){
        res.status(500).send(error)
    }
}

const getUser = async (req,res,next)=>{
    
    try{
        var message

        const userID= req.params.userID;
        const user = await firestore.collection('userprofiles').doc(userID).get()
        console.log(user)
        if(!user.exists){
            var success=false;
            res.send(success)
            // message=false
            // res.send({message})
        }
        else{
            var success= user.data()
            res.send(success)
            // message=user.data()
            // res.send({message})
        }
        

    } catch(error){
        console.log(error)
    }
}

const getPodcaster = async(req,res)=>{
    try{
        const user = firestore.collection('userprofiles').where('isPodcaster','==',true).get()
        var podcaster=[]
        user.forEach(user=>{
            console.log(user.data())
            podcaster.push(user.data)
        })
        console.log(podcaster)
        res.json({podcaster})
    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

const startPodcast = async(req,res)=>{
    try{
        console.log("!!!!!!!!!!!see it!!!!!!!")
            console.log(req.body)
            console.log("!!!!!!!!!!!end it!!!!!!!")
        const podcast={
            title: req.body.title,
            ownerUID:req.body.ownerUID,
            joinees:[],
            started_at: Date.now(),
            ended_at:null,
            name:req.body.name
        }
        const podcasts = await firestore.collection('sessions').doc(req.body.title).set(podcast)
        res.json(podcasts)
    }
    catch (error){
        console.log(error)
        res.status(400).send(error)
    }
}

const getSessions = async(req,res)=>{
    try{
        
        const getsession= firestore.collection('sessions')
        const session= await getsession.where('ended_at','==',null).get()
        const sessions=[]
        if(session.empty){
            console.log('no session')
        }
        else{
            // Array.prototype.forEach.call(session,doc=>{
            //     sessions.push(doc.data())
            //     console.log(doc.id,'=>',doc.data())
            // })
             session.forEach(doc=>{
                 sessions.push(doc.data())
                 console.log(doc.id,'=>',doc.data())
             })
            res.json(sessions)
        }
    }
    catch(error){
        res.status(400).send(error)
        console.log(error)
    }
}

const joinSession = async(req,res)=>{
    var admin = require('firebase-admin')
    try{
        console.log(req.body.podcast.title)
        
        const join = await firestore.collection('sessions').doc(req.body.podcast.title)
        const joinsession = await join.update({joinees:admin.firestore.FieldValue.arrayUnion(req.body.joinee)})
        console.log(joinsession)
        const doc = await join.get()
        if(!doc.exists){
            console.log('No such documents');
        }
        else{
            console.log(doc.data())
            res.json(doc.data());
        }

    }
    catch(error){
        
        console.log(error)
    }
}

const endSession = async(req,res)=>{
        try {
            console.log("!!!!!!!!!!!see it!!!!!!!")
            console.log(req.body)
            console.log("!!!!!!!!!!!end it!!!!!!!")
            const {title,uid} = req.body

            const recordingsRef = firestore.collection("sessions").doc(title);
            var doc = await recordingsRef.get();
            var resp = await recordingsRef.update({ended_at:Date.now()})
            console.log(resp)
            const userprofileRef = firestore.collection("userprofiles").doc(uid);
            doc = await userprofileRef.get();
            let score = doc.data().score + 1;
            resp = await userprofileRef.update({score:score});
            res.json(resp)
        } catch (error) {
            console.log(error);
            res.send(error)
        }

}

module.exports={
    addUser,
    getUser,
    getPodcaster,
    startPodcast,
    getSessions,
    joinSession,
    endSession
}