import './App.css';
import PokeMap from './features/map/Map';
// import the boostrap css
import 'bootstrap/dist/css/bootstrap.min.css';
// import the boostrap js
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'mapbox-gl/dist/mapbox-gl.css';



function App() {
    return (
        <div>
            <PokeMap />
        </div>
    );
}

export default App;
