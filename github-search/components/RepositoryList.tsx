'use client';

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

interface RepositoryListProps {
  repositories: Repository[];
  searchQuery: string;
}

export default function RepositoryList({ repositories, searchQuery }: RepositoryListProps) {
  if (!repositories.length) {
    return (
      <div>
        <p>No repositories found for: <span dangerouslySetInnerHTML={{ __html: searchQuery }} /></p>
      </div>
    );
  }

  return (
    <div>
      {/* XSS vulnerability: Using dangerouslySetInnerHTML without sanitization */}
      <h2>Search results for: <span dangerouslySetInnerHTML={{ __html: searchQuery }} /></h2>

      <div className="repoList">
        {repositories.map((repo) => (
          <div key={repo.id} className="repoCard">
            <h3 className="repoName">{repo.owner.login} / {repo.name}</h3>
            {/* Another XSS vulnerability: Using dangerouslySetInnerHTML for description */}
            {repo.description && (
              <p className="repoDescription" dangerouslySetInnerHTML={{ __html: repo.description }} />
            )}
            <div className="repoStats">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              {repo.language && <span>🔤 {repo.language}</span>}
            </div>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repoLink">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 