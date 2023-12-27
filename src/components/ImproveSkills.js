import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ImproveSkills() {
  const [isHovered, setIsHovered] = useState(false);

  const list = [
    'Learn new recipes',
    'Experiment with food',
    'Write your own recipes',
    'Know nutrition facts',
    'Get cooking tips',
    'Get ranked',
  ];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="section improve-skills">
      <div className="col img">
        <img src="/img/gallery/img_10.jpg" alt="" />
      </div>
      <div className="col typography">
        <h1 className="title">Improve Your Culinary Skills</h1>
        {list.map((item, index) => (
          <p className="skill-item" key={index}>
            {item}
          </p>
        ))}
        <Link to='/register'>
          <button
            className="btn"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isHovered ? 'pointer' : 'default' }}
          >
            signup now
          </button>
        </Link>
      </div>
    </div>
  );
}
