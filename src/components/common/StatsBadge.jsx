import React, { useState, useEffect } from 'react';
import { Eye, Heart } from 'lucide-react';

const StatsBadge = ({ currentTheme }) => {
  const [stats, setStats] = useState({ views: 0, likes: 0 });
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchStats = async (incrementView = true) => {
    try {
      const endpoint = incrementView 
        ? '/api/stats' 
        : '/api/stats?action=get';
      
      const response = await fetch(endpoint);
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  // Fetch stats on mount (increments views automatically)
  useEffect(() => {
    fetchStats();
    // Check if user already liked
    const hasLiked = localStorage.getItem('portfolio_liked');
    if (hasLiked) setLiked(true);
  }, []);

  const handleLike = async () => {
    if (liked) return; // Prevent multiple likes

    setIsAnimating(true);
    
    try {
      const response = await fetch('/api/stats?action=like', {
        method: 'POST',
      });
      const data = await response.json();
      setStats(data);
      setLiked(true);
      localStorage.setItem('portfolio_liked', 'true');
    } catch (error) {
      console.error('Error liking:', error);
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg animate-pulse"
             style={{ backgroundColor: `${currentTheme.button}20` }}>
        <Eye size={18} style={{ color: currentTheme.button }} />
        <span className="text-sm font-semibold" style={{ color: currentTheme.paragraph }}>...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Views Counter */}
      <div 
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
        style={{ backgroundColor: `${currentTheme.button}15` }}
      >
        <Eye size={18} style={{ color: currentTheme.button }} />
        <span className="text-sm font-bold" style={{ color: currentTheme.paragraph }}>
          {formatNumber(stats.views)}
        </span>
      </div>

      {/* Likes Button */}
      <button
        onClick={handleLike}
        disabled={liked}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
          liked ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'
        } ${isAnimating ? 'animate-bounce' : ''}`}
        style={{ 
          backgroundColor: liked ? `${currentTheme.secondary}30` : `${currentTheme.button}15`,
        }}
        title={liked ? 'Ya diste like' : 'Dame un like'}
      >
        <Heart 
          size={18} 
          fill={liked ? currentTheme.secondary : 'none'}
          style={{ color: liked ? currentTheme.secondary : currentTheme.button }}
          className="transition-all"
        />
        <span className="text-sm font-bold" style={{ color: currentTheme.paragraph }}>
          {formatNumber(stats.likes)}
        </span>
      </button>
    </div>
  );
};

export default StatsBadge;
