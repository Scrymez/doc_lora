import About from './sections/About'
import Benefits from './sections/Benefits'
import CourseValue from './sections/CourseValue'
import Hero from './sections/Hero'
import Mission from './sections/Mission'
import NoSymptoms from './sections/NoSymptoms'
import Reviews from './sections/Reviews'
import Symptoms from './sections/Symptoms'
import Waiting from './sections/Waiting'
import WorryTabs from './sections/WorryTabs'

function App() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] bg-cream">
      <Hero />
      {/* Средний блок — единый градиент FCF5E9 → F5DBB6 → FCF5E9 */}
      <div className="relative z-30 -mt-8 overflow-hidden rounded-t-[24px] bg-[linear-gradient(180deg,#fcf5e9_0%,#f5dbb6_50%,#fcf5e9_100%)]">
        <Waiting />
        <Symptoms />
        <NoSymptoms />
        <CourseValue />
        <Benefits />
      </div>
      <About />
      <WorryTabs />
      <Mission />
      <Reviews />
    </main>
  )
}

export default App
