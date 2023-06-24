import Map from 'react-map-gl';
import Search from '../search/Search';
import Table from '../table/Table';


const PokeMap = () => {
    const REACT_APP_MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>

            <Map
                initialViewState={{
                    longitude: -105.07847995573728,
                    latitude: 40.575056307075876,
                    zoom: 14
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 1 // Set a higher value for z-index to overlay the search bar on top
                }}
            >
                <Search />
            </div>

            <div className="flex flex-row justify-between m-5">
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        zIndex: 0
                    }}
                >
                    <Table />
                </div>
            </div>
        </div>
    );
};

export default PokeMap;