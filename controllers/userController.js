

const getAllUsers = async (req, res) => {
    res.send("all users")
}

const getSingleUser = async (req, res) => {
    res.send("single users")
}

const showCurrentUser = async (req, res) => {
    res.send("showCurrentUser")
}

const updateUser = async (req, res) => {
    res.send("updateUser")
}

const updateUserPassword = async (req, res) => {
    res.send("updateUserPassword")
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}