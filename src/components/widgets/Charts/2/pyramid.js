// const API = 'http://localhost:7000/pyramid'

// const firebaseApp = API
// export default firebaseApp

// eslint-disable-next-line import/prefer-default-export
export async function pyramid(subscription) {
    return fetch('http://localhost:7000/pyramid', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
    })
}
