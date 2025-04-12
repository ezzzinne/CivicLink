import { useState, useEffect } from 'react';
import './FindRepresentatives.css';
import Logo from "../assets/civic_link-removebg-preview 2.svg";
import Frame3 from "../assets/Frame3.svg";
import Frame4 from '../assets/Frame4.svg';
import Frame5 from '../assets/Frame5.svg';
import Frame6 from '../assets/Frame6.svg';
import Frame8 from '../assets/Frame8.svg';
import Frame10 from "../assets/Frame10.svg";
import Social1 from '../assets/Frame.svg';
import Social2 from '../assets/Frame1.svg';
import Social3 from '../assets/Frame2.svg';
import Container from '../assets/Container.svg';
import Gmail from "../assets/gmail.svg"
import { Link } from 'react-router-dom';
// import nigeriaData from '../data/nigeria-data.json';
import rawNigeriaData from '../data/nigeria-data.json';
import ReportIssueForm from '../components/ReportIssueForm';


interface Representative {
  name: string;
  role: string;
  lga: string;
  duty: string;
  email: string;
  no: number;
}

interface NigeriaData {
  [state: string]: {
    lgas: string[];
    representatives: Representative[];
  };
}

export default function GovernmentLookupPage() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [activeTab, setActiveTab] = useState('representatives');
  const [, setLoading] = useState(false);
  const [lgas, setLgas] = useState<string[]>([]);
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const nigeriaData: NigeriaData = rawNigeriaData as unknown as NigeriaData;

  const states = Object.keys(nigeriaData);

  useEffect(() => {
    // Reset LGA and representatives when state changes
    if (selectedState && nigeriaData[selectedState]) {
      setLgas(nigeriaData[selectedState].lgas || []);
      setSelectedLga('');
      setRepresentatives([]);
    }
  }, [nigeriaData, selectedState]);

  useEffect(() => {
    if (
      selectedState &&
      selectedLga &&
      nigeriaData[selectedState] &&
      Array.isArray(nigeriaData[selectedState].representatives)
    ) {
      setLoading(true);
      const allReps = nigeriaData[selectedState].representatives;
      const filtered = allReps.filter((rep) => rep.lga === selectedLga);
      setRepresentatives(filtered);
      setLoading(false);
    } else {
      setRepresentatives([]);
    }
  }, [selectedState, selectedLga, nigeriaData]);

  return (
    <div className="gov-page">
      <header className="gov-header">
        <nav className="nav-container">
          <img src={Logo} alt="Logo" />
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li>About</li>
            <li>Government Offices</li>
          </ul>
        </nav>
        <hr />
        <h1>Connect With Your Government Representatives</h1>
        <p>Find the right government officials to address your civic issues and concerns.</p>
        <div className="gov-actions">
          <div className="gov-actions-card">
            <img src={Frame3} alt="icon" />
            <h3>Find Representatives</h3>
            <p>Locate your elected officials</p>
          </div>
          <div className="gov-actions-card">
            <img src={Frame4} alt="icon" />
            <h3>Government Offices</h3>
            <p>Search services and departments</p>
          </div>
          <div className="gov-actions-card">
            <img src={Frame5} alt="icon" />
            <h3>Report Issues</h3>
            <p>Submit concerns and track status</p>
          </div>
        </div>
      </header>

      <section className="gov-search-box">
        <div className="rep-tabs">
          {['government structure', 'find representatives', 'government offices', 'report issue'].map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                console.log('Tab clicked:', tab);
                setActiveTab(tab);}}
            >
              <p>{tab.charAt(0).toUpperCase() + tab.slice(1)}</p>
            </div>
          ))}
        </div>

        <hr />
        {activeTab === 'find representatives' ? (
          <div className="location-container">
            <div className="location-box">
              <div className="location-header">
                <img src={Frame10} alt="" />
                <p>Select Your Location</p>
              </div>

              <div className="dropdowns">
                <div className="select-group">
                  <label>State</label>
                  <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                    <option value="">Select State</option>
                    {states.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="select-group">
                  <label>Local Government Area</label>
                  <select value={selectedLga} onChange={(e) => setSelectedLga(e.target.value)}>
                    <option value="">Select LGA</option>
                    {lgas.map((lga, idx) => (
                      <option key={idx} value={lga}>{lga}</option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="location-note">
                Please select your state to see available local government areas.
              </p>
            </div>

            <h2 style={{ marginTop: "2rem", textAlign: "left" }}>Your Representatives</h2>

            {representatives.length > 0 ? (
              <div className="rep-grid">
                {representatives.map((rep, index) => (
                  <div className="rep-card-ui" key={index}>
                    <div className="rep-icon">
                      <img src={Container} alt="" />
                    </div>
                    <p>{rep.name}</p>
                    <p className="rep-role">{rep.role}</p>
                    <p className="rep-party">{rep.duty}</p>
                    <p className="rep-email">
                      <img src={Gmail} alt="" /> <a href={`mailto:${rep.email}`}>{rep.email}</a>
                    </p>
                    <button className="contact-btn"><span className='contact-btn-span'><img src={Frame8} alt="" /></span><a href={`tel:${rep.no}`}>{rep.no}</a></button>
                  </div>
                ))}

                {/* See More Card */}
                <div className="rep-card-ui see-more-card">
                  <div className="rep-icon see-more-rep">
                    <img src={Container} alt="" />
                  </div>
                  <p className='see-more-rep'>See More Representatives</p>
                  <button className="contact-btn see-more-btn">+ See More Representatives</button>
                </div>
              </div>
            ) : (
              <div className="no-rep-box">
                <div className="icon-placeholder">
                  <img src={Frame6} alt="no representatives" />
                </div>
                <h4>No Representatives Found</h4>
                <p>Please select your state and local government area to see your representatives.</p>
              </div>
            )}

          </div>
        ) : activeTab === 'report issue' ? (
          <ReportIssueForm />
        ) : (
          <div className="tab-placeholder">
            <div className="spinner" />
            <p>Loading content for this section...</p>
        </div>
        )}
      </section>

      <footer className="gov-footer">
        <div className="footer-links">
          <div>
            <img src={Logo} alt="Logo" />
            <p>Bridging the gap between citizens and government in Nigeria.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <a href="#">About Us</a>
            <a href="#">Features</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div>
            <h4>Connect With Us</h4>
            <div className="icons">
              <a href="#"><img src={Social1} alt="social" /></a>
              <a href="#"><img src={Social2} alt="social" /></a>
              <a href="#"><img src={Social3} alt="social" /></a>
            </div>
          </div>
        </div>
        <hr />
        <p className="copyright">© 2025 CivicLink. All rights reserved.</p>
      </footer>
    </div>
  );
}
