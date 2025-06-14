
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Fingerprint, Scroll, Droplets } from 'lucide-react';

const MarkerCreation = ({ onCreateMarker }) => {
  const [formData, setFormData] = useState({
    debtorName: '',
    creditorName: '',
    favor: '',
    terms: '',
    debtorThumbprint: false,
    creditorThumbprint: false
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleThumbprint = (type) => {
    setFormData(prev => ({ ...prev, [type]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.debtorName || !formData.creditorName || !formData.favor) {
      return;
    }

    if (!formData.debtorThumbprint || !formData.creditorThumbprint) {
      return;
    }

    setIsCreating(true);
    
    // Simulate marker creation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onCreateMarker(formData);
    
    // Reset form
    setFormData({
      debtorName: '',
      creditorName: '',
      favor: '',
      terms: '',
      debtorThumbprint: false,
      creditorThumbprint: false
    });
    
    setIsCreating(false);
  };

  const isFormValid = formData.debtorName && formData.creditorName && formData.favor && 
                     formData.debtorThumbprint && formData.creditorThumbprint;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold cinzel text-amber-300 mb-4">Forge Blood Oath Marker</h2>
        <p className="text-stone-400 text-lg">
          "A marker is a blood oath between two individuals. Once sealed, it cannot be broken."
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/40 backdrop-blur-sm border border-stone-700/50 rounded-lg p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="debtorName" className="text-stone-300 cinzel">Debtor Name</Label>
                <Input
                  id="debtorName"
                  value={formData.debtorName}
                  onChange={(e) => handleInputChange('debtorName', e.target.value)}
                  placeholder="Who owes the favor..."
                  className="bg-stone-900/50 border-stone-600 text-stone-100"
                />
              </div>
              <div>
                <Label htmlFor="creditorName" className="text-stone-300 cinzel">Creditor Name</Label>
                <Input
                  id="creditorName"
                  value={formData.creditorName}
                  onChange={(e) => handleInputChange('creditorName', e.target.value)}
                  placeholder="Who is owed the favor..."
                  className="bg-stone-900/50 border-stone-600 text-stone-100"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="favor" className="text-stone-300 cinzel">Favor Description</Label>
              <Textarea
                id="favor"
                value={formData.favor}
                onChange={(e) => handleInputChange('favor', e.target.value)}
                placeholder="Describe the favor to be fulfilled..."
                className="bg-stone-900/50 border-stone-600 text-stone-100 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="terms" className="text-stone-300 cinzel">Additional Terms (Optional)</Label>
              <Textarea
                id="terms"
                value={formData.terms}
                onChange={(e) => handleInputChange('terms', e.target.value)}
                placeholder="Any specific conditions or limitations..."
                className="bg-stone-900/50 border-stone-600 text-stone-100"
              />
            </div>

            {/* Thumbprint Section */}
            <div className="space-y-4">
              <h3 className="text-xl cinzel text-amber-300 flex items-center">
                <Droplets className="w-5 h-5 mr-2 text-red-500" />
                Blood Oath Sealing
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-stone-400 mb-3">Debtor's Thumbprint</p>
                  <button
                    type="button"
                    onClick={() => handleThumbprint('debtorThumbprint')}
                    disabled={formData.debtorThumbprint}
                    className={`w-20 h-20 rounded-full border-2 transition-all duration-500 ${
                      formData.debtorThumbprint
                        ? 'bg-red-600 border-red-500 thumbprint active'
                        : 'border-stone-600 hover:border-red-500'
                    }`}
                  >
                    <Fingerprint className={`w-8 h-8 mx-auto ${
                      formData.debtorThumbprint ? 'text-white' : 'text-stone-500'
                    }`} />
                  </button>
                  {formData.debtorThumbprint && (
                    <p className="text-red-400 text-sm mt-2">Sealed</p>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-stone-400 mb-3">Creditor's Thumbprint</p>
                  <button
                    type="button"
                    onClick={() => handleThumbprint('creditorThumbprint')}
                    disabled={formData.creditorThumbprint}
                    className={`w-20 h-20 rounded-full border-2 transition-all duration-500 ${
                      formData.creditorThumbprint
                        ? 'bg-red-600 border-red-500 thumbprint active'
                        : 'border-stone-600 hover:border-red-500'
                    }`}
                  >
                    <Fingerprint className={`w-8 h-8 mx-auto ${
                      formData.creditorThumbprint ? 'text-white' : 'text-stone-500'
                    }`} />
                  </button>
                  {formData.creditorThumbprint && (
                    <p className="text-red-400 text-sm mt-2">Sealed</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isCreating}
              className="w-full bg-red-600 hover:bg-red-700 text-white cinzel text-lg py-3"
            >
              {isCreating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Scroll className="w-5 h-5 mr-2" />
              )}
              {isCreating ? 'Forging Marker...' : 'Forge Blood Oath Marker'}
            </Button>
          </form>
        </motion.div>

        {/* Marker Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg p-6 parchment"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl cinzel text-stone-800 mb-2">Blood Oath Marker</h3>
            <div className="w-16 h-16 mx-auto rounded-full wax-seal flex items-center justify-center">
              <Scroll className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="space-y-4 text-stone-800">
            <div className="continental-border p-4 bg-white/50">
              <p className="cinzel font-semibold mb-2">Parties Bound:</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Debtor:</p>
                  <p>{formData.debtorName || 'Awaiting...'}</p>
                </div>
                <div>
                  <p className="font-semibold">Creditor:</p>
                  <p>{formData.creditorName || 'Awaiting...'}</p>
                </div>
              </div>
            </div>

            <div className="continental-border p-4 bg-white/50">
              <p className="cinzel font-semibold mb-2">Favor Owed:</p>
              <p className="text-sm">{formData.favor || 'Awaiting description...'}</p>
            </div>

            {formData.terms && (
              <div className="continental-border p-4 bg-white/50">
                <p className="cinzel font-semibold mb-2">Terms:</p>
                <p className="text-sm">{formData.terms}</p>
              </div>
            )}

            <div className="flex justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full border-2 ${
                  formData.debtorThumbprint ? 'bg-red-600 border-red-500' : 'border-stone-400'
                }`}>
                  {formData.debtorThumbprint && (
                    <Fingerprint className="w-8 h-8 text-white m-2" />
                  )}
                </div>
                <p className="text-xs mt-1">Debtor</p>
              </div>
              <div className="text-center">
                <div className={`w-12 h-12 rounded-full border-2 ${
                  formData.creditorThumbprint ? 'bg-red-600 border-red-500' : 'border-stone-400'
                }`}>
                  {formData.creditorThumbprint && (
                    <Fingerprint className="w-8 h-8 text-white m-2" />
                  )}
                </div>
                <p className="text-xs mt-1">Creditor</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarkerCreation;
