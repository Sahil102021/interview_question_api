let USER = require('../model/users');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "sahilramani2021@gmail.com",
        pass: "ktnvgqmszztjedqe", // Use environment variables instead
    },
});

async function main(mail) {
    try {
        console.log(`Sending email to: ${mail}`);
        
        const info = await transporter.sendMail({
            from: 'sahilramani2021@gmail.com', // Sender address
            to: mail, // Recipient email
            subject: "Welcome to the interview question preparation", // Subject line
            text: "Interview questions", // Plain text body
            html: `<h1 style="color: red; text-align: center;">interview question signup successfully</h1>
                   <br/>
                   <p style="color: blue; font-style: italic;">read all the detail inteview question portal</p>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}


exports.Secure = async function(req , res, next) {
    try {
        let token = req.headers.authorization;
        if(!token) throw new Error('Plase Provide token !');

        let tokenVerify = await jwt.verify(token ,'USER-TEST' );
        if(!tokenVerify) throw new Error('Inavlid Token');

        req.user = tokenVerify.id;
        next();
        
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.Signup = async function(req , res , next) {
    try {
        let {username , email,password,fristname,lastname,contact} = req.body;
        if (!username || !email || !password || !fristname || !lastname || !contact) throw new Error('Please provide username or email or password fristname or lastname or contact!');

        let checkuser = await USER.findOne({email : email})
        if(checkuser) throw new Error('Alwarady user enter email plases new email enter !')

        let passwordHash = await bcrypt.hashSync(password , 10)
        console.log(passwordHash);

        let userData = await USER.create({...req.body , password : passwordHash}) 
        let token = jwt.sign({id : userData._id},'USER-TEST');

        main(email).catch(console.error);

        res.status(200).json({
            data: userData,
            status : "Successfully create signup data",
            token 
        })
        
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}

exports.Login = async function(req , res ,next) {
    try {
        let {email ,password } = req.body;
        if ( !email || !password ) throw new Error('Please provide  email or password !');

        let userData = await USER.findOne({email})
        if(!userData) throw new Error(' Invalid email ')
        
        let passwordHash = await bcrypt.compareSync(password , userData.password);
        if(!passwordHash) throw new Error(' Invalid password ')

        let token = jwt.sign({id : userData._id }, "USER-TEST");

        res.status(200).json({
            data: userData,
            status : "Successfully create signup data",
            token 
        })
        
    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : error.message
        })
    }
}