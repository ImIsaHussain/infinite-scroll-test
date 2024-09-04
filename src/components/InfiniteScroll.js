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
      const { scrollTop, clientHeight } = container;
      const startElement = content.querySelector('#scroll-start');
      const endElement = content.querySelector('#scroll-end');
      
      console.log('Container clientHeight:', clientHeight);
      console.log('Container scrollTop:', scrollTop);
      
      if (startElement && endElement) {
        const containerRect = container.getBoundingClientRect();
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();

        // Calculate positions relative to the container
        const startPosition = startRect.top - containerRect.top + scrollTop;
        const endPosition = endRect.bottom - containerRect.top + scrollTop - clientHeight;

        console.log('Start element position:', startPosition);
        console.log('End element position:', endPosition);
        console.log('Start element top relative to viewport:', startRect.top);
        console.log('End element bottom relative to viewport:', endRect.bottom);

        // Check if startRect is at or below the client height
        if (startRect.top >= clientHeight) {
          console.log('Start element is at or below viewport bottom, jumping to end');
          container.scrollTop = endPosition;
        } else if (endRect.bottom <= 0) {
          console.log('End element is above viewport top, jumping to start');
          container.scrollTop = startPosition;
        }
      }
    };

    // Set initial scroll position to have scroll-start at the top
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