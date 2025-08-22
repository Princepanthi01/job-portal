import { Webhook } from "svix";
import User from '../models//User.js'

// API controller function to manage clerk user with database
export const clerkWebhooks = async (req,res) => {
    try {  
        // create a Svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // verifying headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id" : req.headers ["svix-id"],
            "svix-timestamp" : req.headers ["svix-timestamp"],
            "svix-signature": req.headers ["svix-signature"]
        })

        // getting data from req body
        const {data , type} = req.body

        // switch case for different events 
        switch (type) {
            case 'user.created':{
                const userData = {
                    _id : data.id,
                    email : data.email_addresses[0].email_address,
                    name : data.first_name + " "+ data.last_name ,
                    image : data.image_url,
                    resume : ''
                }
                await User.create(userData)
                res.json ({})
                break;

            }

            case 'user.updated':{
                const userData = {
                
                    email : data.email_addresses[0].email_address,
                    name : data.first_name + " "+ data.last_name ,
                    image : data.image_url,
          
                }
                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;

            }

            case 'user.deleted':{
                await User.findByIdAndDelete (data.id)
                res.json({})
                break;
            }
  
        
            default:
                break;
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false , message : 'Webhooks Error'})
        
    }
    
}


// export const clerkWebhooks = async (req, res) => {
//   try {
//     const payload = req.body; // raw buffer
//     const body = payload.toString("utf8");

//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const evt = whook.verify(body, {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });

//     const { data, type } = evt;

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//           resume: "",
//         };
//         await User.create(userData);
//         return res.json({ success: true });
//       }

//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, userData);
//         return res.json({ success: true });
//       }

//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         return res.json({ success: true });
//       }

//       default:
//         return res.json({ success: true, message: "Unhandled event" });
//     }
//   } catch (error) {
//     console.log("Webhook error:", error.message);
//     return res.json({ success: false, message: "Webhooks Error" });
//   }
// };
