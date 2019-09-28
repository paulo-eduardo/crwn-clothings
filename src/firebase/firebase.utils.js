import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyB5DVSX_c-pHevBq4Ft6l_-rkgxx5bw-qI',
  authDomain: 'crwn-db-819f2.firebaseapp.com',
  databaseURL: 'https://crwn-db-819f2.firebaseio.com',
  projectId: 'crwn-db-819f2',
  storageBucket: '',
  messagingSenderId: '441229379195',
  appId: '1:441229379195:web:fcafd69a84085b4e'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collection = firestore.collection(collectionKey)

  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collection.doc()
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

export const convertCollectionSnapshotsToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
