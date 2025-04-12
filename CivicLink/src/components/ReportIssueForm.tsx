import { useState } from 'react';
import './ReportIssueForm.css';
import Frame9 from "../assets/Frame9.svg"

const steps = ['Select Category', 'Upload Photos & Location', 'Review & Submit'];

export default function ReportIssueForm() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    const report = { category, description, location, email };
    console.log("Submitted report:", report);
    alert("Report submitted!");
  };

  return (
    <div className="report-issue-box">
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
          <label>Issue Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail..."
          ></textarea>
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
          <label>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location or use current location"
          />
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
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Status:</strong> Draft</p>
          </div>
          <label>Contact Information</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email Address"
          />
          <div className="nav-btns">
            <button onClick={back} className="back-btn">Back</button>
            <button className="submit-btn" onClick={handleSubmit}>Submit Report</button>
          </div>
        </div>
      )}
    </div>
  );
}
