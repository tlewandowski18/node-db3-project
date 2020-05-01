const db = require("../data/config.js")

function find() {
  return db("schemes") 
}

function findById(id) {
    return db("schemes").where("id", id).first()
}

function findSteps(id) {
    return db("schemes as sc")
        .join("steps as s", "s.scheme_id", "sc.id")
        .where("sc.id", id)
        .select("s.id", "sc.scheme_name", "s.step_number", "s.instructions")
        .orderBy("s.step_number")
}

async function add(scheme) {
    const [id] = await db("schemes").insert(scheme)
    return db("schemes").where("id", id).first()
}

async function update(changes, id) {
    await db("schemes").where("id", id).update(changes)
    return db("schemes").where("id", id)
}

function remove(id) {
    return db("schemes").where("id", id).del()
}


module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}