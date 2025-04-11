import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchStates, fetchLgas, fetchRepresentatives } from '../redux/slices/representativeSlice';
import './FindRepresentatives.css';
import Logo from "../assets/civic_link-removebg-preview 2.svg";
import Frame3 from "../assets/Frame3.svg";
import Frame4 from '../assets/Frame4.svg';
import Frame5 from '../assets/Frame5.svg';
import Frame6 from '../assets/Frame6.svg';
import Social1 from '../assets/Frame.svg';
import Social2 from '../assets/Frame1.svg';
import Social3 from '../assets/Frame2.svg';
import { Link } from 'react-router-dom';

  export default function GovernmentLookupPage() {
    const [selectedState, setSelectedState] = useState('');
    const [selectedLga, setSelectedLga] = useState('');
    const [activeTab, setActiveTab] = useState('representatives');
    const dispatch = useDispatch<AppDispatch>();
    const {
      states = [],
      lgas = [],
      representatives = [],
      loading = false
    } = useSelector((rootState: RootState) => rootState.representatives || {});
    

    // Fetch states on mount
    useEffect(() => {
      dispatch(fetchStates());
    }, [dispatch]);

    // Fetch LGAs when state changes
    useEffect(() => {
      if (selectedState) {
        dispatch(fetchLgas(selectedState));
      }
    }, [dispatch, selectedState]);

    useEffect(() => {
      if (selectedState && selectedLga) {
        dispatch(fetchRepresentatives({ state: selectedState, lga: selectedLga }));
      }
    }, [dispatch, selectedState, selectedLga]);
    
    return (
      <>
        <div className="gov-page">
          <header className="gov-header">
            <nav className="nav-container">
              <img src={Logo} alt="Logo" />
              <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><a href="">Find Representatives</a></li>
                <li><a href="">Government Offices</a></li>
                <li><a href="">About</a></li>
              </ul>
            </nav>
            <hr />
            <h1>Connect With Your Government Representatives</h1>
            <p>Find the right government officials to address your civic issues and concerns.</p>
            <div className="gov-actions">
              <div className="gov-actions-card">
                <img src={Frame3} alt=""></img>
                <h3>Find Representatives</h3>
                <p>Locate your elected officials</p>
              </div>
              <div className="gov-actions-card">
                <img src={Frame4} alt=""></img>
                <h3>Government Offices</h3>
                <p>Search services and departments</p>
              </div>
              <div className="gov-actions-card">
                <img src={Frame5} alt=""></img>
                <h3>Report Issues</h3>
                <p>Submit concerns and track status</p>
              </div>
            </div>
          </header>

          <section className="gov-search-box">

            {/* Tab Navigation */}
            <div className="rep-tabs">
          {['government structure', 'find representatives', 'government offices', 'report issue'].map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <img src="" alt="" />
              <p>{tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}</p>
            </div>
          ))}
        </div>

            <hr />

            <div className='location-container'>
              <div className='location-box'>

                <div className='location-header'>
                  <img src="" alt="" />
                  <p>Select Your Location</p>
                </div>

                <div className="dropdowns">
                  <div className='select-group'>
                    <label>State</label>
                    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                      <option value="">Select State</option>
                      {states.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className='select-group'>
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
                {/* Empty State Message */}
              {loading ? (
                <p>Loading...</p>
              ) : representatives.length === 0 ? (
                <div className="no-rep-box">
                <div className="icon-placeholder">
                  <img src={Frame6} alt="" />
                </div>
                <h4>No Representatives Found</h4>
                <p>Please select your state and local government area to see your representatives.</p>
              </div>
              ) : (
                <ul className='rep-list'>
                  {representatives.map((rep, index) => (
                    <li key={index} className='rep-card'>
                      <strong>{rep.name}</strong>
                      <p>{rep.role}</p>
                    </li>
                  ))}
                </ul>
              )} 
            </div>
          </section>

          <footer className="gov-footer">
            <div className="footer-links">
              <div>
              <img src={Logo} alt="" />
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
                <div className='icons'>
                  <a href="#"><img src={Social1} alt="social"></img></a>
                  <a href="#"><img src={Social2} alt="social"></img></a>
                  <a href="#"><img src={Social3} alt="social" /></a>
                </div>
              </div>
            </div>
            <hr />
            <p className="copyright">© 2025 CivicLink. All rights reserved.</p>
          </footer>
        </div>
      </>
    );
  }
