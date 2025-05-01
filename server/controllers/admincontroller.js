const Admin = require('../model/adminmodel');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const registerAdmin = async (req , res) => {
    try {

        const   {name , user,  password} = req.body;
        const  exixtingUser = await Admin.findOne({user});
        if(exixtingUser){
            res.status(200).json({massage : "user Already exist}"});

        }

        const newUser = new  Admin({name , user , password});
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            admin: {
              id: newUser._id,
              name: newUser.name,
              user: newUser.user,
            }
          });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const loginAdmin = async (req , res) => {
    try {
        const {user ,  password} = req.body;

        const  findUser = await Admin.findOne({user});
        if(!findUser){
            res.status(200).json({massage : "user not exist exist"});

        }
        const isMatch = await findUser.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: findUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
        message: 'User login successfully',
        token,
        admin: {
          id: findUser._id,
          name: findUser.name,
          user: findUser.user,


        }
      });
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
    }
    
}

module.exports = {registerAdmin , loginAdmin};