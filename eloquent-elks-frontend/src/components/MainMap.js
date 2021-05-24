import {Box} from "grommet";
import {MapContainer, Marker, TileLayer, Tooltip, GeoJSON, useMapEvents} from "react-leaflet";
import {airbnbLeafletIcon} from "./icons/airbnbLeafletIcon";
import {attractionLeafletIcon} from "./icons/attractionLeafletIcon";
import {getPois} from "../requests/getPois";
import {useEffect, useState} from "react";
import {airbnbGlowLeafletIcon} from "./icons/airbnbLeafletIconGlow";
import {famousLeafletIcon} from "./icons/famousLeafletIcon";
import {getFamous} from "../requests/getFamous";


const createMapBounds = map => {
    let mapBounds = map.getBounds()
    return {
        north: mapBounds._northEast.lat,
        east: mapBounds._northEast.lng,
        south: mapBounds._southWest.lat,
        west: mapBounds._southWest.lng
    }
}


const ZoomListener = props => {
    const map = useMapEvents({
        zoomend() {
            props.setMapBounds(createMapBounds(map))
        },
        dragend() {
            props.setMapBounds(createMapBounds(map))
        }
    })
    return null
}


export const MainMap = props => {
    const [map, setMap] = useState()
    const [famous, setFamous] = useState([])

    useEffect(() => {
        async function fetchData() {
            let ab = await getFamous()
            return ab;
        }

        fetchData().then((data) => setFamous(data))
    }, [])


    const getFlyToZoom = () => {
        if (map.getZoom() < 15) {
            return 15
        }
        return map.getZoom()
    }


    const getColor = (d) => {
        // Color palette from https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3
        let palette = ['#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d']
        // let palette = ['#011AFA','#00E596','#FFEB1C','#FF7700','#FF0000']
        let i
        for (i = 1; i <= palette.length; i++) {
            // values of the property are between 0 and 1
            if (d <= i * (1.0 / palette.length)) {
                return palette[i - 1]
            }
        }
    };

    const geoJsonStyle = (feature) => {
        return {
            stroke: false,
            // the fillColor is adapted depending on the poiCount
            fillColor: getColor(feature.properties.poiCount),
            fillOpacity: 0.6
        };
    };


    const handleAirBnBClick = async (event, airbnb) => {
        const {lat, lng} = event.latlng
        let pois = await getPois(lat, lng)
        props.setPois(pois)
        props.setShowInformation(true)
        props.setCurrentAirBnB(airbnb)
        map.flyTo(event.latlng, getFlyToZoom())
        props.setShowAirBnBs(false)
    }


    const onMapCreation = map => {
        setMap(map)
    }

    return (
        <Box fill>
            <MapContainer center={[40.73, -73.98]}
                          zoom={13}
                          scrollWheelZoom={true}
                          style={{height: '100%', zIndex: 0}}
                          whenCreated={map => onMapCreation(map)}
            >
                <ZoomListener setMapBounds={props.setMapBounds}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    subdomains='abcd'
                    maxZoom={19}
                />
                {props.recommendation ? <GeoJSON key={new Date().getTime().toString()} data={props.recommendation}
                                                 style={geoJsonStyle}/> : null}
                {props.showAirBnBs ? props.airbnbs.map && props.airbnbs.map((airbnb, index) => {
                        return (
                            <Marker key={index}
                                    position={[airbnb.latitude, airbnb.longitude]}
                                    eventHandlers={{
                                        click: (event) => {
                                            handleAirBnBClick(event, airbnb)
                                        }
                                    }}
                                    icon={airbnbLeafletIcon}
                            />
                        )
                    }
                ) : null
                }
                {props.pois.map && props.pois.map((poi, index) => {
                        return (
                            <Marker key={"POI" + index}
                                    position={[poi.latitude, poi.longitude]}
                                    icon={attractionLeafletIcon}
                            >
                                <Tooltip>
                                    {poi.type}
                                </Tooltip>
                            </Marker>
                        )
                    }
                )
                }
                {famous.map && famous.map((famous, index) => {
                        return (
                            <Marker key={"Famous" + index}
                                    position={[famous.latitude, famous.longitude]}
                                    icon={famousLeafletIcon}
                            >
                                <Tooltip>
                                    {famous.name}
                                </Tooltip>
                            </Marker>
                        )
                    }
                )
                }
                {props.showAirBnBs ? null :
                    <Marker key={"currentAirBnB"}
                            position={[props.currentAirBnB.latitude, props.currentAirBnB.longitude]}
                            eventHandlers={{
                                click: (event) => {
                                    handleAirBnBClick(event, props.currentAirBnB)
                                }
                            }}
                            icon={airbnbGlowLeafletIcon}
                            zIndexOffset={50}
                    />
                }
            </MapContainer>
        </Box>
    )
}
