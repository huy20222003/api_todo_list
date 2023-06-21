import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Home() {
    return (
        <>
        <header className='header'>
            <Header />
        </header>
        <div className='container'>
            Body123
        </div>
        <footer className='footer'>
            <Footer />
        </footer>
        </>
    );
}

export default Home;