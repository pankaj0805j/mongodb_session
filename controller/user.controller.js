const { ObjectId } = require('mongodb');

exports.addUser = async function(req,res){
    try{
        const collection = global.dbClient.db('mongodb_session').collection('users');
        const result = await collection.insertOne({ name: req.body.name, age: req.body.age, email: req.body.email });

        if(!result)
        res.json({message:'Something wrong'})


        res.json({message:'Inserted document!'})

    }catch(e){
        console.log(e)
    }
}



exports.updateUser = async function(req,res){
    try{
        const collection = global.dbClient.db('mongodb_session').collection('users');
        
        // Update one document
        const filter = { _id: new ObjectId(req.body.id) };
        const updateDocument = {
            $set: {
                name:req.body.name,
                age:req.body.age
            }
        };

        const result = await collection.updateOne(filter, updateDocument);
        
        if(!result)
        res.json({message:'Something wrong'})


        res.json({message:'User updated!'})

    }catch(e){
        console.log(e)
    }
}


exports.userList = async function(req,res){
    try{
        const collection = global.dbClient.db('mongodb_session').collection('users');
        
        // get document by id
        const filter = { _id: new ObjectId(req.query.id) };

        const result = await collection.find({ ...filter }).toArray();
        
        if(!result)
        res.json({message:'Something wrong'})


        res.json({message:'User fetched!',data:result})

    }catch(e){
        console.log(e)
    }
}



exports.userProjects = async function(req,res){
    try{
        const collection = global.dbClient.db('mongodb_session').collection('users');
        

        const result = await collection.aggregate([
            { $match: { status: true } },
            { $lookup:
                {
                    from: "projects",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "user_projects"
                }
            },
            { $sort: { age: -1 } },
            { $limit: 10 }
        ]).toArray();
        
        if(!result)
        res.json({message:'Something wrong'})


        res.json({message:'User fetched!',data:result})

    }catch(e){
        console.log(e)
    }
}






exports.userTransaction = async function(req,res){
    const session = global.dbClient.startSession();
    session.startTransaction();
    try{
        const collection = global.dbClient.db('mongodb_session').collection('users');

        const create = await collection.insertOne({ name: 'Piter', age: 30, email: 'piter@gmail.com',created_at:new Date(),update_at:new Date() },{ session });
        
        // Update one document
        const filter = { _id: create._id };
        const updateDocument = {
            $set: {
                age:33,
                updated_at:new Date()
            }
        };

        const result = await collection.updateOne(filter, updateDocument, { session });
        
        if(!result)
        res.json({message:'Something wrong'})

        await session.commitTransaction();
        session.endSession();
        res.json({message:'User updated!'})

    }catch(e){
        console.log(e)
        await session.abortTransaction();
    } finally{
        session.endSession();
    }
}