import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { AllPermits } from './components/AllPermits';
import { CityPermits } from './components/CityPermits';
import { Alerts } from './components/Alerts';
import { PermitForm } from './components/PermitForm';
import { LandingPage } from './components/LandingPage';
import { Stats } from './components/Stats';
import { ReportBuilder } from './components/ReportBuilder';
import { calculateStatus, isWithinUrgentThreshold } from './utils/permitUtils';
import { Shield, Settings, HelpCircle, Bell, LayoutDashboard, FileText, AlertCircle, Sun, Moon, BarChart2, ClipboardList } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState('landing');
  const [permits, setPermits] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPermit, setEditingPermit] = useState(null);
  const [isCityFormModal, setIsCityFormModal] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load permits from API on mount
  useEffect(() => {
    const loadPermits = async () => {
      try {
        const response = await fetch('/api/permits');
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Server returned invalid data format');
        }

        // If API is empty, check for legacy localStorage data to migrate
        if (data.length === 0) {
          const saved = localStorage.getItem('permits');
          if (saved) {
            const legacyData = JSON.parse(saved);
            if (Array.isArray(legacyData) && legacyData.length > 0) {
              console.log('Migrating legacy localStorage data to backend...');
              await saveToBackend(legacyData);
              setPermits(legacyData);
              // Optionally clear localStorage after successful migration
              // localStorage.removeItem('permits');
            }
          }
        } else {
          setPermits(data);
        }
      } catch (err) {
        console.error('Failed to load permits:', err);
        setError('Failed to connect to backend server. Is it running?');
      } finally {
        setIsLoading(false);
      }
    };

    loadPermits();
  }, []);

  const saveToBackend = async (data) => {
    try {
      await fetch('/api/permits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Failed to save to backend:', err);
      setError('Connection lost! Your changes might not have been saved to disk.');
    }
  };

  useEffect(() => {
    // Clear error after 5 seconds
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (isLoading) return;

    // Recalculate statuses and normalize
    const updatedPermits = permits.map(p => ({
      ...p,
      status: calculateStatus(p.submissionDate, p.expirationDate)
    }));
    
    // Crucial: Only sync if internal state changed to avoid infinite cycles
    // or if this is the first real load after migration/fetch
    const hasChanges = JSON.stringify(updatedPermits) !== JSON.stringify(permits);
    
    if (hasChanges) {
      setPermits(updatedPermits);
      saveToBackend(updatedPermits);
    }
  }, [permits, isLoading]);

  const handleAddPermit = (initialCity = '') => {
    setIsCityFormModal(initialCity !== '');
    setEditingPermit({
      type: '',
      city: initialCity,
      permitId: '',
      contractorName: '',
      contractorPhone: '',
      contractorEmail: '',
      buildingDept: '',
      buildingDeptEmail: '',
      buildingDeptPhone: '',
      publicWorks: '',
      businessLicense: '',
      isCityForm: initialCity !== '',
      submissionDate: new Date().toISOString().split('T')[0],
      expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    });
    setIsFormOpen(true);
  };

  const handleEditPermit = (permit) => {
    setIsCityFormModal(!!permit.isCityForm);
    setEditingPermit(permit);
    setIsFormOpen(true);
  };

  const handleDeletePermit = (id) => {
    if (window.confirm('Are you sure you want to delete this permit?')) {
      setPermits(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSavePermit = (formData) => {
    if (formData.id) {
      setPermits(prev => prev.map(p => p.id === formData.id ? { ...formData, id: p.id } : p));
    } else {
      setPermits(prev => [...prev, { ...formData, id: Date.now().toString() }]);
    }
    setIsFormOpen(false);
    setEditingPermit(null);
  };

  const alertCount = permits.filter(p => 
    isWithinUrgentThreshold(p.submissionDate) || isWithinUrgentThreshold(p.expirationDate)
  ).length;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            permits={permits} 
            onAddPermit={handleAddPermit}
            onEditPermit={handleEditPermit}
            onDeletePermit={handleDeletePermit}
          />
        );
      case 'permits':
        return (
          <AllPermits 
            permits={permits}
            onAddPermit={handleAddPermit}
            onEditPermit={handleEditPermit}
            onDeletePermit={handleDeletePermit}
          />
        );
      case 'city-permits':
        return (
          <CityPermits 
            permits={permits}
            onAddPermit={handleAddPermit}
            onEditPermit={handleEditPermit}
            onDeletePermit={handleDeletePermit}
          />
        );
      case 'alerts':
        return (
          <Alerts 
            permits={permits} 
            onEditPermit={handleEditPermit}
          />
        );
      case 'stats':
        return <Stats permits={permits} />;
      case 'reports':
        return <ReportBuilder permits={permits} />;
      case 'landing':
        return <LandingPage onEnter={() => setCurrentView('dashboard')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Sidebar - Hidden on Landing Page */}
      {currentView !== 'landing' && (
        <aside className="w-20 lg:w-64 border-r border-[var(--border)] flex flex-col items-center lg:items-stretch py-8 glass overflow-hidden transition-all duration-300 animate-in slide-in-from-left-4 duration-500">
          <div className="px-6 mb-12 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20 shrink-0">
              <Shield className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 dark:from-white to-slate-500 dark:to-slate-400 hidden lg:block">PermitPro</span>
          </div>

          {error && (
            <div className="mx-4 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-4 duration-300">
              <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
              <p className="text-[10px] text-red-100 font-medium leading-tight">{error}</p>
            </div>
          )}

          <nav className="flex-1 px-4 space-y-2">
            <NavLink 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={currentView === 'dashboard'} 
              onClick={() => setCurrentView('dashboard')}
            />
            <NavLink 
              icon={FileText} 
              label="All Permits" 
              active={currentView === 'permits'} 
              onClick={() => setCurrentView('permits')}
            />
            <button 
              onClick={() => setCurrentView('city-permits')}
              className={`w-full flex items-center gap-3 px-8 py-2 rounded-xl transition-all duration-200 group ${currentView === 'city-permits' ? 'text-primary-400 font-bold' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${currentView === 'city-permits' ? 'bg-primary-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]' : 'bg-slate-600 opacity-40 group-hover:opacity-100'}`} />
              <span className="text-sm font-medium hidden lg:block">City Forms</span>
            </button>
            <NavLink 
              icon={Bell} 
              label="Alerts" 
              badge={alertCount > 0 ? alertCount.toString() : null} 
              active={currentView === 'alerts'}
              onClick={() => setCurrentView('alerts')}
            />
            <NavLink 
              icon={BarChart2} 
              label="Stats & Analysis" 
              active={currentView === 'stats'} 
              onClick={() => setCurrentView('stats')}
            />
            <NavLink 
              icon={ClipboardList} 
              label="Report Builder" 
              active={currentView === 'reports'} 
              onClick={() => setCurrentView('reports')}
            />
            <button 
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-white/5 hover:text-slate-200 rounded-xl transition-all"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span className="font-medium hidden lg:block">Theme</span>
            </button>
            <NavLink icon={Settings} label="Settings" />
          </nav>

          <div className="px-4 mt-auto space-y-2">
            {isLoading && (
               <div className="px-4 py-2 flex items-center gap-3 text-primary-400">
                 <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                 <span className="text-xs font-medium">Syncing...</span>
               </div>
            )}
            <button 
              onClick={() => {
                if (window.confirm('This will wipe ALL permit data from the server. Are you sure?')) {
                  setPermits([]);
                  localStorage.clear();
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
            >
              <AlertCircle size={20} />
              <span className="text-sm font-medium hidden lg:block">Clear All Data</span>
            </button>
            <NavLink icon={HelpCircle} label="Help Center" />
            <div className="mt-8 p-4 glass-card bg-primary-500/5 border-primary-500/20 hidden lg:block">
              <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Storage</p>
              <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 w-1/4 rounded-full"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">Local Storage (Active)</p>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto ${currentView !== 'landing' ? 'px-6 py-12 lg:px-12' : ''}`}>
        <div className={currentView !== 'landing' ? "max-w-7xl mx-auto" : ""}>
          {renderView()}
        </div>
      </main>

      {/* Form Modal */}
      {isFormOpen && (
        <PermitForm 
          permit={editingPermit} 
          isCityForm={isCityFormModal}
          contractors={Array.from(new Map(permits.map(p => [p.contractorName, { 
            name: p.contractorName, 
            phone: p.contractorPhone, 
            email: p.contractorEmail 
          }])).values()).filter(c => c.name)}
          onSave={handleSavePermit} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}

const NavLink = ({ icon: Icon, label, active, badge, onClick }) => ( // eslint-disable-line no-unused-vars
  <button 
    onClick={(e) => {
      e.preventDefault();
      onClick?.();
    }}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold' : 'text-slate-600 dark:text-slate-500 hover:bg-slate-200/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200'}`}
  >
    <Icon size={20} className={active ? 'text-primary-400' : 'group-hover:text-primary-300'} />
    <span className="font-medium hidden lg:block">{label}</span>
    {badge && <span className="ml-auto bg-primary-600 text-white text-[10px] px-2 py-0.5 rounded-full hidden lg:block">{badge}</span>}
  </button>
);

export default App;
