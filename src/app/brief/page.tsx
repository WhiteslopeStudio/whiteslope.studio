'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function BriefForm() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    companyProfile: '',
    websiteType: '',
    websiteGoals: '',
    functionsList: '',
    integrationsList: '',
    homePageSections: '',
    mainMenu: '',
    siteMap: '',
    budget: '',
    timeline: '',
    additionalInfo: '',
  });

  // Auto-fill from URL params
  useEffect(() => {
    const newData = { ...formData };
    searchParams.forEach((value, key) => {
      if (key in newData) {
        newData[key as keyof typeof formData] = decodeURIComponent(value);
      }
    });
    setFormData(newData);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/brief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          email: '',
          name: '',
          company: '',
          companyProfile: '',
          websiteType: '',
          websiteGoals: '',
          functionsList: '',
          integrationsList: '',
          homePageSections: '',
          mainMenu: '',
          siteMap: '',
          budget: '',
          timeline: '',
          additionalInfo: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting brief:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Project Brief</h1>
          <p className="text-slate-400">Finalize your project details and send to Whiteslope Studio</p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
            <p className="text-green-400 font-medium">✅ Brief submitted successfully!</p>
            <p className="text-green-300 text-sm">We'll contact you soon at {formData.email}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          
          {/* Required Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Email */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="client@example.com"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Jan Kowalski"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Optional Fields - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Company */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Studio XYZ"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Website Type */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Website Type</label>
              <input
                type="text"
                name="websiteType"
                value={formData.websiteType}
                onChange={handleChange}
                placeholder="e.g., Portfolio + Booking"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Budget</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., 3000-5000 zł"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Timeline</label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="e.g., 3-4 weeks"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Text Areas */}
          <div className="space-y-4 mb-6">
            {/* Company Profile */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Company Profile</label>
              <textarea
                name="companyProfile"
                value={formData.companyProfile}
                onChange={handleChange}
                placeholder="Brief description of your company..."
                rows={2}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Website Goals */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Website Goals</label>
              <textarea
                name="websiteGoals"
                value={formData.websiteGoals}
                onChange={handleChange}
                placeholder="What do you want to achieve with this website?"
                rows={2}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Functions List */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Functions (comma-separated)</label>
              <textarea
                name="functionsList"
                value={formData.functionsList}
                onChange={handleChange}
                placeholder="e.g., Portfolio, Booking, Contact Form, Gallery"
                rows={2}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Integrations */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Integrations (comma-separated)</label>
              <textarea
                name="integrationsList"
                value={formData.integrationsList}
                onChange={handleChange}
                placeholder="e.g., Stripe, Google Calendar, Mailchimp"
                rows={2}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Additional Info</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any additional information or special requirements?"
                rows={2}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            {isLoading ? 'Sending...' : 'Send Brief'}
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 text-center text-slate-400 text-sm">
          <p>Questions? Contact us at <a href="mailto:kontakt@whiteslope.studio" className="text-blue-400 hover:text-blue-300">kontakt@whiteslope.studio</a></p>
        </div>
      </div>
    </div>
  );
}

export default function BriefPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-white">Loading...</p></div>}>
      <BriefForm />
    </Suspense>
  );
}
