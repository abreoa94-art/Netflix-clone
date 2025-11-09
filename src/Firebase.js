// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQVU3Z1UuCpp6T5W9RbXhKXT4dTUA6euo",
  authDomain: "netflix-clone-46ca1.firebaseapp.com",
  projectId: "netflix-clone-46ca1",
  storageBucket: "netflix-clone-46ca1.firebasestorage.app",
  messagingSenderId: "834560702581",
  appId: "1:834560702581:web:5445ec0ee47aa64742203c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

// user sign up function 

const signup= async(name, email, password) =>{
    try {
      const res =   await createUserWithEmailAndPassword(auth, email, password)
      const user = res.user
    //   to store a user info to firestore db 
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email, 
        })
    }catch (error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" ")) }
}

//  user sign in fucntion 

const login = async (email, password) =>{
    try {
      await  signInWithEmailAndPassword(auth, email, password)
        
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }
}

//  user logout function 

const logout = ()=> {
    signOut(auth)
}

export {auth, db, login, signup, logout}