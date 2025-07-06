const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const { courses, users, createUser } = require('./data')

const app = express()
app.use(cors())
app.use(express.json())

const JWT_SECRET = 'secret'

// создать пользователя по умолчанию для демонстрации
if (users.length === 0) {
  createUser({ name: 'Иван', email: 'ivan@example.com', password: '1234' })
}

function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send('No token')
  const token = authHeader.split(' ')[1]
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).send('Invalid token')
  }
}

app.get('/', (req, res) => res.send('Backend работает'))

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body
  if (users.find(u => u.email === email)) return res.status(400).send('Exists')
  const user = createUser({ name, email, password })
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET)
  res.json({ token })
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(400).send('User not found')
  if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(400).send('Wrong password')
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET)
  res.json({ token })
})

app.get('/api/courses', (req, res) => {
  res.json(courses)
})

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id)
  if (!course) return res.status(404).send('Not found')
  res.json(course)
})

app.get('/api/me', auth, (req, res) => {
  const user = users.find(u => u.id === req.user.id)
  if (!user) return res.status(404).send('Not found')
  res.json({ user: { id: user.id, name: user.name, role: user.role }, progress: user.progress })
})

app.post('/api/lessons/:id/complete', auth, (req, res) => {
  const { id } = req.params
  const user = users.find(u => u.id === req.user.id)
  if (!user) return res.status(404).send('Not found')
  const course = courses.find(c => c.lessons.some(l => l.id === id))
  if (!course) return res.status(404).send('Lesson not found')
  const lesson = course.lessons.find(l => l.id === id)
  if (!user.progress.find(p => p.lessonId === id)) {
    user.progress.push({ lessonId: id, lessonTitle: lesson.title })
  }
  res.json({ success: true })
})

app.listen(5000, () => console.log('Сервер запущен на порту 5000'))
