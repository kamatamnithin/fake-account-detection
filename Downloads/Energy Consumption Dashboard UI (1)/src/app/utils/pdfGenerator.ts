import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ReportData {
  title: string;
  date: string;
  summary: {
    totalConsumption: number;
    averageConsumption: number;
    peakConsumption: number;
    costEstimate: number;
    savingsPotential: number;
  };
  predictions?: any[];
  charts?: string[]; // Chart image URLs
}

export async function generatePDFReport(data: ReportData): Promise<void> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  pdf.setFillColor(59, 130, 246); // Blue
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('SmartEnergy', pageWidth / 2, 20, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.title, pageWidth / 2, 30, { align: 'center' });

  yPosition = 50;

  // Date
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(10);
  pdf.text(`Generated: ${data.date}`, 20, yPosition);
  
  yPosition += 15;

  // Summary Section
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Executive Summary', 20, yPosition);
  
  yPosition += 10;
  
  // Summary box
  pdf.setFillColor(245, 247, 250);
  pdf.roundedRect(15, yPosition, pageWidth - 30, 55, 3, 3, 'F');
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(30, 30, 30);
  
  yPosition += 8;
  
  const summaryItems = [
    { label: 'Total Consumption:', value: `${data.summary.totalConsumption.toFixed(2)} kWh` },
    { label: 'Average Consumption:', value: `${data.summary.averageConsumption.toFixed(2)} kWh` },
    { label: 'Peak Consumption:', value: `${data.summary.peakConsumption.toFixed(2)} kWh` },
    { label: 'Estimated Cost:', value: `$${data.summary.costEstimate.toFixed(2)}` },
    { label: 'Savings Potential:', value: `$${data.summary.savingsPotential.toFixed(2)}` },
  ];

  summaryItems.forEach((item, index) => {
    pdf.setFont('helvetica', 'bold');
    pdf.text(item.label, 20, yPosition + (index * 8));
    pdf.setFont('helvetica', 'normal');
    pdf.text(item.value, 90, yPosition + (index * 8));
  });

  yPosition += 55;

  // Predictions Section
  if (data.predictions && data.predictions.length > 0) {
    yPosition += 10;
    
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Energy Forecast', 20, yPosition);
    
    yPosition += 10;

    // Table headers
    pdf.setFillColor(59, 130, 246);
    pdf.rect(15, yPosition, pageWidth - 30, 10, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Date', 20, yPosition + 7);
    pdf.text('Predicted (kWh)', 70, yPosition + 7);
    pdf.text('Confidence', 130, yPosition + 7);

    yPosition += 10;

    // Table rows
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    
    data.predictions.slice(0, 10).forEach((pred, index) => {
      const rowColor = index % 2 === 0 ? [255, 255, 255] : [245, 247, 250];
      pdf.setFillColor(rowColor[0], rowColor[1], rowColor[2]);
      pdf.rect(15, yPosition, pageWidth - 30, 8, 'F');
      
      pdf.text(pred.date || `Day ${index + 1}`, 20, yPosition + 6);
      pdf.text(`${pred.value.toFixed(2)}`, 70, yPosition + 6);
      pdf.text(`${(pred.confidence || 95).toFixed(1)}%`, 130, yPosition + 6);
      
      yPosition += 8;

      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }
    });
  }

  // Footer
  const addFooter = (pageNum: number) => {
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      `Page ${pageNum} | SmartEnergy Report | Confidential`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  };

  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    addFooter(i);
  }

  // Save the PDF
  pdf.save(`SmartEnergy_Report_${new Date().toISOString().split('T')[0]}.pdf`);
}

export async function captureChartAsImage(chartId: string): Promise<string> {
  const chartElement = document.getElementById(chartId);
  if (!chartElement) {
    throw new Error(`Chart element with id ${chartId} not found`);
  }

  const canvas = await html2canvas(chartElement, {
    backgroundColor: '#ffffff',
    scale: 2,
  });

  return canvas.toDataURL('image/png');
}

export function exportToCSV(data: any[], filename: string): void {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  // Get headers
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(data: any, filename: string): void {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
