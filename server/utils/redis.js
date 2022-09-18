const mongoose =require('mongoose');
const redis = require('redis');
const util = require('util');
const keys=require('../configs/keys');

const client = redis.createClient(keys.REDIS_URL);
client.hget = util.promisify(client.hget);


const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = { expire : 86400}){
    this.useCache = true;
    this.expire = options.expire;
    this.hashKey=JSON.stringify(options.key || this.mongooseCollection.name);

    return this;
}

mongoose.Query.prototype.exec=async function(){
    if(!this.useCache){
        return await exec.apply(this,arguments)
    }


const key = JSON.stringify({
    ...this.getQuery(),
    collection:this.mongooseCollection.name
});

const cacheValue = await client.hget(this.hashKey,key);

if(!cacheValue){
    const result = await exec.apply(this,arguments);
    client.hSet(this.hashKey,key,JSON.stringify(result));
    client.expire(this.hashKey,this.expire);

    return result;
}


const doc = JSON.parse(cachValue);
return Array.isArray(doc)
? doc.map(d=>new this.model(d))
: new this.model(doc);
};

module.exports = {
    clearHash(hashKey){
        client.del(JSON.stringify(hashKey));
    }
}
