import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';
import { schemes, categories, states } from '../data/schemes';
import SchemeCard from '../components/schemes/SchemeCard';
import Modal from '../components/ui/Modal';
import SchemeDetails from './SchemeDetail';
import Footer from '../components/layout/Footer';

export default function Schemes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All India');
  const [sortBy, setSortBy] = useState('match');
  const [viewMode, setViewMode] = useState('grid');
  const [maxIncome, setMaxIncome] = useState('');
  const [eligibilityModal, setEligibilityModal] = useState(null);

  const filteredSchemes = useMemo(() => {
    let result = [...schemes];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter(s => s.category === selectedCategory);
    }

    // State
    if (selectedState !== 'All India') {
      result = result.filter(s => s.state === selectedState || s.state === 'All India');
    }

    // Income
    if (maxIncome) {
      result = result.filter(s =>
        !s.eligibility.maxIncome || s.eligibility.maxIncome >= parseInt(maxIncome)
      );
    }

    // Sort
    if (sortBy === 'match') result.sort((a, b) => (b.matchPercent || 0) - (a.matchPercent || 0));
    else if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'benefit') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [searchQuery, selectedCategory, selectedState, maxIncome, sortBy]);

  return (
    <div>
      {/* Header */}
      <section className="bg-navy py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white mb-2">Government Schemes</h1>
          <p className="text-white/70 mb-6">Discover schemes that may be available to you. {schemes.length} schemes listed.</p>

          {/* Search bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search schemes by name, category, keyword..."
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-orange focus:bg-white/15 transition-all"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6 pb-5 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-text-muted font-medium">
            <SlidersHorizontal className="w-4 h-4" />
            Filters:
          </div>

          {/* Category */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                  selectedCategory === cat
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white border-border text-text-muted hover:border-navy hover:text-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* State filter */}
          <div className="relative">
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="appearance-none bg-white border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-text-dark pr-7 focus:outline-none focus:border-navy cursor-pointer"
            >
              {states.map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-text-dark pr-7 focus:outline-none focus:border-navy"
            >
              <option value="match">Sort: Best Match</option>
              <option value="name">Sort: Name A–Z</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
          </div>

          {/* View toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-navy text-white' : 'bg-white text-text-muted hover:bg-bg'} transition-colors`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-navy text-white' : 'bg-white text-text-muted hover:bg-bg'} transition-colors`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-text-muted mb-5">
          Showing <strong className="text-navy">{filteredSchemes.length}</strong> schemes
          {selectedCategory !== 'All' && <> in <strong className="text-navy">{selectedCategory}</strong></>}
          {searchQuery && <> for "<strong className="text-navy">{searchQuery}</strong>"</>}
        </p>

        {/* Schemes Grid/List */}
        {filteredSchemes.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-border mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy mb-2">No schemes found</h3>
            <p className="text-text-muted mb-4">Try adjusting your filters or search query.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
            : 'flex flex-col gap-4'
          }>
            {filteredSchemes.map(scheme => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onCheckEligibility={s => setEligibilityModal(s)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
