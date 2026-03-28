import { Plus, LayoutDashboard, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { MetricCard } from './ui/Card';
import { PermitList } from './PermitList';

export const Dashboard = ({ permits, onAddPermit, onEditPermit, onDeletePermit }) => {
  const stats = {
    total: permits.length,
    active: permits.filter(p => p.status === 'Active').length,
    expiring: permits.filter(p => p.status === 'Expiring Soon').length,
    pending: permits.filter(p => p.status === 'Pending Submission').length,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Permit <span className="gradient-text">Tracker</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Manage your contracting permits and renewals with precision.</p>
        </div>
        <Button onClick={onAddPermit} className="group gap-2 px-6 py-3 h-fit shadow-primary-500/30">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          New Permit
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Total Permits" 
          value={stats.total} 
          icon={FileText}
          subtext="Across all cities"
        />
        <MetricCard 
          label="Active Permits" 
          value={stats.active} 
          icon={CheckCircle2}
          subtext="Fully compliant"
          trend="up"
        />
        <MetricCard 
          label="Expiring Soon" 
          value={stats.expiring} 
          icon={Clock}
          subtext="Action required soon"
          trend="down"
        />
        <MetricCard 
          label="Pending Submission" 
          value={stats.pending} 
          icon={AlertCircle}
          subtext="Ready to file"
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
          <LayoutDashboard className="text-primary-600 dark:text-primary-400" size={20} />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Project Overview</h2>
        </div>
        
        <PermitList 
          permits={permits} 
          onEdit={onEditPermit} 
          onDelete={onDeletePermit} 
        />
      </div>
    </div>
  );
};
