import LibraryLoader from 'react-js-loader';
import './loader.css';

function Loader({ size = '70' }: { size?: string }) {
  return (
    <div className="loader-container">
      <LibraryLoader type="spinner-default" bgColor="#4481C3" size={size} />
    </div>
  );
}

export default Loader;
