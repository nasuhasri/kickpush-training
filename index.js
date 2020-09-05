const express = require('express')
const app = express()
const port = 3000
const session = require('express-session');

// set view engine to ejs - Embedded JavaScript
app.set('view engine', 'ejs')
app.use(express.static('public'))

/**  Secret ni mcm token which kalau user salah masukkan key, dia tak boleh access **/
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Session for user
// app.use(session({
//   secret: 'secret',
//   saveUninitialized: true,
//   resave: true
// }));

// routing
app.get('/', (req, res) => {
  res.render('index', {
    session: req.session
  })
})

const projectList = [
  { 
    logo: 'https://cdn.shopify.com/shopifycloud/hatchful-web/assets/5d6266e7bbcdb8fb017c10000ead2fd3.png',
    company: 'Techno Sdn Bhd',
    desciption: 'Teaching a school of Life a thing or two',
    tech: 'Mobile App / Website',
    category: 'Lifestyle'
  },
  { 
    logo: 'https://cdn.shopify.com/shopifycloud/hatchful-web/assets/01273596e4e92b9de8e8a11cd4ed455e.png',
    company: 'Medicare Sdn Bhd',
    desciption: 'Teaching a school of Life a thing or two',
    tech: 'Website',
    category: 'Medical'
  },
  { 
    logo: 'https://cdn.shopify.com/shopifycloud/hatchful-web/assets/67cbe9b74baf7f893488c5fc426d31eb.png',
    company: 'GameHub Sdn Bhd',
    desciption: 'Game only for the best',
    tech: 'Game',
    category: 'Entertainment'
  }
]

app.get('/projects', (req, res) => {
  res.render('projects', {
    session: req.session,
    projects: projectList
  })
})

// Admin view
app.get('/admin/login', (req, res) => {
  res.render('admin/login')
})

//Temporary
app.get('/admin/user/logged-in', (req, res) => {
  req.session.isLoggedIn = true
  res.redirect('/')
})

app.get('/admin/user/logged-out', (req, res) => {
  req.session.isLoggedIn = false
  console.log(req,session)
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Portfolio app listening at http://localhost:${port}`)
})