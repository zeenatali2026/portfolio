import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  ExternalLink,
  Heart,
  MessageCircle,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Star,
  Code2,
  Database,
  Cloud,
  Shield,
  Zap,
  Layers,
  Server,
  Layout,
  Smartphone,
  Lock,
  Send,
  X
} from 'lucide-react';

// Import the same projects data
const projectsData = [
  {
    _id: '1',
    title: 'Professional-Graphic Designer',
    description: 'Real-time chat, communities, and professional Desingning platform.',
    fullDescription: 'I am creating all social media poster,boster,flywers and thumbnail on canva, photoshop,Nanobanana and other platform.',
    technologies: ['Canva', 'Nanobanana', 'Adobe Express', 'PicsArt', 'Ibis Paint X', 'Adobe Photoshop', 'Adobe Illustrator',],
    imageUrl: './1',
    images: [
   'https://placehold.co/800x500/1a1a2e/EC4899?text=Professional+Graphic+Designer',

    ],
    likes: 15,
    comments: [
      { id: 1, author: 'TechRecruiter', text: 'Great platform! The real-time chat works flawlessly.', date: '2024-02-10', avatar: 'https://placehold.co/40x40' },
      { id: 2, author: 'DevCommunity', text: 'Love the professional networking features.', date: '2024-02-05', avatar: 'https://placehold.co/40x40' }
    ],
    githubUrl: 'https://github.com/zeenatali2026/',
    liveUrl: 'https://wuddy.vercel.app',
    category: 'Professional Graphic Designer',
    featured: true,
    date: '2026-02-01',
    duration: '6 months',
    role: 'Professional Graphic Designer'
  },
  {
    _id: '2',
    title: 'Web Development',
    description: 'I build modern, responsive and user-friendly websites that help business grow online clean code.Great design.Better experience.',
    fullDescription: 'I build modern, responsive and user-friendly websites that help business grow online clean code.Great design.Better experience.And finally i used languages likes Html,CSS,Javascript.',
    technologies: ['Html', 'Java script', 'CSS', 'Git& Github', 'PHP', 'Redux'],
    imageUrl: '',
    images: [
         'https://placehold.co/800x500/1a1a2e/EC4899?text=Web+Development',

    ],
    likes: 23,
    comments: [
      { id: 1, author: 'ShopOwner', text: 'The payment integration is seamless!', date: '2024-01-28', avatar: 'https://placehold.co/40x40' }
    ],
    githubUrl: 'https://github.com/zeenatali2026/',
    liveUrl: 'https://gearix.vercel.app',
    category: 'E-commerce',
    featured: true,
    date: '2026-01-25',
    duration: '2 months',
    role: 'Professional Video Editor'
  },
  {
    _id: '3',
    title: 'Professional Video Editor',
    description: 'Edit your story makeit epic.',
    fullDescription: 'I creating professional video and editing video professional.',
    technologies: ['Cupcut', 'Kavicut', 'After Affect',],
    imageUrl: './3.png',
    images: [
      'https://placehold.co/800x500/1a1a2e/EC4899?text=Professional+Video+Editor',
    ],
    likes: 34,
    comments: [
      { id: 1, author: 'MessengerUser', text: 'Super fast real-time updates!', date: '2024-01-20', avatar: 'https://placehold.co/40x40' },
      { id: 2, author: 'TeamLead', text: 'Group chat works perfectly.', date: '2024-01-18', avatar: 'https://placehold.co/40x40' }
    ],
    githubUrl: 'https://github.com/zeenatali2026/WeChat',
    liveUrl: 'https://wechat.vercel.app',
    category: 'Real-time',
    featured: true,
    date: '2026-01-15',
    duration: '1.5 months',
    role: 'Professional Video Editor'
  }
];

