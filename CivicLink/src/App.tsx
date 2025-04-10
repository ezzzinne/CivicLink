

import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <main className="main-container">

        {/* Nav bar */}
        <nav className="navbar">
          <h1 className="logo">CIVICLINK</h1>
          <div className="nav-controls">
            <button className="btn connect-btn">Connect Wallet</button>
            <div className="language-switcher">
              <img src="./src/assets/globe.svg" alt="language"></img>
              <select onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="ig">Igbo</option>
                <option value="yo">Yoruba</option>
                <option value="ha">Hausa</option>
              </select>
            </div>
          </div>
        </nav>

        {/* Section 1 */}
        <div className="hero">
          <h2>{t("heroTitle")}</h2>
          <p>{t("heroText")}</p>
          <div className="cta-buttons">
            <button className="btn primary-btn">{t("learnMore")}</button>
            <button className="btn secondary-btn">{t("learnMore")}</button>
          </div>
          <img src="./src/assets/img.svg" alt="" className="hero-img"></img>
        </div>

        {/* Section 2 */}
        <section className="features">
          <p className="features-heading">{t("keyFeatures")}</p>
          <div className="feature-card">
            <img src="./src/assets/Vector.svg" alt=""></img>
            <h3>{t("feature1Title")}</h3>
            <p>{t("feature1Text")}</p>
          </div>
          <div className="feature-card">
            <img src="./src/assets/Vector1.svg" alt=""></img>
            <h3>{t("feature2Title")}</h3>
            <p>{t("feature2Text")}</p>
          </div>
          <div className="feature-card">
            <img src="./src/assets/Vector2.svg" alt=""></img>
            <h3>{t("feature3Title")}</h3>
            <p>{t("feature3Text")}</p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="join-section">
          <h3>{t("joinTitle")}</h3>
          <p>{t("joinText")}</p>
          <button className="btn secondary-btn">{t("createAccount")}</button>
        </section>

        {/* Section 4 */}
        <footer className="footer">
          <h3 className="logo">CIVICLINK</h3>
          <p>{t("footerDesc")}</p>
          
          <div className="footer-links">
            <h4>{t("quickLinks")}</h4>
            <a href="#">{t("aboutUs")}</a>
            <a href="#">{t("features")}</a>
            <a href="#">{t("contact")}</a>
          </div>
          <div className="footer-links">
            <h4>{t("legal")}</h4>
            <a href="#">{t("privacyPolicy")}</a>
            <a href="#">{t("terms")}</a>
          </div>
          <div className="footer-links">
            <h4>{t("connect")}</h4>
            <div className="icons">
              <a href="#"><img src="./src/assets/Frame.svg" alt=""></img></a>
              <a href="#"><img src="./src/assets/Frame1.svg" alt=""></img></a>
              <a href="#"><img src="./src/assets/Frame2.svg" alt="" /></a>
            </div>
          </div>

          <hr className="hr"></hr>
          <p className="copyright">{t("copyright")}</p>
        </footer>
      </main>
    </>
  )
}

export default App
