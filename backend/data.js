const bcrypt = require('bcryptjs')

// начальные курсы и уроки
const courses = [
  {
    id: 'math-1',
    title: 'Математика. Базовый курс',
    description: 'Простой курс по математике',
    lessons: [
      { id: 'math-1-1', title: 'Сложение', videoUrl: '', task: 'Решите 2+2' },
      { id: 'math-1-2', title: 'Вычитание', videoUrl: '', task: 'Решите 5-3' }
    ]
  },
  {
    id: 'rus-1',
    title: 'Русский язык',
    description: 'Основы русского языка',
    lessons: [
      { id: 'rus-1-1', title: 'Орфография', videoUrl: '', task: 'Напишите слово' }
    ]
  }
]

// пользователи и прогресс

const users = [] // {id, name, email, passwordHash, role}
const progress = {} // userId -> [{lessonId, lessonTitle}]


function createUser({ name, email, password, role = 'student' }) {
  const id = Date.now().toString()
  const passwordHash = bcrypt.hashSync(password, 10)

  const user = { id, name, email, passwordHash, role }
  users.push(user)
  progress[id] = []
  return user
}

module.exports = { courses, users, progress, createUser }

