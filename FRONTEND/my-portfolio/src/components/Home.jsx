
import ThemeToggle from "./ThemeToggle";
import StarBackground from "./StarBackground";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";


function Home(){
    return(
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/*Theme Toggle*/}
        <ThemeToggle/>

        {/*Background effects*/}
        <StarBackground/>

        {/*Navbar*/}
        <NavBar/>

        {/*Main Content*/}
        <main>
            <HeroSection/>
            <AboutSection/>
            <Skills/>
            <Projects/>
            <Contact/>
        </main>

        {/*Footer*/}
        <Footer/>

    </div>)
}

export default Home;