import * as React from 'react'
import { useMemo } from 'react';


import Map, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
    Popup
} from 'react-map-gl'
import { Channel, Video } from '../interfaces'
import Pin from '../components/pin'
import ControlPanel from '../components/ControlPanel'

type Props = {
    mapboxKey?: string,
    className?: string,
    channel?: Channel,
    channels?: Array<Channel>,
}

type State = {
    popupVideo?: Video,
    popupChannel?: Channel
}

class MapComponent extends React.Component<Props, State> {
    state: State = {
        popup: null
    };

    /* async componentDidMount() {
        axios.get<Channel[]>('http://localhost:4000/channel')
            .then(response => {
                this.setState({
                    channels: response.data,
                    videos: response.data[0].videos
                })
            });
    } */

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

                {this.props.channels && this.props.channels !== undefined && this.props.channels.length > 0 &&
                    this.props.channels.map((channel, channelIndex) => {
                        return channel.videos.map((video, index) => {
                            if (!isNaN(Number(video.video_location.longitude)) || !isNaN(Number(video.video_location.latitude))) {
                                return <Marker
                                    key={`marker-${channelIndex + "-" + index}`}
                                    longitude={Number(video.video_location.longitude)}
                                    latitude={Number(video.video_location.latitude)}
                                    anchor="bottom"
                                >
                                    <Pin color={channel.map_marker_hex_color} onClick={() => this.setState({
                                        popupVideo: video,
                                        popupChannel: channel
                                    })} />
                                </Marker>
                            }
                        }
                        )
                    })}

                {this.props.channel && this.props.channel !== undefined && this.props.channel.videos !== undefined && this.props.channel.videos.map((video, videoIndex) => {

                    if (!isNaN(Number(video.video_location.longitude)) || !isNaN(Number(video.video_location.latitude))) {
                        return <Marker
                            key={`marker-${videoIndex}`}
                            longitude={Number(video.video_location.longitude)}
                            latitude={Number(video.video_location.latitude)}
                            anchor="bottom"
                        >
                            <Pin color={this.props.channel.map_marker_hex_color} onClick={() => this.setState({
                                popupVideo: video,
                                popupChannel: this.props.channel
                            })} />
                        </Marker>
                    }

                })}

                {this.state.popupVideo && this.state.popupChannel && (
                    <Popup
                        anchor="top"
                        longitude={Number(this.state.popupVideo.video_location.longitude)}
                        latitude={Number(this.state.popupVideo.video_location.latitude)}
                        closeOnClick={false}
                        onClose={() => this.setState({
                            popupVideo: null,
                            popupChannel: null
                        })}
                    >
                        <div>
                            {this.state.popupVideo.video_titel} by {this.state.popupChannel.channel_name} |{' '}
                            {/* <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a> */}
                        </div>
                        {/* <img width="100%" src={popupInfo.image} /> */}
                    </Popup>
                )}
            </Map>
        </div>);
    }
}

export default MapComponent