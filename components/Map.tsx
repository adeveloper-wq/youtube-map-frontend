import * as React from 'react'
import { useMemo } from 'react';
import axios from 'axios'

import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl'
import { Channel, Video } from '../interfaces'
import Pin from '../components/pin';
import { Location } from '../interfaces/index';

type Props = {
    mapboxKey?: string,
    className?: string
}

type State = {
    videos?: Array<Video>
}

class MapComponent extends React.Component<Props, State> {
    state: State = {
        videos: []
    };

    async componentDidMount() {
        axios.get<Channel[]>('http://localhost:4000/get-all')
            .then(response => {
                this.setState({
                    videos: response.data[0].videos
                })
            });
    }

    render() {
        return (<div className={this.props.className}>
            <Map
                initialViewState={{
                    longitude: -100,
                    latitude: 40,
                    zoom: 3.5
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxAccessToken={this.props.mapboxKey}
            >
                <GeolocateControl position="top-right" />
                <FullscreenControl position="top-right" />
                <NavigationControl position="top-right" />
                <ScaleControl />

                {
                    this.state.videos.map((video, index) => {

                        if (!isNaN(Number(video.video_location.longitude)) || !isNaN(Number(video.video_location.latitude))) {
                            return <Marker
                                key={`marker-${index}`}
                                longitude={Number(video.video_location.longitude) }
                                latitude={Number(video.video_location.latitude) }
                                anchor="bottom"
                            >
                                <Pin />
                            </Marker>
                        }
                    }


                    )
                }
            </Map>
        </div>);
    }
}

export default MapComponent