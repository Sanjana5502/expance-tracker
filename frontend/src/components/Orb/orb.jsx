import React from 'react';
import { motion } from 'framer-motion';
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
  const { width, height } = useWindowSize();

  return (
    <motion.div
  style={{
    width: '70vh',
    height: '70vh',
    position: 'absolute',
    borderRadius: '50%',
    marginLeft: '-35vh',
    marginTop: '-35vh',
    background: 'linear-gradient(180deg, #4f83ff 0%, #1e2a78 100%)',
    filter: 'blur(230px)',
  }}
  animate={{
    x: [0, width, 0],
    y: [0, height / 2, 0],
  }}
  transition={{
    duration: 12,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'linear',
  }}
/>
  );
}

export default Orb;
