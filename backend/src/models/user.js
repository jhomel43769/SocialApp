import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        require: true
    },
    birth:{
        type: Date,
        default: null
    }

})


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
  
  // Método para comparar contraseñas
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);