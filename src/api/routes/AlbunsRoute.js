//Importando o Router do express. 
// As chaves indicam que a propriedade Router de express será atribuída a uma constante de mesmo nome
const { Router } = require('express');
const AlbumController = require('../controllers/AlbumController');

//Iniciando o Router do express
const router = Router();

router.get('/albuns', AlbumController.pegaTodosOsAlbuns);
router.get('/albuns/:id', AlbumController.pegaUmAlbum);
router.post('/albuns', AlbumController.criaAlbum);
router.put('/albuns/:id', AlbumController.atualizaAlbum);
router.delete('/albuns/:id', AlbumController.apagarAlbum);

module.exports = router;