/*
const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')

require('dotenv').config()
const uri = process.env.URI

const app = express()
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    return res.json('Welcome to my application')
})

app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('tinder')
        const users = database.collection('users')

        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }

        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
        })
        return res.status(201).json({ token, userId: generatedUserId })

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    try {
        await client.connect()
        const database = client.db('tinder')
        const users = database.collection('users')

        const user = await users.findOne({ email })


        if (user && (await bcrypt.compare(password, user.hashed_password))) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })

            res.status(201).json({ token, userId: user.user_id })
        }

        return res.status(400).send('Invalid credentials')
    } catch (err) {
        console.error(err)
    } finally {
        await client.close()
    }
})

app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('tinder')
        const users = database.collection('users')

        const query = { user_id: userId }
        const user = await users.findOne(query)
        return res.send(user)

    }
    finally {
        await client.close()
    }
})

app.put('/addmatch', async (req, res) => {
    const client = new MongoClient(uri)
    const { userId, matchedUserId } = req.body

    console.log(userId)

    try {
        await client.connect()
        const database = client.db('tinder')
        const users = database.collection('users')

        const query = { user_id: userId }
        const updateDocument = {
            $push: { matches: { user_id: matchedUserId } }
        }

        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.close()
    }
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    const userIds = JSON.parse(req.query.userIds)

    try {
        await client.connect()
        const database = client.db('tinder')
        const users = database.collection('users')

        const pipeline =
            [
                {
                    '$match': {
                        'user_id': {
                            '$in': userIds
                        }
                    }
                }
            ]
        const foundUsers = await users.aggregate(pipeline).toArray()
        console.log(foundUsers)
        res.json(foundUsers)

    }
    finally {
        await client.close()
    }
})

app.get('/gendered-users', async (req, res) => {
    const client = new MongoClient(uri)
    const major = req.query.major

    try {
        await client.connect()
        const database = client.db('tinder')
        const users = database.collection('users')

        console.log(users.body)

        const query = {
            interests: {
                $in: [major]
            }
        };

        const foundUsers = await users.find(query).toArray()

        console.log('foundUsers ', foundUsers)

        res.json(foundUsers)
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.close()
    }
})

app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData

    try {
        await client.connect()
        const database = client.db('tinder')
        const users = database.collection('users')
        const query = { user_id: formData.user_id }

        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                gender_identity: formData.gender_identity,
                url: formData.url,
                about: formData.about,
                matches: formData.matches,
                major: formData.major,
                location: formData.location,
                university: formData.university,
                academicLevel: formData.academicLevel,
                interests: formData.interests,
                rating: formData.rating
            },
        }

        const insertedUser = await users.updateOne(query, updateDocument)

        return res.json(insertedUser)

    }
    finally {
        await client.close()
    }
})

app.get('/messages', async (req, res) => {
    const client = new MongoClient(uri)
    const { userId, correspondingUserId } = req.query

    try {
        await client.connect()
        const database = client.db('tinder')
        const messages = database.collection('messages')

        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }

        const foundMessages = await messages.find(query).toArray()

        res.send(foundMessages)
    }
    finally {
        await client.close()
    }
})

app.post('/message', async (req, res) => {
    const client = new MongoClient(uri)
    const message = req.body.message

    try {
        await client.connect()
        const database = client.db('tinder')
        const messages = database.collection('messages')
        const insertedMessage = await messages.insertOne(message)
        return res.send(insertedMessage)
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.close()
    }
})

app.get('/group')

app.listen(PORT, () => console.log('server listening on PORT ' + PORT))
*/

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
const  { initializeApp } = require("firebase/app");

// import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
const { 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  arrayRemove, 
  arrayUnion, 
  setDoc, 
  getDocs, 
  collection, 
  doc, 
  getFirestore, 
  getDoc 
} = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCldWXABqyA8TGaPCWTYh-60WnpbqnKZc",
  authDomain: "stundr-a809f.firebaseapp.com",
  projectId: "stundr-a809f",
  storageBucket: "stundr-a809f.appspot.com",
  messagingSenderId: "684803703638",
  appId: "1:684803703638:web:0c2004d95de421f3788cf7",
  measurementId: "G-CF67997N2S"
};

const fb = initializeApp(firebaseConfig);
const firestore = getFirestore(fb);
const users = collection(firestore, 'users')
const messages = collection(firestore, 'messages')


// Initialize Firebase


const PORT = 8000

const express = require('express')
const { MongoClient } = require('mongodb')
const { v1: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
require('dotenv').config()

const uri = process.env.URI

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json('Dajiahao!')
})

