// ensureIndex(background: true)
// http://mongoosejs.com/docs/guide.html#autoIndex

const mongoose = require('mongoose')
mongoose.Promise = Promise
mongoose.set('debug', true)
mongoose.connect('mongodb://localhost/users-test', {useMongoClient: true})
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [{
            validator: val => /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(val),
            msg: 'Укажите, пожалуйста, корректный email.'
        }],
        lowercase: true, // to compare with another email
        trim: true
    },
    displayName: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
})
const User = mongoose.model('User', userSchema)
async function z() {
    try {
        await User.remove({})
        const q = await User.create({'email': 'test1@test.com', 'displayName': 'testUser1'})
        await q.save()
    } catch (e) {
        console.log('--- error: ')
        console.log(e)
    }
}
z()
    .then(() => console.log('done'))
    .catch(console.error)
    .then(() => mongoose.disconnect())
    .catch(console.error)
