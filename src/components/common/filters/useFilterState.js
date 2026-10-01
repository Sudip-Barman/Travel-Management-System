import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook to standardize filter, search, sort and pagination state.
 *
 * @param {Object} options
 * @param {Array} options.items - Raw dataset
 * @param {Object} options.defaultFilters - Default filter values (e.g. { category: 'All', rating: 'All' })
 * @param {string} options.defaultSort - Default sort option ID
 * @param {Function} options.filterFn - Custom matcher function (item, filters, searchQuery) => boolean
 * @param {Function} options.sortFn - Custom sort comparator (a, b, sortBy) => number
 */
export function useFilterState({
  items = [],
  defaultFilters = {},
  defaultSort = 'default',
  filterFn,
  sortFn
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState(defaultSort);
  const [showFilters, setShowFilters] = useState(false);

  // Set single filter
  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Toggle value in an array filter (e.g. amenities)
  const toggleArrayFilter = useCallback((key, value) => {
    setFilters((prev) => {
      const currentList = Array.isArray(prev[key]) ? prev[key] : [];
      if (currentList.includes(value)) {
        return { ...prev, [key]: currentList.filter((v) => v !== value) };
      } else {
        return { ...prev, [key]: [...currentList, value] };
      }
    });
  }, []);

  // Reset all filters and search query
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setFilters(defaultFilters);
    setSortBy(defaultSort);
  }, [defaultFilters, defaultSort]);

  // Remove a specific filter key (or array item)
  const removeFilter = useCallback((key, itemValue) => {
    setFilters((prev) => {
      if (itemValue !== undefined && Array.isArray(prev[key])) {
        return {
          ...prev,
          [key]: prev[key].filter((v) => v !== itemValue)
        };
      }
      return {
        ...prev,
        [key]: defaultFilters[key] !== undefined ? defaultFilters[key] : 'All'
      };
    });
  }, [defaultFilters]);

  // Count active filters (ignoring search and defaults like 'All' or empty arrays)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    Object.keys(filters).forEach((key) => {
      const val = filters[key];
      const defaultVal = defaultFilters[key];

      if (Array.isArray(val)) {
        count += val.length;
      } else if (val !== undefined && val !== null && val !== '' && val !== 'All' && val !== defaultVal) {
        count += 1;
      }
    });
    return count;
  }, [filters, defaultFilters]);

  // Live filtered and sorted results
  const filteredItems = useMemo(() => {
    let result = items;

    if (filterFn) {
      result = result.filter((item) => filterFn(item, filters, searchQuery.trim()));
    }

    if (sortFn && sortBy) {
      result = [...result].sort((a, b) => sortFn(a, b, sortBy));
    }

    return result;
  }, [items, filters, searchQuery, sortBy, filterFn, sortFn]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    setFilter,
    toggleArrayFilter,
    removeFilter,
    resetFilters,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    activeFilterCount,
    filteredItems,
    totalCount: items.length
  };
}
