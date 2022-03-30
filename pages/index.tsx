import Layout from '../components/Layout'
import MapComponent from '../components/Map'
import axios from 'axios'
import { Channel } from '../interfaces';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const IndexPage = () => {
  const [channels, setChannels] = useState<Array<Channel>>(undefined);

  let mapboxKey = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    toast.promise(axios.get<Channel[]>('http://localhost:4000/')
      .then(response => {
        let channels = response.data;
        channels.sort((a, b) => a.channel_name.localeCompare(b.channel_name));
        channels.map(function(channel) {
          const date: Date = new Date(parseInt(channel.last_updated.$date.$numberLong, 10));
          channel.last_updated = date;
          let video_with_location_count = 0;
          for (const video of channel.channel_videos){
            if (!isNaN(Number(video.video_location.longitude)) && !isNaN(Number(video.video_location.latitude))) {
              video_with_location_count = video_with_location_count + 1;
            }
          }
          channel.videos_with_locations_count = video_with_location_count;
          return channel;
        })
        setChannels(channels);
      })
      , {
        pending: '\xa0Loading channels',
        success: '\xa0Finished loading the channels👌',
        error: '\xa0Failed loading the channels 🤯'
      })
  }, [])

  return <Layout title="All added channels + videos" channels={channels}>
    <MapComponent className="h-full rounded" mapboxKey={mapboxKey} channels={channels} />
  </Layout>
}

export default IndexPage
