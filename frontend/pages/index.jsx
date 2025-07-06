import { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import Layout from '../components/Layout'

export default function Home() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(setCourses)
  }, [])

  return (
    <Layout>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(c => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </Layout>
  )
}
