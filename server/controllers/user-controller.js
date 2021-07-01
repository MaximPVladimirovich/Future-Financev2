import User from "../models/user-model"
import lodash from 'lodash/extend'
import errorHandler from './error-controller'


const create = async (req, res, next) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({
      message: 'Successfully signed up!'
    })
  } catch (error) {
    return res.status(400).json({
      error: errorHandle.getErrorMessage(error)
    })
  }
}

const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created')
    res.json(users)
  } catch (error) {
    return res.status(400).json({
      error: errorHandle.getErrorMessage(error)
    })
  }
}

// find user by id
const userById = async (req, res, next, id) => {
  try {
    let user = User.findById(id)
    if (!user)
      return res.status('400').json({
        error: 'User not found'
      })
    req.profile = user
  } catch (error) {
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}


const read = async (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json((req.profile))
}

const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (error) {
    return res.status(400).json({
      error: errorHandle.getErrorMessage(error)
    })
  }
}

const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = underfined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error)
    })
  }
}

export default { create, userById, read, list, remove, update }