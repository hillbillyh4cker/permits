import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { TrendingUp, Users, MapPin, CheckCircle } from 'lucide-react';

const COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

export const Stats = ({ permits }) => {
  const statusData = useMemo(() => {
    const counts = permits.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [permits]);

  const cityData = useMemo(() => {
    const counts = permits.reduce((acc, p) => {
      acc[p.city] = (acc[p.city] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [permits]);

  const timelineData = useMemo(() => {
    const monthly = permits.reduce((acc, p) => {
      const date = new Date(p.submissionDate);
      const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(monthly).map(([name, value]) => ({ name, value }));
  }, [permits]);

  const metrics = [
    { label: 'Avg Permits/City', value: (permits.length / (new Set(permits.map(p => p.city)).size || 1)).toFixed(1), icon: MapPin },
    { label: 'Total Contractors', value: new Set(permits.map(p => p.contractorName)).size, icon: Users },
    { label: 'Completion Rate', value: `${((permits.filter(p => p.status === 'Active').length / (permits.length || 1)) * 100).toFixed(0)}%`, icon: CheckCircle },
    { label: 'Monthly Growth', value: '+12%', icon: TrendingUp }, // Mock growth for now
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Stats & <span className="gradient-text">Analysis</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Deep dive into your permitting data and trends.</p>
      </header>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="glass-card p-6 flex items-center justify-between group hover:scale-[1.02] transition-transform duration-300">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{m.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{m.value}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
              <m.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Distribution */}
        <div className="glass-card p-8 min-h-[400px]">
          <h3 className="text-xl font-bold text-white mb-6">Permit Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Submissions by City */}
        <div className="glass-card p-8 min-h-[400px]">
          <h3 className="text-xl font-bold text-white mb-6">Top Cities by Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                 cursor={{fill: 'rgba(255,255,255,0.05)'}}
                 contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
              />
              <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Submission Timeline */}
        <div className="glass-card p-8 lg:col-span-2 min-h-[400px]">
          <h3 className="text-xl font-bold text-white mb-6">Submission Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
