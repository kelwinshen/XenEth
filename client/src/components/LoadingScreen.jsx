import useTypingAnimation from '../useTypingAnimation'; // Import the custom hook





const LoadingScreen = () => {
  const typingText = useTypingAnimation([
    'Loading...',
    'Loading...',
    'Loading...',
    'Loading...',
    'Loading...'
  ], 100, 1500); // Adjust typing speed and pause duration

  const gradientTextStyle = {
    background: 'linear-gradient(90deg, #89A9EF 0%, #C7B2F3 28%, #EECCC3 62%, #B7F9F4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="md:text-[60px] text-[40px] font-bold" style={gradientTextStyle}>
      {typingText}|
      </h2>
    </div>
  );
};

export default LoadingScreen;
