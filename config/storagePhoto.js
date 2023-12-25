function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}

const firebaseConfig = {
    apiKey: 'AIzaSyBLmyT1VQYsb-Wo8GV_dUp1evDd_cvXy7M',
    authDomain: 'portfolio-403709.firebaseapp.com',
    projectId: 'portfolio-403709',
    storageBucket: 'portfolio-403709.appspot.com',
    messagingSenderId: '778215680092',
    appId: '1:778215680092:web:9aa50668733282508bde99',
  };