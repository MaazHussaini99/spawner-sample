import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TsPdfViewer } from 'ts-pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.5.136/build/pdf.worker.min.mjs';

const PDFViewerCard = ({ pdfFile }) => {
  const containerId = 'pdf-viewer-container';
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && pdfFile) {
      containerRef.current.id = containerId;

      const options = {
        containerSelector: `#${containerId}`,
        workerSource: 'https://unpkg.com/pdfjs-dist@4.5.136/build/pdf.worker.min.mjs'
      };

      const viewer = new TsPdfViewer(options);
      viewer.openPdfAsync(pdfFile).catch((error) => console.error('Error loading PDF:', error));

      return () => {
        viewer.destroy();
      };
    }
  }, [pdfFile]);

  return <div ref={containerRef} id={containerId} style={{ height: '850px', width: '100%' }} />;
};

PDFViewerCard.propTypes = {
  pdfFile: PropTypes.instanceOf(Uint8Array).isRequired
};

export default PDFViewerCard;
