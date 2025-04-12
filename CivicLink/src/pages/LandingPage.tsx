import { useTranslation } from 'react-i18next'
import './LandingPage.css'
import GlobeIcon from '../assets/globe.svg';
import HeroImg from '../assets/img.svg';
import Vector1 from '../assets/Vector.svg';
import Vector2 from '../assets/Vector1.svg';
import Vector3 from '../assets/Vector2.svg';
import Social1 from '../assets/Frame.svg';
import Social2 from '../assets/Frame1.svg';
import Social3 from '../assets/Frame2.svg';
import Logo from "../assets/civic_link-removebg-preview 2.svg"
import { Link } from 'react-router-dom';
import ConnectWallet from '../components/ConnectWallet';

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <main className="main-container">

        {/* Nav bar */}
        <nav className="navbar">
          <div className="nav-controls">
            <img src={Logo} alt="" />
            <div className='nav-links'>
              <Link to="/" className="nav-link">Home</Link>
              <div className='nav-link'>About</div>
              <div className='nav-link'>Government Offices</div>
            </div>
            <div className='nav-right'>
              <div className='nav-link'><ConnectWallet /></div>
              <div className="language-switcher">
                <img src={GlobeIcon} alt="language"></img>
                <select onChange={handleLanguageChange} id='google_translate_element'>
                  <option value="en" id='google_translate_element'>English</option>
                  <option value="ig" id='google_translate_element'>Igbo</option>
                  <option value="yo" id='google_translate_element'>Yoruba</option>
                  <option value="ha"id='google_translate_element'>Hausa</option>
                </select>
              </div>
              
            </div>
          </div>
        </nav>

        {/* Section 1 */}
        <div className="hero">
          <h2>{t("heroTitle")}</h2>
          <p>{t("heroText")}</p>
          <div className="cta-buttons">
            <Link to="/lookup">
              <button className="btn primary-btn">{t("getStarted")}</button>
            </Link>
          </div>
          <img src={HeroImg} alt="" className="hero-img"></img>
        </div>

        {/* Section 2 */}
        <section className="features">
          <p className="features-heading">{t("keyFeatures")}</p>
          <div className="feature-card-container">
            <div className="feature-card">
              <img src={Vector1} alt=""></img>
              <h3>{t("feature1Title")}</h3>
              <p>{t("feature1Text")}</p>
            </div>
            <div className="feature-card">
              <img src={Vector2} alt=""></img>
              <h3>{t("feature2Title")}</h3>
              <p>{t("feature2Text")}</p>
            </div>
            <div className="feature-card">
              <img src={Vector3} alt=""></img>
              <h3>{t("feature3Title")}</h3>
              <p>{t("feature3Text")}</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="join-section">
          <h1>{t("joinTitle")}</h1>
          <p>{t("joinText")}</p>
          <button className="btn secondary-btn">{t("createAccount")}</button>
        </section>

        {/* Section 4 */}
        <footer className="footer">
          <div className="footer-container">
            <div>
              <h3 className="logo">CIVICLINK</h3>
              <p>{t("footerDesc")}</p>
            </div>
            <div>
              <h4>{t("quickLinks")}</h4>
              <a href="#">{t("aboutUs")}</a>
              <a href="#">{t("features")}</a>
              <a href="#">{t("contact")}</a>
            </div>
            <div>
              <h4>{t("legal")}</h4>
              <a href="#">{t("privacyPolicy")}</a>
              <a href="#">{t("terms")}</a>
            </div>
            <div>
              <h4>{t("connect")}</h4>
              <div className="icons">
                <a href="#"><img src={Social1} alt="social"></img></a>
                <a href="#"><img src={Social2} alt="social"></img></a>
                <a href="#"><img src={Social3} alt="social" /></a>
              </div>
            </div>
          </div>
          <hr />
          <p className="copyright">{t("copyright")}</p>
        </footer>
      </main>
    </>
  )
}

