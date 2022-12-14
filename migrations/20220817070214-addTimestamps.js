const { options } = require("../app");

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    // console.log("tasks ");
    // unsert
    // return db.collection("tasks").updateMany({},{},{$set: {timestamps:true}});
   
    const tasks = await db.collection('tasks').find({createdAt:{$exists: false}}).toArray();
    const operations = tasks.map((task) => {
        return db.collection('tasks').updateOne({ _id: task._id }, {
                $set: {
                    createdAt: task._id.getTimestamp()                    ,
                    updatedAt: task._id.getTimestamp(),
                }
        })
    })
    return Promise.all(operations);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    return db.collection("tasks").updateMany({} ,{$rename: { content: "desc" }});
  }
};
