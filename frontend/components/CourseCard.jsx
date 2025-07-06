import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CourseCard({ course }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-edu-card rounded-lg p-4 shadow hover:shadow-md">
      <h2 className="font-semibold text-lg mb-2">{course.title}</h2>
      <p className="mb-2">{course.description}</p>
      <Link href={`/course/${course.id}`} className="inline-block mt-2 bg-edu-accent text-gray-900 px-3 py-1 rounded">Перейти</Link>
    </motion.div>
  )
}
