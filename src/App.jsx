
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { Scroll, Crown, Fingerprint, BookOpen, Plus, Eye, Trash2, Calendar, User } from 'lucide-react';
import MarkerCreation from '@/components/MarkerCreation';
import MarkerLedger from '@/components/MarkerLedger';
import MarkerDetails from '@/components/MarkerDetails';

function App() {
  const [activeTab, setActiveTab] = useState('ledger');
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const savedMarkers = localStorage.getItem('bloodOathMarkers');
    if (savedMarkers) {
      setMarkers(JSON.parse(savedMarkers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bloodOathMarkers', JSON.stringify(markers));
  }, [markers]);

  const addMarker = (newMarker) => {
    const marker = {
      ...newMarker,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setMarkers(prev => [marker, ...prev]);
    toast({
      title: "Blood Oath Sealed",
      description: "The marker has been forged and witnessed by The Continental.",
    });
  };

  const fulfillMarker = (markerId) => {
    setMarkers(prev => prev.map(marker => 
      marker.id === markerId 
        ? { ...marker, status: 'fulfilled', fulfilledAt: new Date().toISOString() }
        : marker
    ));
    toast({
      title: "Oath Fulfilled",
      description: "The blood debt has been honored.",
    });
  };

  const deleteMarker = (markerId) => {
    setMarkers(prev => prev.filter(marker => marker.id !== markerId));
    toast({
      title: "Marker Destroyed",
      description: "The blood oath has been erased from the records.",
      variant: "destructive"
    });
  };

  const viewMarker = (marker) => {
    setSelectedMarker(marker);
    setActiveTab('details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-red-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-amber-600/30 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center marker-glow">
                  <Crown className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold cinzel text-amber-300">The Continental</h1>
                  <p className="text-stone-400 text-sm">Blood Oath Registry</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-stone-400 text-sm">Winston's Ledger</p>
                <p className="text-amber-300 font-semibold">{markers.length} Active Markers</p>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="border-b border-stone-700/50 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('ledger')}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeTab === 'ledger'
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-stone-400 hover:text-stone-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="cinzel">Ledger</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeTab === 'create'
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-stone-400 hover:text-stone-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span className="cinzel">Forge Marker</span>
                </div>
              </button>
              {selectedMarker && (
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-2 border-b-2 transition-colors ${
                    activeTab === 'details'
                      ? 'border-red-500 text-red-400'
                      : 'border-transparent text-stone-400 hover:text-stone-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span className="cinzel">Details</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'ledger' && (
              <motion.div
                key="ledger"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MarkerLedger 
                  markers={markers}
                  onView={viewMarker}
                  onFulfill={fulfillMarker}
                  onDelete={deleteMarker}
                />
              </motion.div>
            )}

            {activeTab === 'create' && (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MarkerCreation onCreateMarker={addMarker} />
              </motion.div>
            )}

            {activeTab === 'details' && selectedMarker && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MarkerDetails 
                  marker={selectedMarker}
                  onFulfill={fulfillMarker}
                  onDelete={deleteMarker}
                  onBack={() => setActiveTab('ledger')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
