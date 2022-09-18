const scheme = ' Bearer'

if (!(/^Bearer$/i).test(scheme)) {
    console.log('deu certo')
} else {
    console.log('não deu')
}