import Benefits from './sections/Benefits'
import CourseValue from './sections/CourseValue'
import Hero from './sections/Hero'
import NoSymptoms from './sections/NoSymptoms'
import Symptoms from './sections/Symptoms'
import Waiting from './sections/Waiting'

function App() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] bg-cream">
      <Hero />
      <Waiting />
      <Symptoms />
      <NoSymptoms />
      <CourseValue />
      <Benefits />
    </main>
  )
}

export default App
