import { Router } from 'express';

const router = Router();

const privateRouter = (req, res, next) =>{
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

const publicRouters = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/views/products');
  }
  next();
}

router.get('/profile', privateRouter, (req, res) => {
  // console.log("ESTOY ADENTRO DE PROFILE ROUTER");
  res.render('profile', { title: 'Perfil', user: req.session.user });
});

router.get('/login', publicRouters, (req, res) => {
  res.render('login', { title: 'Login' });
  // res.send('Te damos la bienvenida a la seccion privada 🖐️.')
});

router.get('/register', publicRouters, (req, res) => {
  res.render('register', { title: 'Register' });
});

export default router;