import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Eye, Download, CheckCircle2, Circle } from 'lucide-react';

const ALL_COLUMNS = [
  { id: 'type', label: 'Type' },
  { id: 'city', label: 'City' },
  { id: 'permitId', label: 'Permit ID' },
  { id: 'contractorName', label: 'Contractor' },
  { id: 'contractorPhone', label: 'Contractor Phone' },
  { id: 'contractorEmail', label: 'Contractor Email' },
  { id: 'submissionDate', label: 'Submitted' },
  { id: 'expirationDate', label: 'Expires' },
  { id: 'status', label: 'Status' },
];

export const ReportBuilder = ({ permits }) => {
  const [selectedColumns, setSelectedColumns] = useState(['type', 'city', 'contractorName', 'status']);
  
  const toggleColumn = (colId) => {
    setSelectedColumns(prev => 
      prev.includes(colId) 
        ? prev.filter(id => id !== colId)
        : [...prev, colId]
    );
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(selectedColumns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedColumns(items);
  };

  const exportCSV = () => {
    const headers = selectedColumns.map(id => ALL_COLUMNS.find(c => c.id === id).label).join(',');
    const rows = permits.map(permit => 
      selectedColumns.map(id => `"${permit[id] || ''}"`).join(',')
    ).join('\n');
    
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "permit_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Report <span className="gradient-text">Builder</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Customize and generate detailed permit reports.</p>
        </div>
        <button 
          onClick={exportCSV}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-95"
        >
          <Download size={20} />
          Export CSV
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column Selection & Reordering */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Eye size={20} className="text-primary-400" />
              Configure Columns
            </h3>
            
            <div className="space-y-4">
               <div>
                 <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Available Fields</p>
                 <div className="flex flex-wrap gap-2">
                   {ALL_COLUMNS.map(col => (
                     <button
                       key={col.id}
                       onClick={() => toggleColumn(col.id)}
                       className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all border ${
                         selectedColumns.includes(col.id)
                           ? 'bg-primary-500/20 border-primary-500/50 text-primary-400'
                           : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'
                       }`}
                     >
                       {selectedColumns.includes(col.id) ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                       {col.label}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="pt-4 border-t border-slate-700/50">
                 <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Order (Drag to reorder)</p>
                 <DragDropContext onDragEnd={handleOnDragEnd}>
                   <Droppable droppableId="columns">
                     {(provided) => (
                       <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                         {selectedColumns.map((colId, index) => {
                           const column = ALL_COLUMNS.find(c => c.id === colId);
                           return (
                             <Draggable key={colId} draggableId={colId} index={index}>
                               {(provided) => (
                                 <li
                                   ref={provided.innerRef}
                                   {...provided.draggableProps}
                                   className="bg-slate-800/80 border border-slate-700/50 p-3 rounded-xl flex items-center justify-between group"
                                 >
                                   <div className="flex items-center gap-3">
                                     <div {...provided.dragHandleProps} className="text-slate-600 group-hover:text-slate-400 transition-colors">
                                       <GripVertical size={18} />
                                     </div>
                                     <span className="text-sm font-medium text-slate-200">{column.label}</span>
                                   </div>
                                 </li>
                               )}
                             </Draggable>
                           );
                         })}
                         {provided.placeholder}
                       </ul>
                     )}
                   </Droppable>
                 </DragDropContext>
               </div>
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          <div className="glass-card overflow-hidden">
             <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Report Preview</h3>
                <span className="text-xs text-slate-500">{permits.length} Records</span>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-slate-900/50">
                     {selectedColumns.map(colId => (
                       <th key={colId} className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                         {ALL_COLUMNS.find(c => c.id === colId).label}
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-700/50">
                   {permits.map((permit, i) => (
                     <tr key={permit.id || i} className="hover:bg-slate-800/30 transition-colors">
                       {selectedColumns.map(colId => (
                         <td key={colId} className="px-6 py-4 text-sm text-slate-300">
                           {permit[colId] || '-'}
                         </td>
                       ))}
                     </tr>
                   ))}
                   {permits.length === 0 && (
                     <tr>
                       <td colSpan={selectedColumns.length} className="px-6 py-12 text-center text-slate-500">
                         No permit data available.
                       </td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
