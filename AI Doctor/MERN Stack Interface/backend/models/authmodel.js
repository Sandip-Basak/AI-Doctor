const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt=require('bcrypt')

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        max: 15,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Email already used"],
    },
    password: {
        type: String,
        min: 8,
    },
});
authSchema.pre('save',async function (next){
    const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

authSchema.statics.login = async function (username, password) {
    const user=await this.findOne({username})
    if(!user){
        throw new Error('Incorrect Username')
    }
    const auth=await bcrypt.compare(password,user.password)

    if(!auth){
        throw new Error('Incorrect password')
    }

    return user

};

module.exports = mongoose.model("auth", authSchema);
