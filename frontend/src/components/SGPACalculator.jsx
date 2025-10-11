import { useState, useEffect } from 'react';

export default function SGPACalculator({ results }) {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [sgpa, setSGPA] = useState(null);

  // Grade points mapping (you can adjust based on your university rules)
  const getGradePoint = (marks) => {
    if (marks >= 90) return 10;
    if (marks >= 80) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 40) return 4;
    return 0;
  };

  useEffect(() => {
    if (!year || !semester) {
      setSGPA(null);
      return;
    }

    // Filter results for selected year + semester
    const semResults = results.filter(r => r.year === parseInt(year) && r.semester === parseInt(semester));
    if (!semResults.length) {
      setSGPA(null);
      return;
    }

    // Assuming equal credits per subject
    const totalPoints = semResults.reduce((acc, r) => acc + getGradePoint(r.marks_obtained), 0);
    const sgpaValue = (totalPoints / semResults.length).toFixed(2);
    setSGPA(sgpaValue);
  }, [year, semester, results]);

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">SGPA Calculator</h2>

      <div className="flex gap-3 mb-4">
        <select value={year} onChange={e => setYear(e.target.value)} className="border p-2 rounded">
          <option value="">Select Year</option>
          {[1,2,3,4].map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={semester} onChange={e => setSemester(e.target.value)} className="border p-2 rounded">
          <option value="">Select Semester</option>
          {[1,2].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {sgpa !== null ? (
        <div className="text-lg font-bold">SGPA: {sgpa}</div>
      ) : (
        <div className="text-gray-500">No results available for this semester</div>
      )}
    </div>
  );
}
