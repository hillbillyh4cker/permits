import React, { useState } from 'react';
import { X, Save, AlertTriangle, Image as ImageIcon, Upload, Trash2, FileText, Film, Music, Mic, Play, Pause } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../utils/utils';


export const PermitForm = ({ permit, isCityForm = false, contractors = [], onSave, onCancel }) => {
  const [isNewContractor, setIsNewContractor] = useState(!permit.contractorName || !contractors.some(c => c.name === permit.contractorName));
  const [formData, setFormData] = useState({
    type: '',
    city: '',
    permitId: '',
    contractorName: '',
    contractorPhone: '',
    contractorEmail: '',
    submissionDate: '',
    expirationDate: '',
    notes: '',
    buildingDept: '',
    buildingDeptEmail: '',
    buildingDeptPhone: '',
    publicWorks: '',
    businessLicense: '',
    isCityForm: isCityForm,
    ...permit
  });

  const handleContractorSelect = (e) => {
    const name = e.target.value;
    if (name === 'New') {
      setIsNewContractor(true);
      setFormData(prev => ({ 
        ...prev, 
        contractorName: '', 
        contractorPhone: '', 
        contractorEmail: '' 
      }));
    } else {
      setIsNewContractor(false);
      const selected = contractors.find(c => c.name === name);
      if (selected) {
        setFormData(prev => ({ 
          ...prev, 
          contractorName: selected.name, 
          contractorPhone: selected.phone || '', 
          contractorEmail: selected.email || '' 
        }));
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("File is too large. Please select a file under 3MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
          ...prev, 
          permitAttachment: {
            data: reader.result,
            type: file.type,
            name: file.name
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAttachment = () => {
    setFormData(prev => ({ ...prev, permitAttachment: null }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClasses = "w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all";
  const labelClasses = "block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5 ml-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-md" onClick={onCancel}></div>
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-950/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-8 py-5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              {isCityForm ? (permit.id ? 'Edit City Form' : 'Add New City Form') : (permit.id ? 'Edit Permit Details' : 'Add New Permit')}
            </h2>
            <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-widest font-semibold">
              {isCityForm ? 'City Department Documentation' : 'Contractor Permitting System'}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel} className="rounded-full h-10 w-10 p-0 hover:bg-white/10">
            <X size={20} />
          </Button>
        </div>

        <div className="px-8 py-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Permit Basics */}
              <div className="md:col-span-2">
                <label className={labelClasses}>{isCityForm ? 'Form Name' : 'Permit Type'}</label>
                <input
                  required
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder={isCityForm ? "e.g. Plan Check, Inspection Request" : "e.g. Electrical, Building, Mechanical"}
                  className={inputClasses}
                />
              </div>

              <div className="md:col-span-1">
                <label className={labelClasses}>City</label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={inputClasses}
                  disabled={isCityForm && !!permit.city}
                />
              </div>

              {isCityForm && (
                <div className="md:col-span-1">
                  <label className={labelClasses}>City Dept</label>
                  <input
                    name="buildingDept"
                    value={formData.buildingDept || ''}
                    onChange={handleChange}
                    placeholder="Department Name"
                    className={inputClasses}
                  />
                </div>
              )}

              {isCityForm && (
                <div className="md:col-span-1">
                  <label className={labelClasses}>Dept Email</label>
                  <input
                    type="email"
                    name="buildingDeptEmail"
                    value={formData.buildingDeptEmail || ''}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={inputClasses}
                  />
                </div>
              )}

              {isCityForm ? (
                <div className="md:col-span-1">
                  <label className={labelClasses}>Dept Phone #</label>
                  <input
                    name="buildingDeptPhone"
                    value={formData.buildingDeptPhone || ''}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={inputClasses}
                  />
                </div>
              ) : (
                <div className="md:col-span-1">
                  <label className={labelClasses}>Permit ID</label>
                  <input
                    name="permitId"
                    value={formData.permitId}
                    onChange={handleChange}
                    placeholder="ID #"
                    className={inputClasses}
                  />
                </div>
              )}

              {isCityForm && (
                <>
                  <div className="md:col-span-1">
                    <label className={labelClasses}>Form ID</label>
                    <input
                      name="permitId"
                      value={formData.permitId}
                      onChange={handleChange}
                      placeholder="Form ID #"
                      className={inputClasses}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className={labelClasses}>Public Works</label>
                    <input
                      name="publicWorks"
                      value={formData.publicWorks || ''}
                      onChange={handleChange}
                      placeholder="Public Works Contact"
                      className={inputClasses}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className={labelClasses}>Business License</label>
                    <input
                      name="businessLicense"
                      value={formData.businessLicense || ''}
                      onChange={handleChange}
                      placeholder="License #"
                      className={inputClasses}
                    />
                  </div>
                </>
              )}

              {!isCityForm && (
                <>
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Contractor Selection</label>
                    <select 
                      onChange={handleContractorSelect}
                      className={inputClasses}
                      value={isNewContractor ? 'New' : formData.contractorName}
                    >
                      <option value="New">+ Register New Contractor</option>
                      {contractors.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {isNewContractor ? (
                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-top-2">
                      <div className="md:col-span-3 pb-2 border-b border-white/5 mb-2">
                        <p className="text-xs font-bold text-primary-400 uppercase tracking-widest">New Contractor Details</p>
                      </div>
                      <div>
                        <label className={labelClasses}>Name</label>
                        <input
                          required
                          name="contractorName"
                          value={formData.contractorName}
                          onChange={handleChange}
                          placeholder="Name"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Phone</label>
                        <input
                          name="contractorPhone"
                          value={formData.contractorPhone}
                          onChange={handleChange}
                          placeholder="Phone"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Email</label>
                        <input
                          type="email"
                          name="contractorEmail"
                          value={formData.contractorEmail}
                          onChange={handleChange}
                          placeholder="Email"
                          className={inputClasses}
                        />
                      </div>
                    </div>
                  ) : (
                    formData.contractorName && (
                      <div className="md:col-span-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <ImageIcon size={20} />
                          </div>
                          <div>
                            <p className="text-white font-bold leading-tight">{formData.contractorName}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                              {formData.contractorPhone && <span>{formData.contractorPhone}</span>}
                              {formData.contractorEmail && <span>• {formData.contractorEmail}</span>}
                            </p>
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setIsNewContractor(true)} className="h-8 text-[10px] hover:bg-emerald-500/10">
                          Change
                        </Button>
                      </div>
                    )
                  )}
                </>
              )}

              {/* Attachment Section */}
              <div className="md:col-span-3">
                <label className={labelClasses}>Attachment (PDF, Video, Audio, Image)</label>
                {formData.permitAttachment ? (
                  <div className="relative group rounded-2xl overflow-hidden glass-card border-primary-500/30 p-4 flex items-center justify-between bg-primary-500/5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center text-primary-400 border border-white/5 shadow-lg">
                        {formData.permitAttachment.type.includes('image') && <ImageIcon size={28} />}
                        {formData.permitAttachment.type.includes('pdf') && <FileText size={28} />}
                        {formData.permitAttachment.type.includes('video') && <Film size={28} />}
                        {formData.permitAttachment.type.includes('audio') && <Music size={28} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white max-w-[240px] truncate">{formData.permitAttachment.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5 bg-white/5 px-2 py-0.5 rounded w-fit">
                          {formData.permitAttachment.type.split('/')[1]}
                        </p>
                      </div>
                    </div>
                    <Button type="button" variant="danger" size="sm" onClick={clearAttachment} className="gap-2 h-10 px-4">
                      <Trash2 size={16} />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*,application/pdf,video/*,audio/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full py-8 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 bg-slate-900/30 group-hover:border-primary-500/50 group-hover:bg-primary-500/5 transition-all">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary-400 group-hover:bg-primary-500/10 transition-colors">
                        <Upload size={24} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-white">Click or drag files to upload</p>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">PDF, MP4, MOV, FLAC, JPG up to 3MB</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Deadline Section */}
              <div className="md:col-span-1.5">
                <label className={labelClasses}>Submission Date</label>
                <input
                  required
                  type="date"
                  name="submissionDate"
                  value={formData.submissionDate}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div className="md:col-span-1.5">
                <label className={labelClasses}>Expiration Date</label>
                <input
                  required
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div className="md:col-span-3">
                <label className={labelClasses}>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleChange}
                  placeholder="Add any additional notes here..."
                  className={cn(inputClasses, "min-h-[80px] resize-none text-sm")}
                />
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex gap-4 pt-6 border-t border-white/5">
              <Button type="submit" className="flex-1 h-12 gap-2 text-base shadow-lg shadow-primary-500/20">
                <Save size={20} />
                {isCityForm ? (permit.id ? 'Update Form' : 'Save Form') : (permit.id ? 'Update Permit' : 'Create Permit')}
              </Button>
              <Button type="button" variant="secondary" onClick={onCancel} className="flex-1 h-12 text-base">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
