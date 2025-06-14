
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye, Check, Trash2, Calendar, User, Scroll, Crown, Filter } from 'lucide-react';

const MarkerLedger = ({ markers, onView, onFulfill, onDelete }) => {
  const [filter, setFilter] = useState('all');

  const filteredMarkers = markers.filter(marker => {
    if (filter === 'active') return marker.status === 'active';
    if (filter === 'fulfilled') return marker.status === 'fulfilled';
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold cinzel text-amber-300 mb-2">Winston's Ledger</h2>
          <p className="text-stone-400">
            "Every blood oath is recorded and witnessed by The Continental"
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-stone-900/50 border border-stone-600 rounded-md px-3 py-2 text-stone-300"
            >
              <option value="all">All Markers</option>
              <option value="active">Active</option>
              <option value="fulfilled">Fulfilled</option>
            </select>
          </div>
        </div>
      </div>

      {filteredMarkers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Scroll className="w-16 h-16 text-stone-600 mx-auto mb-4" />
          <h3 className="text-xl cinzel text-stone-400 mb-2">No Markers Found</h3>
          <p className="text-stone-500">
            {filter === 'all' 
              ? 'The ledger is empty. No blood oaths have been recorded.'
              : `No ${filter} markers in the registry.`
            }
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-6">
          {filteredMarkers.map((marker, index) => (
            <motion.div
              key={marker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-black/40 backdrop-blur-sm border rounded-lg p-6 ${
                marker.status === 'active' 
                  ? 'border-red-500/30 marker-glow' 
                  : 'border-stone-700/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      marker.status === 'active' 
                        ? 'bg-red-600 marker-glow' 
                        : 'bg-stone-600'
                    }`}>
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl cinzel text-amber-300">
                        Blood Oath #{marker.id.slice(-6)}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-stone-400">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(marker.createdAt)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          marker.status === 'active'
                            ? 'bg-red-600/20 text-red-400'
                            : 'bg-green-600/20 text-green-400'
                        }`}>
                          {marker.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-stone-300">
                        <User className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Debtor:</span>
                      </div>
                      <p className="text-stone-100 ml-6">{marker.debtorName}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-stone-300">
                        <User className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Creditor:</span>
                      </div>
                      <p className="text-stone-100 ml-6">{marker.creditorName}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-stone-300 font-semibold">Favor Owed:</p>
                    <p className="text-stone-100 bg-stone-900/30 p-3 rounded border-l-4 border-red-500">
                      {marker.favor}
                    </p>
                  </div>

                  {marker.terms && (
                    <div className="space-y-2 mt-4">
                      <p className="text-stone-300 font-semibold">Terms:</p>
                      <p className="text-stone-100 bg-stone-900/30 p-3 rounded">
                        {marker.terms}
                      </p>
                    </div>
                  )}

                  {marker.status === 'fulfilled' && marker.fulfilledAt && (
                    <div className="mt-4 p-3 bg-green-900/20 border border-green-600/30 rounded">
                      <p className="text-green-400 text-sm">
                        ✓ Oath fulfilled on {formatDate(marker.fulfilledAt)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <Button
                    onClick={() => onView(marker)}
                    variant="outline"
                    size="sm"
                    className="border-stone-600 text-stone-300 hover:bg-stone-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  
                  {marker.status === 'active' && (
                    <Button
                      onClick={() => onFulfill(marker.id)}
                      variant="outline"
                      size="sm"
                      className="border-green-600 text-green-400 hover:bg-green-900/20"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Fulfill
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => onDelete(marker.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarkerLedger;
