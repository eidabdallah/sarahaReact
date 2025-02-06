import logo from '../../assets/logo/logo.png';

export default function LoadingPage() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'linear-gradient(to right, #0b334e, #22cdf4)', position: 'relative' }}>
      <div className="d-flex justify-content-center align-items-center flex-column" style={{ padding: '30px', borderRadius: '12px', position: 'relative' }}>
        <div className="d-flex justify-content-center align-items-center" style={{ animation: 'spin 2s linear infinite' }}>
          <img src={logo} alt="Loading" style={{ width: '300px', height: '300px', borderRadius: '50%' }} />
        </div>
        <div className="mt-3" style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.4)' }}>
          انتظر لحظة...
        </div>
      </div>
    </div>
  );
}
