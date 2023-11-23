import { Router } from 'express';
import { createHash, isValidPassword } from '../utils.js'
import passport from 'passport';

import UserModel from '../models/user.model.js';

const router = Router();


router.post('/sessions/register', passport.authenticate('register', { failureRedirect: '/register' }), (req, res) => {

  const { body } = req;

  // Si no se proporciona un rol, establecerlo como "usuario"
  if (!body.role) {
   body.role = 'usuario';
 }


  res.redirect('/login');
})

router.post('/sessions/login', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
  // console.log('req.user', req.user);
  // console.log('req.session.user:', req.session.user);


  req.session.user = req.user;



  res.redirect('/views/products');
});


//ROUTER PARA ENTRAR A GITHUB AUTH
router.get('/sessions/github', passport.authenticate('github', { scope: ['user:email'] }));

//ROUTER CALLBACK QUE TE LLEVA A LOGIN
router.get('/sessions/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  req.session.user = req.user;
  console.log('req.session.user:', req.session.user);
  // Asignar el rol "usuario" si no se ha establecido
if (req.session.user.role === 'admin') {
  req.session.welcomeMessage = '¡Bienvenido admin!';
} else {
  req.session.welcomeMessage = `Bienvenido, ${req.session.user.first_name}!`;
  console.log('req.session.welcomeMessage', req.session.welcomeMessage);  //línea para depurar y verificar el valor
}

  res.redirect('/views/products');
})

//ROUTER LOGOUT
router.get('/sessions/logout', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('/login');
  });
});

export default router;