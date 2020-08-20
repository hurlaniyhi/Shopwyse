const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        unique: true,  
        required: true    
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
})


userSchema.pre('save', function(next) { 
    // the reason we are not using a call back function is to have access to "this"
    const user = this
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err)   // anytime we return, that will not execute any code anymore
        }
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err){
              return next(err)
            }
            user.password = hash
            next()
        })
    })
})



userSchema.methods.comparePassword = function comparePassword(candidatePassword){
    // candidate password is the password the user is trying to login with
    const user = this   // existing user....user.password will be the existing password that has been saved in the db

    return new Promise ((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err){
                return reject(err)
            }
            if(!isMatch){
                return reject(false)
            }
            if(isMatch){
                return resolve(true)
            }
            
        })
    })
}

mongoose.model('User', userSchema)