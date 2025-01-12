import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TsPdfViewer } from 'ts-pdf';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
//import { drawTable } from 'pdf-lib-draw-table-beta';

GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.5.136/build/pdf.worker.min.mjs';

const PDFAnnotator = ({ pdfFile, formData }) => {
  const containerId = 'pdf-annotator-container';
  const containerRef = useRef(null);
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    if (containerRef.current && pdfFile) {
      containerRef.current.id = containerId;

      const options = {
        containerSelector: `#${containerId}`,
        workerSource: 'https://unpkg.com/pdfjs-dist@4.5.136/build/pdf.worker.min.mjs',
        fileButtons: 'save'
      };

      const newViewer = new TsPdfViewer(options);
      setViewer(newViewer);

      const loadPdf = async () => {
        try {
          console.log('Loading PDF...');
          await newViewer.openPdfAsync(pdfFile);
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };

      loadPdf();

      return () => {
        newViewer.destroy();
      };
    }
  }, [pdfFile]);

  const annotatePdf = useCallback(
    async (data) => {
      if (!data || !pdfFile) return;

      try {
        console.log('Annotating PDF...');
        const arrayBuffer = pdfFile.buffer || (await pdfFile.arrayBuffer());
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const page = pdfDoc.getPage(0);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const size = 12;
        const color = rgb(1, 0, 0);

        if (data.sealSeries) {
          page.drawText(data.sealSeries, {
            x: page.getWidth() - 300,
            y: page.getHeight() - 935,
            size,
            font,
            color
          });
        }
        if (data.shaftSize) {
          page.drawText(data.shaftSize, {
            x: page.getWidth() - 70,
            y: page.getHeight() - 950,
            size,
            font,
            color
          });
        }

        if (data.sealConstructionId) {
          page.drawText(data.sealConstructionId, {
            x: page.getWidth() - 200,
            y: page.getHeight() - 950,
            size,
            font,
            color
          });
        }

        page.drawText(data.ibSealSize || '', {
          x: page.getWidth() - 70,
          y: page.getHeight() - 920,
          size,
          font,
          color
        });

        page.drawText(data.obSealSize || '', {
          x: page.getWidth() - 70,
          y: page.getHeight() - 935,
          size,
          font,
          color
        });

        page.drawText(data.drfNo || '', {
          x: page.getWidth() - 250,
          y: page.getHeight() - 1022,
          size,
          font,
          color
        });

        page.drawText(data.materialInbound1 || '', {
          x: page.getWidth() - 250,
          y: page.getHeight() - 1000,
          size,
          font,
          color
        });

        // Draw the heading "BILL OF MATERIAL"
        // const headers = ['SR.NO', 'PART NO', 'DESCRIPTION', 'MATERIAL', 'QTY.', 'SPARE'];
        // const rows = data.bomRows.map((row, index) => [
        //   (index + 1).toString(),
        //   row.partNo || '',
        //   row.description || '',
        //   row.material || '',
        //   row.qty || '',
        //   row.spare || '#'
        // ]);

        // const tableOptions = {
        //   textSize: 12,
        //   borderWidth: 1,
        //   borderColor: rgb(0, 0, 0),
        //   font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        //   lineHeight: 1.2
        // };

        // await drawTable(pdfDoc, page, [headers, ...rows], 50, 700, tableOptions);

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        if (viewer) {
          viewer.openPdfAsync(url);
        }
        console.log('PDF annotated with new content.');
      } catch (error) {
        console.error('Error annotating PDF:', error);
      }
    },
    [pdfFile, viewer]
  );

  useEffect(() => {
    if (formData) {
      annotatePdf(formData);
    }
  }, [formData, annotatePdf]);

  return <div ref={containerRef} id={containerId} style={{ height: '850px', width: '100%' }} />;
};

PDFAnnotator.propTypes = {
  pdfFile: PropTypes.instanceOf(Uint8Array).isRequired,
  formData: PropTypes.object
};

PDFAnnotator.defaultProps = {
  formData: {}
};

export default PDFAnnotator;
