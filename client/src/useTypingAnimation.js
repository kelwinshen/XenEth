import { useState, useEffect } from 'react';

function useTypingAnimation(textArray, typingSpeed = 100, pauseDuration = 1000) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const typeText = () => {
      if (charIndex < textArray[currentIndex].length) {
        setDisplayedText(prev => prev + textArray[currentIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % textArray.length);
          setCharIndex(0);
          setDisplayedText('');
          setIsPaused(false);
        }, pauseDuration);
      }
    };

    const timer = setInterval(typeText, typingSpeed);

    return () => clearInterval(timer);
  }, [charIndex, currentIndex, isPaused, pauseDuration, textArray, typingSpeed]);

  return displayedText;
}

export default useTypingAnimation;