app.post('/signup', async (req, res) => {
  const { email, password } = req.body

  const generatedUserId = uuidv4()
  const hashedPassword = await bcrypt.hash(password, 10)
  
  try {
    const queryExistingUser = query(users, where("email", "==", email))
    const existingUserSnapshot = await getDocs(queryExistingUser)
    if (!existingUserSnapshot.empty) {
      return res.status(409).send('user already exists. Please login')
    }
    
    // sanitizing email
    const sanitizedEmail = email.toLowerCase()
    
    // create a new user
    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword
    }
    const insertedUser = await addDoc(users, data)
    
    // sign a token for the new user
    const token = jwt.sign(data, sanitizedEmail, {
      expiresIn: 60*24,
    })
    
    // send back status code 201 success
    res.status(201).json({ token, userId: generatedUserId })
    
  } catch(err) {
    console.log(err)
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  // console.log(email)
  try {
    
    const queryExistingUser = query(users, where("email", "==", email))
    const userSnapshot = await getDocs(queryExistingUser)
    userSnapshot.forEach(async (doc) =>{
      if (!doc.empty){
        const user = doc.data()
        const correctPassword = await bcrypt.compare(password, user.hashed_password)
        if (correctPassword){
          console.log(user)
          const token = jwt.sign(user, email, {
            expiresIn: 60*24
          })
          res.status(201).json({token, userId: user.user_id})
        } else 
          res.status(400).send('Invalid credentials')
      }
    })
    /* 
    */
   
  } catch (err) {
    console.log(err)
  }
})
// Get individual user
app.get('/user', async (req, res) => {
  
  const userId = req.query.userId
  const userQuery = query(users, where("user_id", "==", userId))
  const userSnapshot = await getDocs(userQuery)
  userSnapshot.forEach(doc => {
    user = doc.data()
    // console.log(user)
    res.send(user)
  })
})

app.get('/users', async (req, res) => {
  /*
  */
  const userIds = JSON.parse(req.query.userIds)
  
  const usersQuery = query(users, where("user_id", "in", userIds))
  const foundUsersSnapshot = await getDocs(usersQuery)
  
  foundUsers = []
  foundUsersSnapshot.forEach(doc => {
    foundUsers.push(doc.data())
  })
  res.send(foundUsers)
})

/* Recommendation system implementation */
app.get('/users-same-interests', async (req, res) => { 
  const client = new MongoClient(uri)
  const gender = req.query.gender
  
  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')
    const query = { gender_identity: { $eq: gender } }
    const foundUsers = await users.find(query).toArray()
    
    res.send(foundUsers)
  } finally {
    await client.close()
  }
  
})

/*
onboarding users
*/
app.put('/user', async (req, res) =>{
  /* 
  const client = new MongoClient(uri)
  const database = client.db('app-data')
  const users = database.collection('users')
  const query = { user_id: formData.user_id }
  const updateDocument = {
    $set: {
      first_name: formData.first_name,
      dob_day: formData.dob_day,
      dob_month: formData.dob_month,
      dob_year: formData.dob_year,
      show_gender: formData.show_gender,
      gender_identity: formData.gender_identity,
      gender_interest: formData.gender_interest,
      url: formData.url,
      about: formData.about,
      matches: formData.matches
    },
  }

  const insertedUser = await users.updateOne(query, updateDocument)
  */
  const formData = req.body.formData
  const userId = formData.user_id
  let doc_id = ''
  let insertedUser = ''

  console.log(userId)
  
  const userQuery = query(users, where("user_id", "==", userId))
  const userSnapshot = await getDocs(userQuery)
  userSnapshot.forEach(doc => {
    doc_id = doc.id
  })
  
  userDoc = doc(firestore, `users/${doc_id}`)
  setDoc(userDoc, formData, {merge: true})
  
  userSnapshot.forEach(doc => {
    insertedUser = doc.data()
    res.send(insertedUser)
  })
  
  
  
  
  // try {
    //   await client.connect()
    
    // } finally {
      //   await client.close()
      // }
})
    
app.put('/addmatch', async (req, res) => {
  /*
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')
    
    const query = { user_id: userId }
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId }},
    }
  } finally {
    await client.close()
  }
  */
  const { userId, matchedUserId } = req.body
  let doc_id = ''
  const userQuery = query(users, where("user_id", "==", userId))
  const userSnapshot = await getDocs(userQuery)
  
  userSnapshot.forEach(doc => {
    doc_id = doc.id
  })
  
  userDoc = doc(firestore, `users/${doc_id}`)
  await updateDoc(userDoc, {
    matches: arrayUnion(matchedUserId)
  })
  
  userSnapshot.forEach(doc => {
    user = doc.data()
    res.send(user)
  })
  
})

app.get('/messages', async (req, res) => {
  /*
  const client = new MongoClient(uri)
  try {
    await client.connect()
  } finally {
    await client.close()
  }
  const database = client.db('app-data')
  const messages = database.collection('messages')
  const query = {
    from_userId: userId, to_userId: correspondingUserId
  }
  const foundMessages = await messages.find(query).toArray()
  */
  
  const { userId, correspondingUserId } = req.query

  const messagesQuery = query(
    messages, 
    where("from_userId", "==", userId), 
    where("to_userId", "==", correspondingUserId)
  )
  
  foundMessagesArray = []
  const foundMessages = await getDocs(messagesQuery)
  foundMessages.forEach(doc =>{
    message = doc.data()
    foundMessagesArray.push(message.message)
  })
  res.send(foundMessagesArray)
})

app.post('/message', async (req, res) =>{
  /* 
  const client = new MongoClient(uri)
  try {
    const database = client.db('app-data')
    const messages = database.collection('messages')
    await client.connect()
  } finally {
    await client.close()
  }
  const insertedMessage = await messages.insertOne(message)
  */
  const message = req.body.message
  const insertedMessage = await addDoc(messages, message)
  insertedMessage.forEach(doc =>{
    const msg = doc.data()
    res.send(msg)
  })
})

app.listen(PORT, () => console.log('listening on PORT ' + PORT))