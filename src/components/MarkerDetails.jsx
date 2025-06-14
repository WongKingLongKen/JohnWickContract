
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Trash2, Calendar, User, Fingerprint, Crown, Scroll } from 'lucide-react';

const MarkerDetails = ({ marker, onFulfill, onDelete, onBack }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-stone-600 text-stone-300 hover:bg-stone-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Ledger
        </Button>
        
        <div className="flex space-x-4">
          {marker.status === 'active' && (
            <Button
              onClick={() => onFulfill(marker.id)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Fulfill Oath
            </Button>
          )}
          <Button
            onClick={() => onDelete(marker.id)}
            variant="destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Destroy Marker
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-3 gap-8"
      >
        {/* Marker Certificate */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-8 parchment">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-full wax-seal flex items-center justify-center mb-4">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl cinzel text-stone-800 mb-2">Blood Oath Marker</h1>
              <p className="text-stone-600">Certificate #{marker.id}</p>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto mt-4"></div>
            </div>

            <div className="space-y-6 text-stone-800">
              <div className="continental-border p-6 bg-white/50">
                <h3 className="cinzel font-bold text-xl mb-4 text-center">Parties Bound by Blood</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-red-600 flex items-center justify-center mb-3">
                      <Fingerprint className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-bold cinzel">Debtor</p>
                    <p className="text-lg">{marker.debtorName}</p>
                    <p className="text-sm text-stone-600 mt-2">Owes the favor</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-red-600 flex items-center justify-center mb-3">
                      <Fingerprint className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-bold cinzel">Creditor</p>
                    <p className="text-lg">{marker.creditorName}</p>
                    <p className="text-sm text-stone-600 mt-2">Is owed the favor</p>
                  </div>
                </div>
              </div>

              <div className="continental-border p-6 bg-white/50">
                <h3 className="cinzel font-bold text-lg mb-3">Favor to be Fulfilled</h3>
                <p className="text-base leading-relaxed">{marker.favor}</p>
              </div>

              {marker.terms && (
                <div className="continental-border p-6 bg-white/50">
                  <h3 className="cinzel font-bold text-lg mb-3">Terms & Conditions</h3>
                  <p className="text-base leading-relaxed">{marker.terms}</p>
                </div>
              )}

              <div className="continental-border p-6 bg-white/50">
                <h3 className="cinzel font-bold text-lg mb-3">Oath Status</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-lg font-bold ${
                      marker.status === 'active' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {marker.status === 'active' ? 'ACTIVE' : 'FULFILLED'}
                    </p>
                    <p className="text-sm text-stone-600">
                      Created: {formatDate(marker.createdAt)}
                    </p>
                    {marker.fulfilledAt && (
                      <p className="text-sm text-stone-600">
                        Fulfilled: {formatDate(marker.fulfilledAt)}
                      </p>
                    )}
                  </div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    marker.status === 'active' ? 'bg-red-600' : 'bg-green-600'
                  }`}>
                    {marker.status === 'active' ? (
                      <Scroll className="w-8 h-8 text-white" />
                    ) : (
                      <Check className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center pt-6">
                <p className="text-sm text-stone-600 italic">
                  "Witnessed and recorded by The Continental"
                </p>
                <p className="text-xs text-stone-500 mt-2">
                  Winston's Signature & Seal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-black/40 backdrop-blur-sm border border-stone-700/50 rounded-lg p-6">
            <h3 className="cinzel text-xl text-amber-300 mb-4">Marker Information</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-stone-400">Marker ID</p>
                <p className="text-stone-100 font-mono">#{marker.id}</p>
              </div>
              <div>
                <p className="text-stone-400">Registry Date</p>
                <p className="text-stone-100">{formatDate(marker.createdAt)}</p>
              </div>
              <div>
                <p className="text-stone-400">Status</p>
                <span className={`inline-block px-2 py-1 rounded text-xs ${
                  marker.status === 'active'
                    ? 'bg-red-600/20 text-red-400'
                    : 'bg-green-600/20 text-green-400'
                }`}>
                  {marker.status.toUpperCase()}
                </span>
              </div>
              {marker.fulfilledAt && (
                <div>
                  <p className="text-stone-400">Fulfilled Date</p>
                  <p className="text-stone-100">{formatDate(marker.fulfilledAt)}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-stone-700/50 rounded-lg p-6">
            <h3 className="cinzel text-xl text-amber-300 mb-4">Continental Rules</h3>
            <div className="space-y-3 text-sm text-stone-300">
              <p>• A marker cannot be refused</p>
              <p>• The debt must be honored completely</p>
              <p>• Failure to fulfill results in excommunication</p>
              <p>• The Continental oversees all transactions</p>
              <p>• Blood oaths are binding until death</p>
            </div>
          </div>

          {marker.status === 'active' && (
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-6">
              <h3 className="cinzel text-lg text-red-400 mb-3">Active Oath Warning</h3>
              <p className="text-sm text-red-300">
                This marker is currently active. The debtor is bound by blood to fulfill 
                the requested favor. Failure to comply will result in severe consequences.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MarkerDetails;
