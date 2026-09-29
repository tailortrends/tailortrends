import React from 'react';
import { ArrowLeft, Users, Mail, Calendar, Download } from 'lucide-react';
import { usePublishing } from '../../context/PublishingContext.tsx';

interface AdminSubscribersProps {
  onNavigate: (route: string) => void;
}

export const AdminSubscribers: React.FC<AdminSubscribersProps> = ({ onNavigate }) => {
  const { subscribers } = usePublishing();

  const exportCsv = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      ['Email,Signup Date,Source Page,Status', ...subscribers.map(s => `${s.email},${s.signupDate},${s.sourcePage},${s.status}`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tailor_trends_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-stone-100/60 dark:bg-stone-950 py-8 text-stone-900 dark:text-stone-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('admin')}
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                AUDIENCE & DISTRIBUTION
              </span>
              <h1 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-50">
                Tailor Trends Weekly Subscribers
              </h1>
            </div>
          </div>

          <button
            onClick={exportCsv}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs font-mono font-bold flex items-center space-x-1.5 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="my-6 p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-stone-500 uppercase block">Active Subscribers</span>
            <span className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100">
              {subscribers.length} Readers
            </span>
          </div>
          <span className="text-xs font-mono text-stone-500">
            Delivered every Thursday via Tailor Trends Weekly
          </span>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-stone-50 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-800 text-[11px] font-mono text-stone-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Subscriber Email</th>
                <th className="py-3.5 px-4 font-semibold">Signup Date</th>
                <th className="py-3.5 px-4 font-semibold">Source Page</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {subscribers.map(sub => (
                <tr key={sub.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50">
                  <td className="py-3.5 px-4 font-mono font-medium text-stone-900 dark:text-stone-100">
                    {sub.email}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-500">
                    {sub.signupDate}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-500">
                    {sub.sourcePage}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
