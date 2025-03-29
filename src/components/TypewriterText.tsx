
import React from 'react';

interface TypewriterTextProps {
  texts: string[];
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ texts, className = "" }) => {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }
      
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 50);
    } else {
      const currentFullText = texts[currentTextIndex];
      
      if (displayText === currentFullText) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return;
      }
      
      timeout = setTimeout(() => {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
      }, 100);
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, texts]);
  
  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      <span className="border-r-2 border-nodejs-green ml-1 animate-blink">&nbsp;</span>
    </span>
  );
};

export default TypewriterText;
