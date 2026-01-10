import React from 'react';
import { ExternalLink, PlayCircle, Map } from 'lucide-react';

const JobDetails = ({ job, onBack }) => {
    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <button
                onClick={onBack}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    marginBottom: '20px',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                &larr; Back to Jobs
            </button>

            <div className="glass-panel" style={{ padding: '40px', marginBottom: '30px' }}>
                <h1 style={{ textAlign: 'left', marginBottom: '10px' }}>{job.title}</h1>
                <p style={{ fontSize: '1.2rem', color: '#475569' }}>{job.description}</p>
            </div>

            <div style={{ display: 'grid', gap: '30px' }}>

                {/* Roadmap Section */}
                <div className="glass-panel" style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Map size={24} color="#2563eb" />
                        <h2>Career Roadmap</h2>
                    </div>

                    <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid rgba(37, 99, 235, 0.2)' }}>
                        {job.roadmap && job.roadmap.map((step, index) => (
                            <div key={index} style={{ marginBottom: '24px', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '-26px',
                                    top: '0',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#2563eb',
                                    boxShadow: '0 0 10px rgba(37, 99, 235, 0.5)'
                                }}></div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Step {index + 1}</h3>
                                <p>{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resources Section */}
                <div className="glass-panel" style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <PlayCircle size={24} color="#db2777" />
                        <h2>Best Resources (YouTube)</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                        {job.resources && job.resources.map((res, index) => (
                            <a
                                key={index}
                                href={res.link}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '16px',
                                    background: 'rgba(255,255,255,0.5)',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none',
                                    color: '#334155'
                                }}
                                className="resource-card"
                            >
                                <ExternalLink size={18} color="#2563eb" />
                                <span style={{ fontWeight: '600' }}>{res.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JobDetails;
