import React from 'react';
import { cn } from '../../utils/utils';

export const Card = ({ className, children, title, description, icon: Icon, ...props }) => {
  return (
    <div className={cn('glass-card', className)} {...props}>
      {(title || Icon) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
                <Icon size={20} />
              </div>
            )}
            <div>
              {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-none">{title}</h3>}
              {description && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export const MetricCard = ({ label, value, subtext, icon: Icon, trend, className }) => {
  return (
    <div className={cn('glass-card flex items-start justify-between', className)}>
      <div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
        <h4 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</h4>
        {subtext && (
          <p className={cn("text-xs mt-2", trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-slate-500')}>
            {subtext}
          </p>
        )}
      </div>
      {Icon && (
        <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-400 border border-primary-500/20">
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};
