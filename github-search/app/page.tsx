'use client';

import { useState } from 'react';
import axios from 'axios';
import SearchForm from '@/components/SearchForm';
import RepositoryList from '@/components/RepositoryList';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  owner: {
    login: string;
  };
}

export default function Home() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
      setRepositories(response.data.items);
    } catch (err) {
      console.error('Error fetching repositories:', err);
      setError('Failed to fetch repositories. Please try again.');
      setRepositories([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {error && <p className="errorMessage">{error}</p>}

      {isLoading ? (
        <p className="loadingText">Loading repositories...</p>
      ) : (
        searchQuery && <RepositoryList repositories={repositories} searchQuery={searchQuery} />
      )}
    </div>
  );
} 