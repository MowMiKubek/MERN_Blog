import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import randomstring from "randomstring";
import config from "../../config.js";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Email jest za krótki (3-20 znaków)"],
    maxlength: [20, "Email jest za długi (3-20 znaków)"],
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} Nie jest poprawnym emailem!`
    },
  },
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[a-z][a-z0-9]*$/.test(v);
      },
      message: 'Login może składać się z małych liter i cyfr'
    },
    minlength: [3, "Login jest za krótki (3-20 znaków)"],
    maxlength: [20, "Login jest za długi (3-20 znaków)"]
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Hasło jest za krótkie (3-20 znaków)"],
    maxlength: [72, "Hasło jest za długie (3-20 znaków)"]
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[A-Z][a-z]+$/.test(v);
      },
      message: 'Podaj poprawne imie'
    },
    minlength: [3, "Imie jest za krótkie (3-20 znaków)"],
    maxlength: [20, "Imie jest za długie (3-20 znaków)"]
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[A-Z][a-z]+(\-[A-Z][a-z]+)?$/.test(v);
      },
      message: `Podaj poprawne nazwisko`
    },
    minlength: [3, "Nazwisko jest za krótkie (3-20 znaków)"],
    maxlength: [20, "Nazwisko jest za długie (3-20 znaków)"]
  },
  birthdate: {
    type: Date,
    required: [true, "Podaj datę urodzenia"]
  },
  gender: {
    type: String,
    required: [true, "To pole jest wymagane"],
    trim: true
  },
  accountType: {
    type: String,
    required: true,
    default: "inactive"
  },
  // apiToken: {
  //   type: String,
  //   default: ""
  // }
}, {Collection: "Users"});

userSchema.virtual('fullname').get(function() {
  return `${this.firstname} ${this.surname}`;
});

userSchema.pre('save', function(next){
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  if(!this.isModified('password')) return next();
  this.password = hash;
  next();
});

userSchema.post('save', function (err, doc, next)  {
  // if (err) {
  //   console.log(err);
  // } 
  if (err.code === 11000) {
      let myError = {}
      if(err.keyValue?.login)
        myError.login = {message: "Podany login jest zajęty."};
      if(err.keyValue?.email)
        myError.email =  {message: "Podany email jest zajęty."};
      err.errors = myError;
  }
  next(err);
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const jwtKey = config.JWTPRIVATEKEY
  const token = jwt.sign({ _id: this._id, accountType: this.accountType }, jwtKey, {
      expiresIn: "7d",
  })
  return token
}

const User = mongoose.model("User", userSchema);

export default User;