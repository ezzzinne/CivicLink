import { useEffect, useState } from 'react';
import './ReportIssueForm.css';
import Frame9 from "../assets/Frame9.svg";
import Frame11 from "../assets/Frame11.svg"
import rawNigeriaData from '../data/nigeria-data.json';
import LocationSelector from './LocationSelector';


const steps = ['Select Category', 'Upload Photos & Location', 'Review & Submit'];

export default function ReportIssueForm() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location] = useState('');
  const [email, setEmail] = useState('');

  const next = () => {
    if (step === 1) {
      let valid = true;
      if (!category) {
        setCategoryError('Please select a category.');
        valid = false;
      } else {
        setCategoryError('');
      }
  
      if (!description.trim()) {
        setDescriptionError('Please enter a description.');
        valid = false;
      } else {
        setDescriptionError('');
      }
  
      if (!valid) return;
    }
  
    if (step === 2) {
      if (!selectedState || !selectedLga) {
        setLocationError('Please select both a State and LGA.');
        return;
      }
      setLocationError('');
    }
  
    setStep((prev) => Math.min(prev + 1, steps.length));
  };
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }
    const report = { category, description, location, email, state: selectedState, lga: selectedLga };
    console.log("Submitted report:", report);
    alert("Report submitted!");

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
  };

  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [lgas, setLgas] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nigeriaData: any = rawNigeriaData;
  const states = Object.keys(nigeriaData);

  const [categoryError, setCategoryError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [emailError, setEmailError] = useState('');


  useEffect(() => {
    if (selectedState && nigeriaData[selectedState]) {
      setLgas(nigeriaData[selectedState].lgas || []);
      setSelectedLga('');
    }
  }, [selectedState]);
  

  return (
    <div className="report-issue-box">
      <LocationSelector 
        states={states}
        lgas={lgas}
        selectedState={selectedState}
        selectedLga={selectedLga}
        onStateChange={setSelectedState}
        onLgaChange={setSelectedLga}
      />
      {locationError && <p className="error-text">{locationError}</p>}


      <p>Report An Issue</p>
      <div className="step-progress-container">
        {steps.map((_, index) => (
          <div className="step-wrapper" key={index}>
            <div
              className={`step-dot ${
                step === index + 1
                  ? 'active'
                  : step > index + 1
                  ? 'completed'
                  : ''
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`step-line ${step > index + 1 ? 'completed' : ''}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="step-form">
          <label>Issue Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Roads And Infrastructure">Roads And Infrastructure</option>
            <option value="Security">Security</option>
            <option value="Water & Sanitation">Water & Sanitation</option>
          </select>
          {categoryError && <p className="error-text">{categoryError}</p>}

          <label>Issue Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail..."
          ></textarea>
          {descriptionError && <p className="error-text">{descriptionError}</p>}

          <button onClick={next} className="continue-btn">Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="step-form">
          <div className="upload-box">
            <img src={Frame9} alt="" />
            <p>Drag and Drop Photos Here or Click to Upload</p>

            {/* Hidden file input */}
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                console.log('Selected file:', file);
              }}
            />

            <button
              type='button'
              onClick={() => document.getElementById('fileInput')?.click()}
            >Browse Files</button>
          </div>
          <div className="nav-btns">
            <button onClick={back} className="back-btn">Back</button>
            <button onClick={next} className="continue-btn">Continue</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step-form">
          <div className="review-box">
            <p className='review-p'>Review Your Report</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Location:</strong> {selectedState}, {selectedLga}</p>
            <p><strong>Status:</strong> <span style={{color: 'yellow'}}>Draft</span></p>
          </div>
          <label>Contact Information</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email Address"
          />
          {emailError && <p className="error-text">{emailError}</p>}

          <div className="nav-btns">
            <button onClick={back} className="back-btn">Back</button>
            <div className='submit-btn-container'>
              <img src={Frame11} alt="" />
              <button className="submit-btn" onClick={handleSubmit}>Submit Report</button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
