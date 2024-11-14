import React from "react";

const Card = ({ img, title, description, children, style, onHoverStyle }) => {
  return (
    <div
      className="card"
      style={{
        ...style,
        border: '1px solid #ddd',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        ':hover': onHoverStyle
      }}
    >
      <img
        src={img}
        alt={title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          transition: 'transform 0.3s ease'
        }}
      />
      <div
        style={{
          padding: '20px',
          background: '#fff',
          textAlign: 'center'
        }}
      >
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '10px',
          color: '#333'
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '15px'
        }}>
          {description}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
