import React, { useState } from 'react';
import { Calendar, FileText, MapPin, MoreVertical, Clock, AlertCircle, CheckCircle2, User, Phone, Mail, ChevronRight, ChevronDown, Image as ImageIcon, Eye, Maximize2, X, Film, Music, Download } from 'lucide-react';
import { Button } from './ui/Button';
import { cn, downloadFile } from '../utils/utils';

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Expiring Soon': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Pending Submission': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Expired': 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const icons = {
    'Active': <CheckCircle2 size={12} />,
    'Expiring Soon': <Clock size={12} />,
    'Pending Submission': <FileText size={12} />,
    'Expired': <AlertCircle size={12} />,
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 w-fit", styles[status])}>
      {icons[status]}
      {status}
    </span>
  );
};

const ContractorSection = ({ contractor, permits, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const count = permits.length;

  const renderThumbnail = (attachment) => {
    if (!attachment) return (
      <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-800 border border-white/5">
        <ImageIcon size={18} />
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
          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-primary-400">
            {attachment.type.includes('pdf') && <FileText size={18} />}
            {attachment.type.includes('video') && <Film size={18} />}
            {attachment.type.includes('audio') && <Music size={18} />}
          </div>
        )}
        <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
          <Eye size={14} className="text-white" />
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
    <div className="space-y-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 glass-card hover:bg-white/10 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
            <User size={20} />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{contractor || 'Unassigned Contractor'}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span className="flex items-center gap-1 font-medium">
                <FileText size={12} className="text-primary-500" />
                {count} {count === 1 ? 'Permit' : 'Permits'}
              </span>
              {permits[0]?.contractorPhone && (
                <span className="flex items-center gap-1 opacity-60">
                  <Phone size={12} />
                  {permits[0].contractorPhone}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={cn("text-slate-500 transition-transform duration-300", isOpen ? "rotate-180" : "")}>
          <ChevronDown size={20} />
        </div>
      </button>

      {isOpen && (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Doc</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-left">Permit Details</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Dates</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {permits.map(permit => (
                  <tr key={permit.id} className="group hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    {renderThumbnail(permit.permitAttachment || (permit.permitImage ? { data: permit.permitImage, type: 'image/jpeg', name: 'Legacy Image' } : null))}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white text-sm tracking-tight">{permit.type}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-tighter">{permit.permitId || 'NO ID'}</span>
                        {permit.notes && (
                          <div className="group/note relative">
                            <AlertCircle size={10} className="text-primary-400 opacity-50 cursor-help" />
                            <div className="absolute left-0 top-full mt-2 w-48 p-2 rounded-lg bg-slate-900 border border-white/10 text-[10px] text-slate-300 opacity-0 group-hover/note:opacity-100 transition-opacity z-20 pointer-events-none shadow-xl backdrop-blur-md whitespace-pre-wrap">
                              {permit.notes}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs group/loc relative">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                        <MapPin size={12} className="text-primary-600 dark:text-primary-400" />
                        {permit.city}
                      </div>
                      {(permit.buildingDept || permit.businessLicense) && (
                        <div className="flex flex-col gap-0.5 text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter ml-4">
                          {permit.buildingDept && <span className="truncate max-w-[120px]">{permit.buildingDept}</span>}
                          {permit.businessLicense && <span className="text-primary-600 dark:text-primary-500/80">LIC: {permit.businessLicense}</span>}
                        </div>
                      )}
                    </div>
                    {/* Tooltip for full city details */}
                    {(permit.buildingDept || permit.buildingDeptEmail || permit.publicWorks) && (
                      <div className="absolute left-6 top-full mt-1 w-56 p-3 rounded-xl bg-slate-900 border border-white/10 opacity-0 group-hover/loc:opacity-100 transition-opacity z-20 pointer-events-none shadow-2xl backdrop-blur-md">
                        <p className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-2">City Infrastructure</p>
                        <div className="space-y-2">
                          {permit.buildingDept && (
                            <div>
                              <p className="text-slate-500 text-[9px] uppercase font-bold">Building Dept</p>
                              <p className="text-white text-[10px]">{permit.buildingDept}</p>
                              {permit.buildingDeptEmail && <p className="text-primary-300 text-[10px] mt-0.5">{permit.buildingDeptEmail}</p>}
                            </div>
                          )}
                          {permit.publicWorks && (
                            <div>
                              <p className="text-slate-500 text-[9px] uppercase font-bold">Public Works</p>
                              <p className="text-white text-[10px]">{permit.publicWorks}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[10px] text-slate-400 tabular-nums">
                    <div className="flex flex-col gap-1">
                      <span>Due: {permit.submissionDate}</span>
                      <span>Exp: {permit.expirationDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={permit.status} />
                  </td>
                  <td className="px-6 py-4 text-right rounded-r-xl">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {(permit.permitAttachment || permit.permitImage) && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            const att = permit.permitAttachment || { data: permit.permitImage, name: 'Permit Image' };
                            downloadFile(att.data, att.name);
                          }} 
                          className="h-8 w-8 p-0 hover:bg-white/10"
                          title="Download"
                        >
                          <Download size={14} />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => onEdit(permit)} className="h-8 text-[10px] hover:bg-white/10">
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => onDelete(permit.id)} className="h-8 text-[10px]">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
                onClick={() => downloadFile(selectedAttachment.data, selectedAttachment.name)}
                className="p-3 text-white hover:text-primary-400 transition-all bg-white/5 hover:bg-white/10 rounded-full"
                title="Download"
              >
                <Download size={24} />
              </button>
              <button 
                onClick={() => setSelectedAttachment(null)}
                className="p-3 text-white hover:text-red-400 transition-all bg-white/5 hover:bg-white/10 rounded-full"
                title="Close"
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
export const PermitList = ({ permits, onEdit, onDelete }) => {
  if (permits.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4">
          <FileText className="text-slate-600" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-white">No permits found</h3>
        <p className="text-slate-400 mt-2 max-w-xs">Start by adding your first permit to track its submission and renewal status.</p>
      </div>
    );
  }

  // Group permits by contractor
  const groupedPermits = permits.reduce((acc, permit) => {
    const contractor = permit.contractorName || 'Unassigned';
    if (!acc[contractor]) acc[contractor] = [];
    acc[contractor].push(permit);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groupedPermits).map(([contractor, permits]) => (
        <ContractorSection 
          key={contractor}
          contractor={contractor}
          permits={permits}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
