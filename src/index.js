import { initializeApp } from 'firebase/app'
import { 
  getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBB5lvecBSO0-LtVSN4EuYU2AiiebECyAI",
  authDomain: "fir-dojo-b6120.firebaseapp.com",
  projectId: "fir-dojo-b6120",
  storageBucket: "fir-dojo-b6120.appspot.com",
  messagingSenderId: "712962080563",
  appId: "1:712962080563:web:65310d6626d44136ef8846"
}

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs)
  })
