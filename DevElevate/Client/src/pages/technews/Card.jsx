import React, { Component } from "react";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  render() {
    let { title, description, image_url, link, date, category } = this.props;
    const { isHovered } = this.state;
    
    return (
      <div>
        <div 
          className="card" 
          style={{
            width: "20rem",
            height: "420px",
            margin: "1.5rem",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            overflow: "hidden",
            background: isHovered 
              ? "linear-gradient(135deg, #e0f7fa 0%, #dbeafe 50%, #bfdbfe 100%)"
              : "linear-gradient(135deg, #e0f7fa 0%, #dbeafe 50%, #bfdbfe 100%)",
            border: "1px solid #e0f2fe",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            transform: isHovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)",
            boxShadow: isHovered 
              ? "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(99, 102, 241, 0.1)" 
              : "0 4px 12px rgba(0,0,0,0.08)",
            cursor: "pointer",
            position: "relative"
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          
          {/* Subtle gradient overlay */}
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isHovered 
                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.08) 100%)"
                : "linear-gradient(135deg, rgba(59, 130, 246, 0.02) 0%, rgba(147, 197, 253, 0.04) 100%)",
              opacity: 1,
              transition: "background 0.3s ease",
              pointerEvents: "none",
              borderRadius: "16px"
            }}
          />
          
          <div 
            style={{
              height: "200px",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <img 
              src={image_url ? image_url : "https://via.placeholder.com/320x200?text=No+Image"} 
              className="card-img-top"
              alt={title || "News image"}
              style={{ 
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
                transform: isHovered ? "scale(1.08)" : "scale(1)"
              }} 
            />
            
            {/* Image overlay gradient */}
            <div 
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60px",
                background: "linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 100%)",
                opacity: isHovered ? 0.7 : 0,
                transition: "opacity 0.3s ease"
              }}
            />
          </div>
          
          <div 
            className="card-body" 
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "1.5rem 1.25rem 1.25rem",
              position: "relative",
              zIndex: 1
            }}
          >
            {category && (
              <span 
                style={{
                  background: isHovered 
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "white",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  alignSelf: "flex-start",
                  marginBottom: "1rem",
                  textTransform: "capitalize",
                  letterSpacing: "0.025em",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)"
                }}
              >
                {category}
              </span>
            )}
            
            <div style={{ marginBottom: "auto" }}>
              <h5 
                className="card-title"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  lineHeight: "1.3",
                  marginBottom: "0.75rem",
                  height: "2.6em",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  transition: "color 0.3s ease",
                  color: isHovered ? "#1e40af" : "#1f2937",
                  letterSpacing: "-0.01em"
                }}
              >
                {title ? title.slice(0, 50) : "No title available"}
              </h5>
              
              <p 
                className="card-text"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  height: "4.5em",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  marginBottom: "1rem",
                  color: "#6b7280",
                  transition: "color 0.3s ease"
                }}
              >
                {description ? description.slice(0, 80) : "No description available"}...
              </p>
              
              {date && (
                <small 
                  className="text-muted"
                  style={{
                    fontSize: "0.75rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    color: "#9ca3af",
                    fontWeight: "500"
                  }}
                >
                  <span style={{ 
                    marginRight: "0.5rem",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "#d1d5db"
                  }}></span>
                  {date}
                </small>
              )}
            </div>
            
            <a 
              href={link} 
              className="btn btn-primary"
              style={{
                marginTop: "auto",
                alignSelf: "flex-start",
                padding: "0.65rem 1.5rem",
                borderRadius: "10px",
                fontSize: "0.875rem",
                fontWeight: "600",
                textDecoration: "none",
                border: "none",
                background: isHovered 
                  ? "linear-gradient(135deg, #1e40af 0%, #3730a3 100%)"
                  : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                color: "white",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isHovered 
                  ? "0 8px 20px rgba(59, 130, 246, 0.4)" 
                  : "0 4px 12px rgba(59, 130, 246, 0.25)",
                letterSpacing: "0.025em"
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}