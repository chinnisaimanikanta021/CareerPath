import React from 'react';

const CardGrid = ({ title, items, onSelect, itemKey = "id" }) => {
    return (
        <div className="container">
            <h1>{title}</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                padding: '20px 0'
            }}>
                {items.map((item) => (
                    <div
                        key={item[itemKey]}
                        className="glass-panel"
                        onClick={() => onSelect(item)}
                        style={{ padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '12px' }}
                    >
                        <h3>{item.title}</h3>
                        {item.type && <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.type} in {item.eduTitle}</span>}
                        {item.description && <p style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>}
                        <div style={{ marginTop: 'auto', paddingTop: '16px', color: '#2563eb', fontSize: '0.9rem', fontWeight: '600' }}>
                            Explore &rarr;
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardGrid;
