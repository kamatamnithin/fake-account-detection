import { FileDown, FileSpreadsheet, FileJson, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { generatePDFReport, exportToCSV, exportToJSON } from '../utils/pdfGenerator';
import { toast } from 'sonner';

interface ExportButtonsProps {
  data?: any[];
  reportData?: any;
  fileName?: string;
}

export function ExportButtons({ data, reportData, fileName = 'SmartEnergy_Export' }: ExportButtonsProps) {
  const handlePDFExport = async () => {
    try {
      toast.loading('Generating PDF report...');
      
      const pdfData = reportData || {
        title: 'Energy Consumption Report',
        date: new Date().toLocaleDateString(),
        summary: {
          totalConsumption: data?.reduce((sum, d) => sum + (d.consumption || 0), 0) || 0,
          averageConsumption: data?.length ? data.reduce((sum, d) => sum + (d.consumption || 0), 0) / data.length : 0,
          peakConsumption: Math.max(...(data?.map(d => d.consumption || 0) || [0])),
          costEstimate: (data?.reduce((sum, d) => sum + (d.consumption || 0), 0) || 0) * 0.12,
          savingsPotential: ((data?.reduce((sum, d) => sum + (d.consumption || 0), 0) || 0) * 0.12) * 0.15,
        },
        predictions: data || [],
      };

      await generatePDFReport(pdfData);
      toast.success('PDF report generated successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF report');
    }
  };

  const handleCSVExport = () => {
    try {
      if (!data || data.length === 0) {
        toast.error('No data available to export');
        return;
      }
      exportToCSV(data, fileName);
      toast.success('CSV file exported successfully!');
    } catch (error) {
      console.error('CSV export error:', error);
      toast.error('Failed to export CSV file');
    }
  };

  const handleJSONExport = () => {
    try {
      const exportData = data || reportData || {};
      if (Object.keys(exportData).length === 0) {
        toast.error('No data available to export');
        return;
      }
      exportToJSON(exportData, fileName);
      toast.success('JSON file exported successfully!');
    } catch (error) {
      console.error('JSON export error:', error);
      toast.error('Failed to export JSON file');
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePDFExport}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
      >
        <FileText className="size-4" />
        Export PDF
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCSVExport}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
      >
        <FileSpreadsheet className="size-4" />
        Export CSV
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleJSONExport}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
      >
        <FileJson className="size-4" />
        Export JSON
      </motion.button>
    </div>
  );
}
