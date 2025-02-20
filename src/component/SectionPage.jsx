import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const SectionPage = ({ title, children, width, height, item }) => {

  const sectionStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: 'white',
    width: `${width}%`,
    height: height ? `${height}px` : 'auto',
  };

  const titleStyle = {
    display: 'flex',
    justifyContent: 'justify-between',
    alignItems: 'center',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '24px'
  };

  return (
    <div style={sectionStyle}>
      <motion.div
          initial={{ opacity: 0, scale: 0.95, y: '100%' }}
          animate={{ opacity: 1, scale: 1, y: '0%' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
      <div style={titleStyle}>
        <h2>{title}</h2>
        {item && (
          React.isValidElement(item) ? item : <>{item}</>
        )}
      </div>
      <div>
        
          {children}
        </div>
        </motion.div>
    </div>
    
  );
};

SectionPage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  item: PropTypes.object,
};

SectionPage.defaultProps = {
  width: 100,
};

export default SectionPage;