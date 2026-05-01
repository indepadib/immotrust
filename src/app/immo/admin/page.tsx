'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { ProjectService } from '@/lib/immo/ProjectService';
import { DeveloperService } from '@/lib/immo/DeveloperService';
import { 
  Plus, Search, Edit2, Trash2, 
  ExternalLink, LayoutDashboard, 
  Settings, LogOut, CheckCircle2, 
  AlertCircle, Image as ImageIcon,
  Save, X, Building2, MapPin
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// --- AUTH GATE ---
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'AvisPromoteur2026';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [view, setView] = useState<'projects' | 'developers' | 'reviews'>('projects');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    const data = await ProjectService.getAllProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('projects')
      .upsert(editingItem);
    
    if (error) {
      alert('Erreur lors de la sauvegarde: ' + error.message);
    } else {
      setIsEditing(false);
      setEditingItem(null);
      fetchProjects();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Settings className="w-8 h-8 text-primary animate-spin-slow" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Espace Admin</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avis Promoteur Maroc • Accès Restreint</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Clé d'accès</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-mono"
                placeholder="••••••••••••"
              />
            </div>
            {error && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}
            <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
              Déverrouiller
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-outfit">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-80 bg-white/5 border-r border-white/10 p-10 flex flex-col justify-between z-50">
        <div className="space-y-12">
          <div className="space-y-1">
            <h2 className="text-2xl font-black italic text-primary uppercase leading-none">Admin<br /><span className="text-white">Console</span></h2>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">v1.0.2 • Live Database</p>
          </div>

          <nav className="space-y-4">
            {[
              { id: 'projects', label: 'Projets Immobiliers', icon: Building2 },
              { id: 'developers', label: 'Promoteurs', icon: ShieldCheck },
              { id: 'reviews', label: 'Modération Avis', icon: CheckCircle2 }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setView(item.id as any)}
                className={clsx(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest",
                  view === item.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-4 text-slate-500 hover:text-rose-500 transition-all font-black text-[10px] uppercase tracking-widest">
          <LogOut className="w-4 h-4" /> Déconnexion
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="pl-80 p-16">
        <header className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <h1 className="text-6xl font-black uppercase italic tracking-tighter">
              Gestion des <span className="text-primary">{view}</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium">Contrôle direct du contenu de la plateforme.</p>
          </div>
          <button 
            onClick={() => { setIsEditing(true); setEditingItem({}); }}
            className="flex items-center gap-3 bg-white text-secondary px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl shadow-white/5"
          >
            <Plus className="w-4 h-4" /> Nouveau {view === 'projects' ? 'Projet' : 'Élément'}
          </button>
        </header>

        {/* Dynamic Table / Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="py-20 text-center animate-pulse text-slate-500 font-black uppercase tracking-widest italic">Synchronisation base de données...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="group bg-white/5 border border-white/5 rounded-3xl p-8 flex items-center justify-between hover:bg-white/10 hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-8">
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-900">
                      {p.images?.[0] && <Image src={p.images[0]} alt={p.name} fill className="object-cover" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase italic tracking-tight">{p.name}</h3>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.city}</span>
                        <span className="text-primary">•</span>
                        <span>{p.standing}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => { setEditingItem(p); setIsEditing(true); }}
                      className="p-4 bg-white/5 rounded-xl hover:text-primary transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-4 bg-white/5 rounded-xl hover:text-rose-500 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Slide-over Edit Panel */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditing(false)} />
          <div className="relative w-[600px] bg-slate-900 border-l border-white/10 h-full p-12 overflow-y-auto animate-in slide-in-from-right duration-500">
            <header className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Édition <span className="text-primary">Projet</span></h2>
              <button onClick={() => setIsEditing(false)} className="p-4 bg-white/5 rounded-full hover:bg-rose-500/20 hover:text-rose-500 transition-all">
                <X className="w-5 h-5" />
              </button>
            </header>

            <form onSubmit={handleSaveProject} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nom du Projet</label>
                  <input 
                    type="text" 
                    value={editingItem?.name || ''} 
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Ville</label>
                    <input 
                      type="text" 
                      value={editingItem?.city || ''} 
                      onChange={(e) => setEditingItem({...editingItem, city: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Standing</label>
                    <select 
                      value={editingItem?.standing || ''} 
                      onChange={(e) => setEditingItem({...editingItem, standing: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                    >
                      <option value="economique">Économique</option>
                      <option value="moyen">Moyen</option>
                      <option value="haut">Haut</option>
                      <option value="luxe">Luxe</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Images (URLs séparées par des virgules)</label>
                  <textarea 
                    value={editingItem?.images?.join(', ') || ''} 
                    onChange={(e) => setEditingItem({...editingItem, images: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all h-32"
                  />
                </div>

                <div className="p-8 bg-primary/5 rounded-3xl border border-primary/20 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Score d'Audit Direct</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" step="0.1" 
                    value={editingItem?.audit?.trustScore || 0}
                    onChange={(e) => setEditingItem({
                      ...editingItem, 
                      audit: { ...editingItem.audit, trustScore: parseFloat(e.target.value) }
                    })}
                    className="w-full accent-primary"
                  />
                  <div className="text-center text-2xl font-black italic">{editingItem?.audit?.trustScore || 0}/10</div>
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 hover:scale-[1.02] transition-all">
                <Save className="w-5 h-5" /> Enregistrer les modifications
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
