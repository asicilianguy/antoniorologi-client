export default function Loading() {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"80vh"}}>
      <div style={{width:40,height:40,border:"2px solid var(--cream-dark)",borderTop:"2px solid var(--brown)",borderRadius:"50%",animation:"spin 0.8s linear infinite"}} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
