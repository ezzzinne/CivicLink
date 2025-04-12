import React from 'react';
import "../pages/FindRepresentatives.css";
import Frame10 from "../assets/Frame10.svg";

interface Props {
  states: string[];
  lgas: string[];
  selectedState: string;
  selectedLga: string;
  onStateChange: (state: string) => void;
  onLgaChange: (lga: string) => void;
}

const LocationSelector: React.FC<Props> = ({
  states,
  lgas,
  selectedState,
  selectedLga,
  onStateChange,
  onLgaChange
}) => {
  return (
    <div className='location-box'>
        <div className="location-header">
            <img src={Frame10} alt="" />
            <p>Select Your Location</p>
        </div>

        <div className="dropdowns">
            <div className="select-group">
                <label>State</label>
                <select value={selectedState} onChange={(e) => onStateChange(e.target.value)}>
                <option value="">Select State</option>
                {states.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                ))}
                </select>
            </div>

            <div className="select-group">
                <label>Local Government Area</label>
                <select value={selectedLga} onChange={(e) => onLgaChange(e.target.value)}>
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
  );
};

export default LocationSelector;
