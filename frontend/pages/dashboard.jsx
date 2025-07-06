import Layout from '../components/Layout'
import { motion } from 'framer-motion'

const user = { name: 'Иван' }

const progressData = [
  {
    courseId: 'math',
    courseName: 'Математика 5 класс',
    completedLessons: 2,
    totalLessons: 5,
  },
  {
    courseId: 'english',
    courseName: 'Английский язык',
    completedLessons: 1,
    totalLessons: 4,
  },
]

export default function Dashboard() {
  return (
    <Layout user={user}>
      <h1 className="text-2xl font-semibold mb-6">Привет, {user.name}!</h1>
      <div className="space-y-6">
        {progressData.map((course) => {
          const percent = Math.round(
            (course.completedLessons / course.totalLessons) * 100
          )
          return (
            <div
              key={course.courseId}
              className="bg-edu-card p-4 rounded-lg shadow"
            >
              <h2 className="font-medium text-lg mb-2">{course.courseName}</h2>
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
                {Array.from({ length: course.completedLessons }).map((_, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <span className="text-edu-accent mr-2">✓</span>
                    Урок {i + 1} пройдено
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
