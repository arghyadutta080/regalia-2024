import Cursor from "@/components/common/Cursor"
import Hero from "@/components/home/Hero"
import About from "@/components/home/About"
import Events from "@/components/home/Events"



const Home = () => {
 
  return (
    <main className='min-h-screen flex flex-col gap-10'>
   <Hero />
   <About />
   <Events/>
    </main>
  )
}

export default Home