module.exports = {
  listProjects: listProjects,
  createProject: createProject,
  deleteProject: deleteProject
}
var db = require("../../db");
var ObjectID=require("mongodb").ObjectID;

function listProjects(req, res, next) {
  db.project().find({})
    .toArray()
    .then((list) => res.json(list))
    .catch(next)
}

function createProject(req, res, next) {
  console.log('create')
  db.project().insert(req.body)
    .then(function () {
      res.end();
    })
    .then(() => res.end())
}

function deleteProject(req, res, next) {
  db.project().deleteOne({
    _id:new ObjectID(req.swagger.params.projectId.value)
  })
    .then(() => res.end())
    .catch(next)
};
