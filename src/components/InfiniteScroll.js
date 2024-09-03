import React, { useEffect, useRef } from 'react';
import './InfiniteScroll.css';

const InfiniteScroll = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = container.querySelector('.content');
    const originalContent = document.getElementById('scroll-content');

    // Copy content from the hidden div to the scroll container
    content.innerHTML = originalContent.innerHTML;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      
      if (scrollTop + clientHeight >= scrollHeight) {
        // Reached bottom, jump to start position
        const startElement = content.querySelector('#scroll-start');
        if (startElement) {
          container.scrollTop = startElement.offsetTop;
        }
      } else if (scrollTop <= 0) {
        // Reached top, jump to end
        const endElement = content.querySelector('#scroll-end');
        if (endElement) {
          container.scrollTop = endElement.offsetTop - clientHeight + endElement.offsetHeight;
        } else {
          container.scrollTop = scrollHeight - clientHeight;
        }
      }
    };

    // Set initial scroll position to the scroll-start div
    const startElement = content.querySelector('#scroll-start');
    if (startElement) {
      container.scrollTop = startElement.offsetTop;
    }

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="infinite-scroll-container" ref={containerRef}>
      <div className="content"></div>
    </div>
  );
};

export default InfiniteScroll;