import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';

const Signup = ({ onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        const result = signup(name, email, password);
        if (!result.success) {
            setError(result.message);
        }
    };

    return (
        <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Create Account</h1>
                <p style={{ textAlign: 'center', marginBottom: '30px' }}>Join to explore your career path</p>

                {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '10px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
                    {error}
                </div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                            <User size={20} color="#64748b" style={{ marginRight: '10px' }} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '1rem', color: '#1e293b' }}
                            />
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                            <Mail size={20} color="#64748b" style={{ marginRight: '10px' }} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '1rem', color: '#1e293b' }}
                            />
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                            <Lock size={20} color="#64748b" style={{ marginRight: '10px' }} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '1rem', color: '#1e293b' }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{
                            background: '#2563eb',
                            color: 'white',
                            padding: '14px',
                            borderRadius: '8px',
                            border: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '10px',
                            transition: 'background 0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#1d4ed8'}
                        onMouseOut={(e) => e.currentTarget.style.background = '#2563eb'}
                    >
                        Sign Up <ArrowRight size={18} />
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
                    Already have an account?
                    <span
                        onClick={onSwitchToLogin}
                        style={{ color: '#2563eb', fontWeight: '600', cursor: 'pointer', marginLeft: '5px' }}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