// Clock component
const Clock = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [comments, setComments] = useState([]);
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const foundProject = projectsData.find(p => p._id === id);
      if (foundProject) {
        setProject(foundProject);
        setLikesCount(foundProject.likes);
        setComments(foundProject.comments);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: commentAuthor || 'Anonymous',
      text: newComment,
      date: new Date().toISOString().split('T')[0],
      avatar: 'https://placehold.co/40x40'
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setCommentAuthor('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return <Code2 size={isMobile ? 12 : 16} />;
    if (techLower.includes('node')) return <Server size={isMobile ? 12 : 16} />;
    if (techLower.includes('mongo')) return <Database size={isMobile ? 12 : 16} />;
    if (techLower.includes('express')) return <Layers size={isMobile ? 12 : 16} />;
    if (techLower.includes('socket')) return <Zap size={isMobile ? 12 : 16} />;
    if (techLower.includes('stripe')) return <Lock size={isMobile ? 12 : 16} />;
    if (techLower.includes('tailwind')) return <Layout size={isMobile ? 12 : 16} />;
    if (techLower.includes('responsive')) return <Smartphone size={isMobile ? 12 : 16} />;
    return <Code2 size={isMobile ? 12 : 16} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 md:w-16 h-12 md:h-16 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={`text-sm md:text-base ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className={`text-lg md:text-xl mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Project not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-5 md:px-6 py-2 text-sm md:text-base rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-16 md:py-20 px-3 md:px-4 ${isDark ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Back Button - Smaller on mobile */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className={`flex items-center gap-1.5 md:gap-2 mb-4 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${isDark
            ? 'bg-white/5 hover:bg-white/10 text-text-secondary'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
        >
          <ArrowLeft size={isMobile ? 14 : 18} />
          Back to Projects
        </motion.button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Images & Gallery */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div
                className={`rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-4 ${isDark ? 'bg-gray-800' : 'bg-white'
                  } shadow-xl`}
              >
                <img
                  src={project.images?.[activeImage] || project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto object-fit"
                />
              </div>

              {/* Thumbnail Gallery - Smaller on mobile */}
              {project.images && project.images.length > 1 && (
                <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx
                        ? 'border-cyber-cyan'
                        : isDark
                          ? 'border-transparent hover:border-cyber-cyan/50'
                          : 'border-gray-200 hover:border-cyan-400'
                        }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2 flex-wrap">

                {project.featured && (
                  <span
                    className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${isDark
                      ? 'bg-cyber-pink/20 text-cyber-pink'
                      : 'bg-pink-100 text-pink-700'
                      }`}
                  >
                    Featured
                  </span>
                )}
              </div>
              <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-2 md:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm">
                <div className="flex items-center gap-0.5 md:gap-1">
                  <Calendar size={isMobile ? 10 : 14} className="text-cyber-cyan" />
                  <span className={isDark ? 'text-text-secondary' : 'text-gray-600'}>{project.date}</span>
                </div>
                <div className="flex items-center gap-0.5 md:gap-1">
                  <User size={isMobile ? 10 : 14} className="text-cyber-purple" />
                  <span className={isDark ? 'text-text-secondary' : 'text-gray-600'}>{project.role}</span>
                </div>
                <div className="flex items-center gap-0.5 md:gap-1">
                  <Clock size={isMobile ? 10 : 14} className="text-cyber-pink" />
                  <span className={isDark ? 'text-text-secondary' : 'text-gray-600'}>{project.duration}</span>
                </div>
              </div>
            </div>

            {/* Description - Shorter on mobile */}
            <div>
              <h3 className={`text-base md:text-lg font-semibold mb-1.5 md:mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                About This Project
              </h3>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed space-y-2 md:space-y-3 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                <p>{isMobile ? project.fullDescription.substring(0, 200) + '...' : project.fullDescription.split('\n\n')[0]}</p>
              </div>
            </div>

            {/* Tech Stack - Smaller tags on mobile */}
            <div>
              <h3 className={`text-base md:text-lg font-semibold mb-2 md:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {(isMobile ? project.technologies.slice(0, 6) : project.technologies).map((tech, idx) => (
                  <span
                    key={idx}
                    className={`flex items-center gap-0.5 md:gap-1 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-sm ${isDark
                      ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30'
                      : 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                      }`}
                  >
                    {getTechIcon(tech)}
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons - Smaller on mobile */}
            <div className="flex gap-2 md:gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 px-3 md:px-6 py-1.5 md:py-3 text-sm md:text-base rounded-full font-semibold flex items-center justify-center gap-1.5 md:gap-2 transition-all duration-300 ${isDark
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
              >
                View Code
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 md:px-6 py-1.5 md:py-3 text-sm md:text-base rounded-full font-semibold flex items-center justify-center gap-1.5 md:gap-2 transition-all duration-300"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, #00F0FF, #8B5CF6)'
                    : 'linear-gradient(135deg, #00B4C8, #7850DC)',
                  color: 'white',
                }}
              >
                <ExternalLink size={isMobile ? 14 : 18} />
                Live Demo
              </a>
            </div>

            {/* Like & Share - Smaller on mobile */}
            <div className="flex items-center justify-between pt-3 md:pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full transition-all duration-300 text-sm md:text-base ${liked
                  ? 'text-cyber-pink'
                  : isDark
                    ? 'text-text-secondary hover:text-cyber-pink'
                    : 'text-gray-600 hover:text-pink-600'
                  }`}
              >
                <Heart size={isMobile ? 16 : 20} fill={liked ? '#EC4899' : 'none'} />
                <span>{likesCount} Likes</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full transition-all duration-300 text-sm md:text-base ${isDark
                    ? 'text-text-secondary hover:text-cyber-cyan'
                    : 'text-gray-600 hover:text-cyan-600'
                    }`}
                >
                  <Share2 size={isMobile ? 16 : 18} />
                  Share
                </button>

                {showShareMenu && (
                  <div
                    className={`absolute right-0 mt-2 p-1.5 md:p-2 rounded-lg shadow-xl z-10 ${isDark ? 'bg-gray-800' : 'bg-white'
                      }`}
                  >
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-2 rounded hover:bg-cyber-cyan/10 w-full text-sm md:text-base"
                    >
                      {copied ? <Check size={isMobile ? 14 : 16} /> : <Copy size={isMobile ? 14 : 16} />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comments Section - Reduced padding on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-8 md:mt-12 p-4 md:p-6 rounded-xl md:rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-white'
            }`}
        >
          <h3 className={`text-base md:text-xl font-semibold mb-4 md:mb-6 flex items-center gap-1.5 md:gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <MessageCircle size={isMobile ? 16 : 20} className="text-cyber-cyan" />
            Comments ({comments.length})
          </h3>

          {/* Add Comment Form - Smaller on mobile */}
          <form onSubmit={handleAddComment} className="mb-6 md:mb-8">
            <div className="flex gap-2 md:gap-3 mb-2 md:mb-3">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className={`flex-1 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-cyber-cyan'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                  }`}
              />
            </div>
            <div className="flex gap-2 md:gap-3">
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={isMobile ? 2 : 3}
                className={`flex-1 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyber-cyan resize-none ${isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-cyber-cyan'
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500'
                  }`}
              />
              <button
                type="submit"
                className="px-3 md:px-6 py-1.5 md:py-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <Send size={isMobile ? 14 : 18} />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3 md:space-y-4 max-h-96 overflow-y-auto">
            {comments.length === 0 ? (
              <p className={`text-center py-6 md:py-8 text-sm md:text-base ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.slice(0, isMobile ? 3 : comments.length).map((comment) => (
                <div
                  key={comment.id}
                  className={`p-3 md:p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}
                >
                  <div className="flex justify-between items-start mb-1.5 md:mb-2">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple flex items-center justify-center text-white text-xs md:text-sm font-bold">
                        {comment.author[0].toUpperCase()}
                      </div>
                      <div>
                        <span className={`text-sm md:text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {comment.author}
                        </span>
                        <span className={`text-[10px] md:text-xs ml-1.5 md:ml-2 ${isDark ? 'text-text-secondary' : 'text-gray-500'}`}>
                          {comment.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className={`text-xs md:text-sm ml-7 md:ml-10 ${isDark ? 'text-text-secondary' : 'text-gray-600'}`}>
                    {comment.text}
                  </p>
                </div>
              ))
            )}
            {isMobile && comments.length > 3 && (
              <p className={`text-center text-xs ${isDark ? 'text-text-secondary' : 'text-gray-500'} mt-2`}>
                +{comments.length - 3} more comments
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;