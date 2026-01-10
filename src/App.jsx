import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { careerData } from './data/careerData';
import CardGrid from './components/CardGrid';
import JobDetails from './components/JobDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import CareerBot from './components/CareerBot';
import { ChevronRight, Home, LogOut, Bot } from 'lucide-react';

// Separate MainContent from AuthProvider to use the hook
const MainContent = () => {
    const { user, logout } = useAuth();
    const [path, setPath] = useState([]);
    const [authPage, setAuthPage] = useState('login'); // 'login' or 'signup'
    const [searchQuery, setSearchQuery] = useState('');
    const [isBotOpen, setIsBotOpen] = useState(false);

    if (!user) {
        return authPage === 'login' ? (
            <Login onSwitchToSignup={() => setAuthPage('signup')} />
        ) : (
            <Signup onSwitchToLogin={() => setAuthPage('login')} />
        );
    }

    // Helper to get current items to display
    const getCurrentView = () => {
        if (searchQuery.trim()) {
            // Global Search Logic
            const results = [];
            careerData.forEach(edu => {
                (edu.branches || []).forEach(branch => {
                    // Check branch title
                    if (branch.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                        results.push({ ...branch, type: 'branch', eduTitle: edu.title, parentEdu: edu });
                    }
                    // Check jobs
                    (branch.jobs || []).forEach(job => {
                        if (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                            results.push({ ...job, type: 'job', branchTitle: branch.title, eduTitle: edu.title, parentEdu: edu, parentBranch: branch });
                        }
                    });
                });
            });

            return {
                type: 'search',
                title: `Search Results for "${searchQuery}"`,
                items: results
            };
        }

        if (path.length === 0) {
            return {
                type: 'list',
                title: 'Select Your Education Level',
                items: careerData
            };
        }

        const eduLevel = path[0];
        if (path.length === 1) {
            return {
                type: 'list',
                title: `Streams & Branches in ${eduLevel.title}`,
                items: eduLevel.branches || []
            };
        }

        const branch = path[1];
        if (path.length === 2) {
            return {
                type: 'list',
                title: `Career Opportunities for ${branch.title}`,
                items: branch.jobs || []
            };
        }

        const job = path[2];
        return {
            type: 'details',
            item: job
        };
    };

    const handleSelect = (item) => {
        if (item.type === 'job') {
            setSearchQuery('');
            setPath([item.parentEdu, item.parentBranch, item]);
        } else if (item.type === 'branch') {
            setSearchQuery('');
            setPath([item.parentEdu, item]);
        } else {
            setPath([...path, item]);
        }
    };

    const handleBack = () => {
        setPath(path.slice(0, -1));
    };

    const navigateTo = (index) => {
        setSearchQuery('');
        if (index === -1) {
            setPath([]);
        } else {
            setPath(path.slice(0, index + 1));
        }
    };

    const currentView = getCurrentView();

    return (
        <div className="app-container">
            {/* Navigation Bar */}
            <nav style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: 0, padding: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                            onClick={() => navigateTo(-1)}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: (path.length === 0 && !searchQuery) ? '#2563eb' : '#475569' }}
                        >
                            <Home size={18} />
                            <span>Home</span>
                        </div>

                        {path.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <ChevronRight size={16} color="#94a3b8" />
                                <span
                                    onClick={() => navigateTo(index)}
                                    style={{
                                        cursor: index === path.length - 1 ? 'default' : 'pointer',
                                        color: index === path.length - 1 ? '#2563eb' : '#475569',
                                        fontWeight: index === path.length - 1 ? '600' : 'normal',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {item.title}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px', marginLeft: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.05)', padding: '8px 15px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                            <input
                                type="text"
                                placeholder="Search roles, skills, branches..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#1e293b' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="container" style={{ margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Bot Toggle in Navbar */}
                    <div
                        onClick={() => setIsBotOpen(!isBotOpen)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            padding: '8px 12px',
                            background: isBotOpen ? '#2563eb' : 'rgba(37, 99, 235, 0.05)',
                            color: isBotOpen ? 'white' : '#2563eb',
                            borderRadius: '20px',
                            transition: 'all 0.3s',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}
                    >
                        <Bot size={18} />
                        <span>Ask AI</span>
                    </div>

                    <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Hi, {user.name}</span>
                    <button
                        onClick={logout}
                        style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main style={{ paddingBottom: '50px' }}>
                {currentView.type === 'list' || currentView.type === 'search' ? (
                    <CardGrid
                        title={currentView.title}
                        items={currentView.items}
                        onSelect={handleSelect}
                    />
                ) : (
                    <JobDetails
                        job={currentView.item}
                        onBack={handleBack}
                    />
                )}
            </main>
            <CareerBot isOpen={isBotOpen} setIsOpen={setIsBotOpen} />
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <MainContent />
        </AuthProvider>
    );
}

export default App;
