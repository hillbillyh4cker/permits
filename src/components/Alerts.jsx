import React from 'react';
import { AlertCircle, Clock, Bell, ArrowRight, ShieldAlert, CheckCircle2, User } from 'lucide-react';
import { Button } from './ui/Button';
import { isWithinUrgentThreshold } from '../utils/permitUtils';
import { cn } from '../utils/utils';

export const Alerts = ({ permits, onEditPermit }) => {
  const urgentPermits = permits.filter(p => 
    isWithinUrgentThreshold(p.submissionDate) || isWithinUrgentThreshold(p.expirationDate)
  ).sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Critical <span className="text-red-500">Alerts</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">High-priority items requiring immediate action within 48 hours.</p>
        </div>
        <div className="flex items-center gap-3 glass-card px-6 py-3 border-red-500/20 bg-red-500/5">
          <ShieldAlert className="text-red-500" size={24} />
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{urgentPermits.length}</span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">Active Alerts</span>
        </div>
      </header>

      {urgentPermits.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="text-emerald-500" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">All Clear!</h3>
          <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-sm mx-auto text-lg leading-relaxed">
            No permits are due or expiring within the next 48 hours. Your compliance is on track.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {urgentPermits.map((permit) => {
            const isSubmissionUrgent = isWithinUrgentThreshold(permit.submissionDate);
            const isExpirationUrgent = isWithinUrgentThreshold(permit.expirationDate);
            
            return (
              <div key={permit.id} className="glass-card border-red-500/10 hover:border-red-500/30 transition-all group overflow-hidden">
                <div className="relative p-6">
                  {/* Urgency Indicator */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl -z-10 rounded-full"></div>
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <AlertCircle size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{permit.type}</h3>
                        <p className="text-slate-600 dark:text-slate-500 text-sm font-medium">{permit.city} • {permit.permitId || 'No ID'}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-500/30">
                      Urgently Due
                    </span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className={cn(
                      "flex items-center justify-between p-3 rounded-xl border transition-colors",
                      isSubmissionUrgent ? "bg-red-500/5 border-red-500/20" : "bg-white/5 border-white/10"
                    )}>
                      <div className="flex items-center gap-3">
                        <Clock className={isSubmissionUrgent ? "text-red-600 dark:text-red-400" : "text-slate-500"} size={18} />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Submission Deadline</span>
                      </div>
                      <span className={cn("text-sm font-bold tabular-nums", isSubmissionUrgent ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white")}>
                        {permit.submissionDate}
                      </span>
                    </div>

                    <div className={cn(
                      "flex items-center justify-between p-3 rounded-xl border transition-colors",
                      isExpirationUrgent ? "bg-red-500/5 border-red-500/20" : "bg-white/5 border-white/10"
                    )}>
                      <div className="flex items-center gap-3">
                        <Bell className={isExpirationUrgent ? "text-red-400" : "text-slate-500"} size={18} />
                        <span className="text-sm font-medium text-slate-300">Expiration Date</span>
                      </div>
                      <span className={cn("text-sm font-bold tabular-nums", isExpirationUrgent ? "text-red-400" : "text-white")}>
                        {permit.expirationDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <User size={14} />
                      <span className="font-medium underline decoration-primary-500/30 underline-offset-4">{permit.contractorName}</span>
                    </div>
                    <Button variant="danger" size="sm" onClick={() => onEditPermit(permit)} className="gap-2 px-5">
                      Fix Now
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
