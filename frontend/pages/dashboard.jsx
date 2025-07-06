import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then((res) => res.json())
      .then(setCourses)

    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:5000/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
    }
  }, [])

  if (!user) return <Layout>Загрузка...</Layout>

  const progressMap = user.progress.reduce((acc, item) => {
    const course = courses.find((c) => c.lessons.some((l) => l.id === item.lessonId))
    if (course) {
      acc[course.id] = acc[course.id] || { course, completed: 0 }
      acc[course.id].completed += 1
    }
    return acc
  }, {})

  return (
    <Layout user={{ name: user.user.name }}>
      <h1 className="text-2xl font-semibold mb-6">Привет, {user.user.name}!</h1>
      <div className="space-y-6">
        {courses.map((course) => {
          const completed = progressMap[course.id]?.completed || 0
          const total = course.lessons.length
          const percent = Math.round((completed / total) * 100)
          return (
            <div key={course.id} className="bg-edu-card p-4 rounded-lg shadow">
              <h2 className="font-medium text-lg mb-2">{course.title}</h2>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <motion.div
                  className="h-2 bg-edu-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-sm mt-1">{percent}% пройдено</p>
              <ul className="mt-2 pl-4 list-disc space-y-1">
                {course.lessons.slice(0, completed).map((lesson, i) => (
                  <li key={lesson.id} className="flex items-center text-sm">
                    <span className="text-edu-accent mr-2">✓</span>
                    {lesson.title} пройдено
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
