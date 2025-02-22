import mongoose from 'mongoose';
import isEmail from 'validator';
import bcrypt from'bcrypt';
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});
userSchema.post('save',function(doc,next){
    console.log('new user was created and saved',doc);
    next();  
})
userSchema.pre('save',async function(next){
    console.log('user about to be created and saved',this);
    const salt=await bcrypt.genSalt();
    //this refers to the instance of the user we are creating
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
const User = mongoose.model('User', userSchema);
export default User;