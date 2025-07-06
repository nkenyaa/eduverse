import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'

export default function CoursePage() {
  const { query } = useRouter()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    if (!query.id) return
    fetch(`http://localhost:5000/api/courses/${query.id}`)
      .then(res => res.json())
      .then(setCourse)
  }, [query.id])

  if (!course) return <div>Загрузка...</div>

  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl mb-4">{course.title}</h1>
        <ul className="space-y-2">
          {course.lessons.map(lesson => (
            <li key={lesson.id} className="border p-2 rounded">
              <div className="font-semibold">{lesson.title}</div>
              <video src={lesson.videoUrl} controls className="w-full my-2" />
              <p>{lesson.task}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
