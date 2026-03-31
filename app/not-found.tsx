export default function NotFound() {
  return (
    <div className="page" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80vh",gap:"1.5rem",textAlign:"center",padding:"2rem"}}>
      <div style={{fontFamily:"var(--font-serif)",fontSize:"clamp(4rem,12vw,8rem)",fontWeight:300,color:"var(--brown-light)",lineHeight:1}}>404</div>
      <h1 style={{fontFamily:"var(--font-serif)",fontSize:"1.5rem",fontWeight:300}}>Pagina non trovata</h1>
      <p style={{color:"var(--muted)"}}>La pagina che stai cercando non esiste.</p>
      <a href="/" className="btn btn-dark">Torna alla home</a>
    </div>
  );
}
