const mongoose = require ( 'mongoose' );
const Account = mongoose.model ( 'Account' );
const chalk = require ( 'chalk' );

//Simple version, without validation or sanitation
exports.test = function ( req, res ) {
    res.send ( 'Greetings from the account Test controller!' );
};

// // vvv create method *** This is where the magic happens ***********************
// exports.create_transaction = async function ( req, res ) {
//     let pivxData = {};
//     // req.body.currency != "PIV" && console.log("This aint PIV!");
//     console.log ( "***create_transaction" );
//     // error first error handling
//     if ( req.body.currency !== "PIV" ){
//         console.log ( chalk.red ( "failed" ) + "***" );
//         res.send ( 'This API is only configured to accept PIV' );
//         return;
//     } else {
//             // new transaction object.
//             let newApi = new Api (
//                   {
//                     currency : req.body.currency,
//                     amount : req.body.amount,
//                     status : null
//                   }
//             );
//             // gets a new address for this transaction
//             pivxData = await rpc_controller.get_new_address();
//             newApi.status = pivxData.status;
//             newApi.walletAddress = pivxData.result;
//
//             // save transaction object to the database.
//             newApi.save ( function ( err, dbResponse ) {
//               if ( err ) {
//                 res.send( err );
//               }
//               console.log ( chalk.white( dbResponse ) +"***" );
//               res.send ( {"transactionID" : dbResponse._id, "walletAddress" : dbResponse.walletAddress });
//             });
//
//     }
// }
// // ^^^ create method *** The magic lives within you! ***************************
//
//
// // vvv monitor method (is also a post method)
// exports.monitor_transaction = async function ( req, res ) {
//   console.log ( "***monitor_transaction***" );
//   console.log ( req.body.transactionID );
//   let dbData = {};
//   let pivxData = {};
//   let apiResponse = {};
//
//   // here we query the db by _id first to get the walletAddress, then we querry
//   // PIVX by walletAddress to get the amount received.
//   try {
//       Api.findById( req.body.transactionID, function (err,res){
//         if (err) return (err);
//         dbData = res;
//       }).then(async (res)=>{
//         pivxData = await rpc_controller.get_received_by_address(dbData.walletAddress)
//       }).then(()=>{
//         console.log("dbData.walletAddress is " + dbData.walletAddress);
//         console.log("pivxData.result is " + pivxData.result);
//       }).then(async ()=>{
//         if (pivxData.result >= dbData.amount){
//           console.log(chalk.blue("Hey! They match!"));
//           await Api.findByIdAndUpdate(
//             req.body.transactionID,
//             {"status": "success"},
//             async function (err, result) {
//               if (err) return (err);
//               console.log(chalk.blue("success callback"));
//               apiResponse = await send_db_response(req.body.transactionID, res);
//
//             }
//           );
//         } else {
//           console.log(chalk.blue("The balance hasn't been paid"));
//           await Api.findByIdAndUpdate(
//             req.body.transactionID,
//             {"status": "pending"},
//             async function (err, result) {
//               if (err) return (err);
//               console.log(chalk.red("pending callback"));
//               apiResponse = await send_db_response(req.body.transactionID, res);
//             }
//           )
//         }
//
//       }).then(async()=>{
//         // console.log("apiResponse is "+apiResponse);
//         // console.log(apiResponse);
//         // await res.send(apiResponse)
//
//       })
//
//   } catch(err){console.log("catch error");}
// };
//
//
//
//   // send_db_response is a callback that only sends a response to the user after
//   // the status has been updated in the database.
// async function send_db_response(req, res){
//   await Api.findById ( req, function ( err, dbResponse ) {
//     if ( err ) return ( err );
//     console.log(chalk.yellow("send_db_response fired!"));
//     console.log(`{ "transactionID" : ${dbResponse._id}, "status" : ${dbResponse.status} }`);
//     res.send ( { "transactionID" : dbResponse._id, "status" : dbResponse.status } );
//   });
// }
// // ^^^ monitor method (is also a post method)