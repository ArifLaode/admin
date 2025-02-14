import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { motion } from 'framer-motion';

const Section = ({ title, children, width, collapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sectionStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: 'white',
    width: `${width}%`,
  };

  const titleStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '24px'
  };

  return (
    <div style={sectionStyle}>
      <div style={titleStyle} onClick={() => setIsCollapsed(!isCollapsed)}>
        <h2>{title}</h2>
          <button>
          {isCollapsed? <SlArrowDown size={20} />: <SlArrowUp size={20} />}
        </button>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0, visibility: 'hidden' }}
        animate={isCollapsed? { height: 0, opacity: 0, visibility: 'hidden' }: { height: 'auto', opacity: 3, visibility: 'visible' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
};

Section.defaultProps = {
  width: 100,
};

export default Section;