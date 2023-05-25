import { initializeApp } from 'firebase/app'
import { 
  getFirestore, collection, getDocs, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc, updateDoc
} from 'firebase/firestore'
import {
  getAuth
} from 'firebase/auth'

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
const auth = getAuth()

// collection ref
const colRef = collection(db, 'books')

// queries

const q = query(colRef, orderBy('createdAt'))

// real time  collection data
onSnapshot(q, (snapshot) => {
  let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

//adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })

})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

// get a single document
const docRef = doc(db, 'books', 'Bh3TlVUAhxztbBI3N4gx')

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

// updating a document 
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => { 
  e.preventDefault()

  const docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })
})