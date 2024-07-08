import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../App.css'; // Add your styles here
import image1 from '../assets/vibratoryroller.jpg'
import image2 from '../assets/Vibratory-Roller-Double-Drum.jpg'


const Vibratoryroller = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="container">
        <h1>Vibratory Roller</h1>
      <div className="row">
        <div className="column description">
          <p>A vibratory roller is a heavy construction machinery used in road construction and compaction tasks. It has a vibrating drum that compacts soil, asphalt, or other materials to create a smooth and dense surface. The vibrations help in settling the material and reducing air gaps, resulting in a more stable and durable road or foundation.</p>
          <strong><p>Vibratory rollers typically consist of several key components:</p></strong>
          <ul className='unorderlist1'>
            <li>Drum</li>
            <li>Vibration System</li>
            <li>Engine</li>
            <li>Frame</li>
            <li>Transmission</li>
            <li>Operator’s Platform</li>
            <li>Water System</li>
            <li>Hydraulic System</li>
          </ul>
        </div>
        <div className="column image">
          <img src={image1} alt="Description 1" />
        </div>
      </div>
      <div ref={ref} className={`row ${inView ? 'visible' : 'hidden'}`}>
        <div className="column image">
          <img src={image2} alt="Description 2" />
        </div>
        <div className="column description">
          <p>Description on the right-hand side</p>
        </div>
      </div>
    </div>
  );
};

export default Vibratoryroller;
