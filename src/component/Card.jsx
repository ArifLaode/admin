import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

const Card = ({ icon, title, content, navigationLink, backgroundColor, textColor, padding, width, height, useLinker }) => {
  const [animatedContent, setAnimatedContent] = useState(0);

  useEffect(() => {
    // Periksa apakah content hanya berisi angka
    const isNumber = /^\d+$/.test(content);

    if (isNumber) {
      let startValue = 0;
      const endValue = parseInt(content, 10);
      const duration = 500; // Durasi animasi dalam milidetik
      const steps = 50; // Jumlah langkah animasi
      const increment = (endValue - startValue) / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.floor(startValue + increment * currentStep);
        setAnimatedContent(newValue);

        if (currentStep === steps) {
          clearInterval(timer);
          setAnimatedContent(endValue);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setAnimatedContent(content);
    }
  }, [content]);

  const cardStyle = {
    color: textColor,
    padding: padding,
    width: width,
    height: height,
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '10px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.8)',
    gap: '10px',
    transition: 'ease', // Add transition for smooth hover effect
  };

  return (
    <div style={cardStyle} className={`${backgroundColor} hover:opacity-75`}>
      {icon && <div style={{ display: 'flex', justifyContent: 'center', marginTop: `2px` }}>{icon}</div>}
      {title && <h2 style={{ fontSize: `24px`, marginBottom: '2%', justifyContent: 'center', display: 'flex' }} className='font-bold'>{title}</h2>}
      {content && <p style={{ fontSize: `32px`, justifyContent: 'center', display: 'flex'}} className='font-bold'>{animatedContent}</p>}
      {navigationLink && useLinker && (
        <a href={navigationLink} style={{ color: textColor, textDecoration: 'none', alignSelf: 'flex-end', marginTop: `calc(0.0001/100*${height})` }}>
          <LuSquareArrowOutUpRight title='Detail' size={18} />
        </a>
      )}
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  content: PropTypes.string,
  navigationLink: PropTypes.string,
  useLinker: PropTypes.bool,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

Card.defaultProps = {
  backgroundColor: 'bg-white',
  textColor: '#000000',
  padding: '20px',
  width: '350px',
  height: '230px',
  useLinker: true,
};

export default Card;