
class User{
    constructor(
        uid,name,emailID,isPodcaster,online,live,score
    )
    {
        this.uid= uid;
        this.name= name;
        this.emailID= emailID;
        this.isPodcaster= isPodcaster;
        this.online= online;
        this.live= live;
        this.score= score
    }
}

module.exports= User