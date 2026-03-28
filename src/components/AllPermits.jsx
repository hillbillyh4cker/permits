import React, { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, MoreVertical, MapPin, User, Calendar, FileText, Image as ImageIcon, Eye, X, Film, Music } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils/utils';

export const AllPermits = ({ permits, onAddPermit, onEditPermit, onDeletePermit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'submissionDate', direction: 'desc' });
  const [selectedAttachment, setSelectedAttachment] = useState(null);

  const filteredPermits = permits.filter(permit => {
    const searchStr = `${permit.type} ${permit.city} ${permit.contractorName} ${permit.permitId}`.toLowerCase();
    return searchStr.includes(searchTerm.toLowerCase());
  });

  const sortedPermits = [...filteredPermits].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Expiring Soon': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Expired': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  const renderThumbnail = (attachment) => {
    if (!attachment) return (
      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-800 border border-slate-200 dark:border-white/5">
        <ImageIcon size={16} />
      </div>
    );

    const isImage = attachment.type.includes('image');
    
    return (
      <button 
        onClick={() => setSelectedAttachment(attachment)}
        className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all group/img"
      >
        {isImage ? (
          <img src={attachment.data} alt="Permit" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
            {attachment.type.includes('pdf') && <FileText size={16} />}
            {attachment.type.includes('video') && <Film size={16} />}
            {attachment.type.includes('audio') && <Music size={16} />}
          </div>
        )}
        <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
          <Eye size={12} className="text-white" />
        </div>
      </button>
    );
  };

  const renderLightboxContent = () => {
    if (!selectedAttachment) return null;
    const { type, data } = selectedAttachment;

    if (type.includes('image')) return <img src={data} alt="Permit" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />;
    if (type.includes('video')) return <video src={data} controls className="max-w-full max-h-full rounded-xl shadow-2xl" autoPlay />;
    if (type.includes('audio')) return <audio src={data} controls className="w-full max-w-lg" autoPlay />;
    if (type.includes('pdf')) return <iframe src={data} className="w-full h-full rounded-xl bg-white" title="PDF Document" />;

    return <div className="text-white">Unsupported file type</div>;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            All <span className="gradient-text">Permits</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Detailed view and management of your entire permit database.</p>
        </div>
        <Button onClick={onAddPermit} className="group gap-2 px-6 py-3 h-fit">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Add Permit
        </Button>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-card p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by type, city, contractor..." 
            className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-sm font-medium mr-2">{sortedPermits.length} permits found</span>
          <Button variant="secondary" size="sm" className="gap-2">
            <Filter size={16} />
            Filters
          </Button>
        </div>
      </div>

      <div className="glass-card overflow-hidden border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-white/10">
                <th className="px-6 py-5">Doc</th>
                <th 
                  className="px-6 py-5 cursor-pointer hover:text-white transition-colors"
                  onClick={() => requestSort('type')}
                >
                  <div className="flex items-center gap-2">
                    Permit & ID
                    <ArrowUpDown size={12} className={sortConfig.key === 'type' ? 'text-primary-400' : 'text-slate-600'} />
                  </div>
                </th>
                <th 
                  className="px-6 py-5 cursor-pointer hover:text-white transition-colors"
                  onClick={() => requestSort('city')}
                >
                   <div className="flex items-center gap-2">
                    Location
                    <ArrowUpDown size={12} className={sortConfig.key === 'city' ? 'text-primary-400' : 'text-slate-600'} />
                  </div>
                </th>
                <th 
                  className="px-6 py-5 cursor-pointer hover:text-white transition-colors"
                  onClick={() => requestSort('contractorName')}
                >
                   <div className="flex items-center gap-2">
                    Contractor
                    <ArrowUpDown size={12} className={sortConfig.key === 'contractorName' ? 'text-primary-400' : 'text-slate-600'} />
                  </div>
                </th>
                <th 
                  className="px-6 py-5 cursor-pointer hover:text-white transition-colors"
                  onClick={() => requestSort('expirationDate')}
                >
                   <div className="flex items-center gap-2">
                    Expires
                    <ArrowUpDown size={12} className={sortConfig.key === 'expirationDate' ? 'text-primary-400' : 'text-slate-600'} />
                  </div>
                </th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedPermits.map((permit) => (
                <tr key={permit.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-5">
                    {renderThumbnail(permit.permitAttachment || (permit.permitImage ? { data: permit.permitImage, type: 'image/jpeg', name: 'Legacy' } : null))}
                  </td>
                  <td className="px-6 py-5 font-bold">
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white text-sm tracking-tight">{permit.type}</span>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest mt-0.5">{permit.permitId || 'NO ID'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
                      <MapPin size={14} className="text-primary-600 dark:text-primary-500" />
                      {permit.city}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <div className="flex items-center gap-2 text-slate-300 font-medium font-serif italic">
                      {permit.contractorName || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <div className="flex items-center gap-2 text-slate-400 tabular-nums font-medium">
                      <Calendar size={14} />
                      {permit.expirationDate}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border",
                      getStatusColor(permit.status)
                    )}>
                      {permit.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" onClick={() => onEditPermit(permit)} className="h-8 px-3 text-xs">
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => onDeletePermit(permit.id)} className="h-8 px-3 text-xs">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sortedPermits.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white">No matches found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedAttachment && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedAttachment(null)}
        >
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl"></div>
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6">
            <div className="absolute top-0 right-0 flex items-center gap-4">
               <p className="text-white/60 text-sm font-medium hidden md:block">{selectedAttachment.name}</p>
              <button 
                onClick={() => setSelectedAttachment(null)}
                className="p-3 text-white hover:text-red-400 transition-all bg-white/5 hover:bg-white/10 rounded-full"
              >
                <X size={28} />
              </button>
            </div>
            <div className="w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {renderLightboxContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
