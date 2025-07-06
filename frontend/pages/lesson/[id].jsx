import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'

const lessons = [
  {
    id: 'math-1',
    title: 'Математика. Урок 1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    text: 'В этом уроке ты узнаешь основы деления...',
    question: 'Сколько будет 12 / 4?',
    correctAnswer: '3'
  }
]

export default function LessonPage() {
  const { query } = useRouter()
  const [lesson, setLesson] = useState(null)
  const [answer, setAnswer] = useState('')
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!query.id) return
    const l = lessons.find(l => l.id === query.id)
    setLesson(l)
  }, [query.id])

  const handleComplete = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      await fetch(`http://localhost:5000/api/lessons/${lesson.id}/complete`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
    }
    setCompleted(true)
  }

  if (!lesson) return <Layout><div>Урок не найден</div></Layout>

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="h-2 bg-gray-200 rounded overflow-hidden">
          <motion.div
            className="h-2 bg-edu-accent"
            initial={{ width: 0 }}
            animate={{ width: completed ? '100%' : '0%' }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="bg-edu-card rounded-lg p-4 shadow">
          <h1 className="text-xl font-semibold mb-4">{lesson.title}</h1>
          <div className="aspect-video mb-4">
            <iframe
              src={lesson.videoUrl}
              title={lesson.title}
              className="w-full h-full rounded"
              allowFullScreen
            ></iframe>
          </div>
          <p className="mb-4">{lesson.text}</p>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{lesson.question}</label>
            <input
              type="text"
              className="p-2 w-full rounded border"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
          </div>
          <button
            onClick={handleComplete}
            className="bg-edu-accent text-gray-900 px-4 py-2 rounded"
          >
            Завершить урок
          </button>
        </div>
      </div>
    </Layout>
  )
}
