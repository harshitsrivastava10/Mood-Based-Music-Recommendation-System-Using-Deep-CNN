-- npm run build --  (FRONTEND)
it creates a three files(html, css, js) from react js file

BACKEND + DIST FOLDER -> deploy on render 

REACT OUTPUT -> DIST FOLDERS(html, css, js)

Move all three files in backend in public folder

-- (__dirname) -- 
return the path of file of parent folder where we used in __dirname

(*name) -> create a wild card API but if not created in backend server, it returns the HTML PAGE.



// BACKEND PROCESS CREATION 
npm init - y
npm i express 
npm i mongoose
npm i dotenv



// DEPLOYMENT 
-- dashboard --> cohort 2.0 



////// DATE - 04 / 02/ 2026  -> [AUTHENTICATION]  ///////
// Authentication -> identify request where it comes from and which user sends the request.

// Authorization -> ek user kya kya access kr skta hai. (student, teacher, director)

// Validation -> check the format of the data.

// Verification -> data sahi hai ya nahi 




/// DATE - 05 / 02 / 2026  /////
STATUS -> 400, 409 in existence of email check -> 55:00

// token create krne ke liye ek package ki need hoti hai -> npm i jsonwebtoken

// 1. //

// jwt secret generates  through websites
// and paste into .env file -> npm install jsonwebtoken
// token ke andar user ka data hota hai and agar check krna ho to json webtokens website par check kr skte hai token ka use krke

// iat -> initialization of token 


// 2. Cookies Storage -> ON Client Side //
npm i cookie-parser

as a middleware ki trah use karo app.js file me



//////////////  10- 02- 2026  //////////////
Q. why we dont send password in response when we register a user



////// 11- 02-2026 ////////

//1. BCRYPT JS (package advance security feature)
npm i bcryptjs


// 2. Using Multer -> to transfer form data and multipart data to the server.
    --- npm install multer


// 3. IMageKit 
    -- Installation ->  npm install @imagekit/nodejs