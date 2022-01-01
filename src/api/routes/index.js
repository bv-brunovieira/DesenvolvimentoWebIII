
const albuns = require('./AlbunsRoute');
const usuarios = require('./UsuariosRoute');
/**
Sintaxe de uma função qualquer: function() {}
Sintaxe de uma arrow function: () => {}
 */
module.exports = app => {
    app.use(albuns);
    app.use(usuarios);
}