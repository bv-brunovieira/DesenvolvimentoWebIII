const database = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsuarioController {

    static async pegaTodosOsUsuarios(req, res) {
        try {
            const todosOsUsuarios = await database.Usuarios.findAll();
            return res.status(200).json(todosOsUsuarios);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    
    static async pegaUmUsuario(req, res) {
        const { id } = req.params;
        try{
            const umUsuario = await database.Usuarios.findOne( { 
                where: { 
                    id: Number(id) 
                } 
            });
            return res.status(200).json(umUsuario);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async gerarSenhaHash(senha){
        const custoHash = 12;
        return bcrypt.hash(senha, custoHash);
    }

    static validaSenha(senha){
        return true;
        //throw new Error("Senha inválida");
    }

    static async criaUsuario(req, res) {
        const novoUsuario = req.body;
        try{

            UsuarioController.validaSenha(novoUsuario.senha);
            const senhaHash = await UsuarioController.gerarSenhaHash(novoUsuario.senha);
            delete novoUsuario.senha;
            novoUsuario["senha_hash"] = senhaHash;
            const novoUsuarioCriado = await database.Usuarios.create(novoUsuario);

            return res.status(200).json(novoUsuarioCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async atualizaUsuario(req, res) {
        const novasInfosUsuario = req.body;
        const { id } = req.params;
        try{
            await database.Usuarios.update(novasInfosUsuario, { where: { id: Number(id) } });
            const usuarioAtualizado = await database.Usuarios.findOne( { where: { id: Number(id) } });
            return res.status(200).json(usuarioAtualizado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagarUsuario(req, res) {
        const { id } = req.params;
        try{
            await database.Usuarios.destroy({ where: { id: Number(id) } });
            return res.status(200).json( { mensagem: `id ${id} deletado`} );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }  

    static async pegaUmUsuarioPorEmail(email) {
        try{
            const usuario = await database.Usuarios.findOne( { 
                where: { 
                    email: email
                } 
            });
            return usuario;
        } catch (error) {
            throw error;
        }
    }

    static verificaUsuario(usuario){
        if (!usuario){
            throw new Error("Usuário não encontrado");
        }
    }

    static async verificaSenha(senha, senhaHash){
        const senhaValida = await bcrypt.compare(senha, senhaHash);
        if (!senhaValida)
            throw new Error("Senha inválida!");
    }

    static async login(req, res) {
        const { email } = req.body;
        const { senha } = req.body;
        try{
            const usuario = await UsuarioController.pegaUmUsuarioPorEmail(email);
            UsuarioController.verificaUsuario(usuario);
            await UsuarioController.verificaSenha(senha,usuario.senha_hash);
            const token = jwt.sign({ id: usuario.id }, process.env.CHAVE_JWT, { expiresIn: '15m' });
            res.set('Authorization', token);
            return res.status(200).json(usuario); 
        } catch (error) {
            return res.status(401).json(error.message);
        }
    }

}

module.exports = UsuarioController