const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "1.5rem",
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "white",
        backdropFilter: "blur(6px)",
        borderTop: "1px solid rgba(255,255,255,0.2)",
        marginTop: "auto",        
        zIndex: 2
      }}
    >
      <p style={{ margin: 0, fontSize: "15px" }}>
        © 2025 Cake Gallery — All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
