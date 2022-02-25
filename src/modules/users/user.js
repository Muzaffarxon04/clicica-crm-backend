const { SECRET_KEY } = require('../../config')
const {Users, Admins, addUser, Queue, addQueue} = require('./model')
const {signUser} = require('../../lib/jwt')
var axios = require("axios").default;

module.exports ={
    USERS: async (req, res) => {
        try {
            
            const users = await Users()
            
            if (users) {
                res.json(users)
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    


    REGISTER: async (req, res) => {
        try {
            let { user_name, user_email, user_password} = req.body
            await addUser(user_name, user_email, user_password)
            const token = signUser({user_name, user_email, user_password}, SECRET_KEY)           
            
            res.json(token)
        } catch (error) {
            console.log(error.message);
            res.json(false)
        }
    },
    
    ADDMIN_LOGIN: async (req, res) => {
        try {
            let {user_name, user_password } = req.body
            
            let admin = await Admins()

            
            const faundAdmin = admin.find(e => e.isadmin == true && (e.user_password == user_password && e.user_name == user_name))


            if (faundAdmin) {
                const token = signUser({user_name, user_password}, SECRET_KEY)
              
                res.status(200).json(token)
            }

            else{
                res.status(404).send("Bunday admin mavjud emas")
            }
            
        }catch (error) {
            console.log(error.message);
        }
    },
    
    LOGIN: async (req, res) => {
        try {
            let {user_name, user_password } = req.body
            
            let user = await Users()
console.log(user);
            
            const faundUser = user.find(e => e.user_name == user_name && e.user_password == user_password)

            if (faundUser) {
                const token = signUser({user_name, user_password}, SECRET_KEY)
              
                res.status(200).json(token)
            }

            else{
                res.status(404).send("Registratsiy qilinmagan")
            }
            
        }catch (error) {
            console.log(error.message);
        }
    },
    
    
    ADDQUEUE: async (req, res) => {
        try {
            const {first_name, last_name, phone_number, direction_name} = req.body
            console.log(req.body);
            const rows = await addQueue(first_name, last_name, phone_number, direction_name)
        
            if (rows) {
        
var options = {
    method: 'POST',
    url: 'https://clicksend.p.rapidapi.com/sms/send',
    headers: {
      'content-type': 'application/json',
      authorization: 'Basic bXV6YWZmYXJ4b24wNDotdlckSE00TDQqNGQqNGs=',
      'x-rapidapi-host': 'clicksend.p.rapidapi.com',
      'x-rapidapi-key': '170816849fmsheaa44840244b480p17c9f3jsn5d5306136aeb'
    },
    data: {
      messages: [
        {
          source: 'mashape',
          from: '+998995142358',
          body: `Assalomu Alaykum ${first_name} ${direction_name} ko'rigiga muofaqiyatli royhatdan o'tdingiz. Navbatigiz kelsa siz bilan tez orada bo'glanamiz iltimos aperator tavobini kuting.`,
          to: phone_number,
          schedule: '1452244637',
          custom_string: `message send to ${phone_number}`
        }
      ]
    }
  };
  
  axios.request(options).then(function (response) {

    res.json({
        status:200,
        message: rows[0].queue_id,
        to:response.data.data.messages[0].body
    })



  }).catch(function (error) {
      console.error(error);
  });
        
            }
        } catch (error) {
    res.status(400).json({message: error.message })

            console.log(error.message);
        }
    },

    QUEUE: async (req, res) => {
        try {
            
            const queue = await Queue()
            
            if (queue) {
                res.json(queue)
            }
        } catch (error) {
            console.log(error.message);
        }
    } 
    
}