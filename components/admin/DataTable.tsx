import React from 'react';
import { ChevronLeft, ChevronRight, MoreVertical, Edit2, Trash2, Copy } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: string | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onDuplicate?: (item: T) => void;
  isLoading?: boolean;
}

const DataTable = <T extends { id: string | number }>({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onDuplicate,
  isLoading 
}: DataTableProps<T>) => {
  return (
    <div className="bg-[#1A1A1A] border border-[#333] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#0F0F0F] border-b border-[#333]">
            <tr>
              <th className="px-6 py-4">
                <input type="checkbox" className="rounded bg-[#1A1A1A] border-[#333] text-[#E84118] focus:ring-[#E84118]" />
              </th>
              {columns.map((column, i) => (
                <th key={i} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete || onDuplicate) && (
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333]">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-10 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-10 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-[#222] transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded bg-[#1A1A1A] border-[#333] text-[#E84118] focus:ring-[#E84118]" />
                  </td>
                  {columns.map((column, i) => (
                    <td key={i} className="px-6 py-4 text-sm text-gray-300">
                      {typeof column.accessor === 'function' 
                        ? column.accessor(item) 
                        : (item as any)[column.accessor]}
                    </td>
                  ))}
                  {(onEdit || onDelete || onDuplicate) && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button 
                            onClick={() => onEdit(item)}
                            className="p-2 text-gray-500 hover:text-white hover:bg-[#333] rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                        {onDuplicate && (
                          <button 
                            onClick={() => onDuplicate(item)}
                            className="p-2 text-gray-500 hover:text-white hover:bg-[#333] rounded-lg transition-colors"
                          >
                            <Copy size={16} />
                          </button>
                        )}
                        {onDelete && (
                          <button 
                            onClick={() => onDelete(item)}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-[#0F0F0F] border-t border-[#333] flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="text-white">1</span> to <span className="text-white">10</span> of <span className="text-white">{data.length}</span> results
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-white hover:bg-[#1A1A1A] rounded-lg border border-[#333] transition-colors disabled:opacity-50">
            <ChevronLeft size={18} />
          </button>
          <button className="p-2 text-gray-500 hover:text-white hover:bg-[#1A1A1A] rounded-lg border border-[#333] transition-colors disabled:opacity-50">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
