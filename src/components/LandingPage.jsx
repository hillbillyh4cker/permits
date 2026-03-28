import React from 'react';
import { 
  Shield, CheckCircle, Clock, Zap, ArrowRight, FileText, 
  Bell, LayoutDashboard, Globe, Users, Smartphone, BarChart, Rocket 
} from 'lucide-react';

export const LandingPage = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-[var(--background)] overflow-x-hidden selection:bg-primary-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="mesh-gradient absolute inset-0 opacity-30" />
      </div>

      {/* Navigation Layer (Visual Only) */}
      <nav className="relative z-50 px-6 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-110">
            <Shield className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold font-display tracking-tight hover:text-primary-500 transition-colors">PermitPro</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[var(--muted-foreground)]">
          <a href="#features" className="hover:text-primary-500 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary-500 transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-primary-500 transition-colors">Pricing</a>
          <button 
            onClick={onEnter}
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:border-primary-500/50"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 animate-in slide-in-from-left-4 duration-500">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-[0.2em]">v2.0 is now live</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight animate-in slide-in-from-bottom-4 duration-700">
              Permit management <br />
              <span className="gradient-text italic">reimagined.</span>
            </h1>
            
            <p className="max-w-xl text-xl text-[var(--muted-foreground)] mb-12 leading-relaxed animate-in slide-in-from-bottom-6 duration-1000">
              The professional edge for contractors. Track applications, automate renewals, and maintain compliance across every jurisdiction with one seamless interface.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 animate-in fade-in duration-1000 delay-500">
              <button 
                onClick={onEnter}
                className="w-full sm:w-auto px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl shadow-primary-500/40 hover:scale-105 active:scale-95"
              >
                Launch Dashboard
                <ArrowRight size={22} />
              </button>
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[var(--background)] bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-[var(--background)] bg-primary-500 flex items-center justify-center text-[10px] font-bold text-white">
                  5k+
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-in zoom-in-95 duration-1000">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500/20 to-purple-500/20 blur-3xl rounded-[3rem] -z-10 animate-pulse" />
            <div className="glass-card p-2 rounded-[2.5rem] border-white/20 shadow-2xl">
              <div className="rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="mx-auto text-[10px] font-mono opacity-40 uppercase tracking-widest text-white">PermitPro Secure Terminal</div>
                </div>
                <div className="p-8 aspect-video flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
                  <div className="text-center space-y-6">
                    <div className="inline-block p-4 rounded-3xl bg-primary-500/10 border border-primary-500/20 animate-bounce">
                      <LayoutDashboard className="text-primary-500" size={48} />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-48 bg-white/10 rounded-full mx-auto" />
                      <div className="h-4 w-32 bg-white/5 rounded-full mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Mini Cards */}
            <div className="absolute top-10 -right-8 glass-card py-3 px-5 flex items-center gap-4 animate-bounce duration-[3000ms]">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="text-emerald-500" size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-emerald-500 uppercase">Approved</p>
                <p className="text-xs font-semibold">City Hall Permit #892</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-8 glass-card py-3 px-5 flex items-center gap-4 animate-bounce duration-[4000ms] delay-700">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Clock className="text-amber-500" size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-amber-500 uppercase">Renewing</p>
                <p className="text-xs font-semibold">48h until expiration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-display text-xl brightness-200">
            <Globe size={24} /> CITYFLOW
          </div>
          <div className="flex items-center gap-2 font-display text-xl brightness-200">
            <Zap size={24} /> VOLTCON
          </div>
          <div className="flex items-center gap-2 font-display text-xl brightness-200">
            <Shield size={24} /> SECUREBUILD
          </div>
          <div className="flex items-center gap-2 font-display text-xl brightness-200">
            <Users size={24} /> ALLIANCE
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">Everything you need to <br /> scale your operations.</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg">
              Built by contractors for contractors. We've solved the complexity so you can focus on building.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EnhancedFeatureCard 
              icon={BarChart}
              title="Real-time Analytics"
              description="Monitor your entire permit pipeline with visual health indicators and bottleneck detection."
              color="text-blue-500"
              delay="100ms"
            />
            <EnhancedFeatureCard 
              icon={Smartphone}
              title="Mobile First"
              description="Access documents, upload photos, and check status directly from the jobsite."
              color="text-purple-500"
              delay="200ms"
            />
            <EnhancedFeatureCard 
              icon={Bell}
              title="Predictive Alerts"
              description="Our AI identifies potential delays before they happen, keeping you proactive."
              color="text-amber-500"
              delay="300ms"
            />
            <EnhancedFeatureCard 
              icon={FileText}
              title="Smart Forms"
              description="Auto-populate city-specific applications with archived project data."
              color="text-emerald-500"
              delay="400ms"
            />
            <EnhancedFeatureCard 
              icon={Rocket}
              title="Fast Lane Submission"
              description="Direct API integrations with major municipalities for instant filing."
              color="text-rose-500"
              delay="500ms"
            />
            <EnhancedFeatureCard 
              icon={Shield}
              title="Enterprise Security"
              description="Bank-grade encryption for all your sensitive project documents."
              color="text-primary-500"
              delay="600ms"
            />
          </div>
        </div>
      </section>

      {/* Trust Quote / Stats */}
      <section className="py-24 bg-primary-600/[0.03] border-y border-primary-500/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="grid md:grid-cols-3 gap-12 mb-20 text-center">
            <div>
              <p className="text-5xl font-black gradient-text mb-2">98%</p>
              <p className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-widest">Compliance Rate</p>
            </div>
            <div>
              <p className="text-5xl font-black gradient-text mb-2">4.5h</p>
              <p className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-widest">Weekly Time Saved</p>
            </div>
            <div>
              <p className="text-5xl font-black gradient-text mb-2">120+</p>
              <p className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-widest">Cities Integrated</p>
            </div>
          </div>
          
          <div className="relative glass-card p-12 lg:p-16">
            <div className="absolute top-6 left-10 text-8xl font-serif text-primary-500/10 opacity-50">"</div>
            <blockquote className="text-3xl font-bold leading-tight mb-10 relative z-10">
              PermitPro shifted our focus from administrative nightmare to actual delivery. It's the infrastructure for our infrastructure.
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-primary-500 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="testimonial" />
              </div>
              <div className="text-left">
                <p className="font-bold text-xl">Marcus Holloway</p>
                <p className="text-sm text-primary-500 font-semibold">VP Operations, DedSec Construction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[var(--background)] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <Shield className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold font-display">PermitPro</span>
              </div>
              <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                Building the digital future of the construction industry. One permit at a time.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest">Product</h4>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Dashboard</a></li>
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Alerts</a></li>
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Analytics</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest">Company</h4>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li><a href="#" className="hover:text-primary-500 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Press</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-widest">Legal</h4>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-primary-500 transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[var(--muted-foreground)] text-xs">
            <p>© 2026 PermitPro Industries Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const EnhancedFeatureCard = ({ icon: Icon, title, description, color, delay }) => (
  <div 
    className="glass-card flex flex-col items-start gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 group"
    style={{ animationDelay: delay }}
  >
    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 ${color}`}>
      <Icon size={28} />
    </div>
    <div className="space-y-3">
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">
        {description}
      </p>
    </div>
    <div className="mt-auto pt-6 w-full">
      <div className="h-1 w-0 bg-primary-500 transition-all duration-500 group-hover:w-full rounded-full" />
    </div>
  </div>
);

