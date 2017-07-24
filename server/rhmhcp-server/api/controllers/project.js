module.exports = {
  listProjects: listProjects,
  createProject: createProject,
  deleteProject: deleteProject
}
var db = require("../../db");

function listProjects(req, res, next) {
  db.project().find({})
    .toArray()
    .then(function (list) {
      res.json(list);
    })
}


function createProject(req, res) {
  db.project().insert(req.body)
    .then(function () {
      res.end();
    });
}
var ObjectID=require("mongodb").ObjectID;
function deleteProject(req, res) {
  db.project().deleteOne({
    _id:new ObjectID(req.swagger.params.projectId.value)
  })
    .then(function () {
      res.end();
    })
};