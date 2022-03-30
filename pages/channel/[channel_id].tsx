import Layout from '../../components/Layout'
import MapComponent from '../../components/Map'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Channel } from '../../interfaces';
import { toast } from 'react-toastify';

const ChannelsPage = (props) => {
  let mapboxKey = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN;
  const [channel, setChannel] = useState<Channel>(undefined);


  useEffect(() => {
    async function getChannelData() {
      let channel_data: Channel = undefined;
      await toast.promise(axios.get<Channel>('http://localhost:4000/channel/' + props.channel_id)
        .then(response => {
          channel_data = response.data
        })
        , {
          pending: '\xa0Loading',
          success: '\xa0Finished loading👌',
          error: '\xa0Failed loading🤯'
        })

      if (channel_data.channel_name === undefined) {
        toast.info('🦄 Channel is not in the map-database yet!', {
          position: "bottom-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        await toast.promise(axios.post<Channel>('http://localhost:4000/channel',
          {
            channel_url: "https://www.youtube.com/channel/" + props.channel_id
          })
          .then(response => {
            channel_data = response.data
          })
          , {
            pending: '\xa0Crawling the channel data from youtube.com',
            success: '\xa0Finished crawling👌',
            error: '\xa0Failed crawling🤯'
          })

        toast.info('🦄 The channel data has been crawled! The backend is now looking for the location data of the most recent videos. Come back in a few minutes (same url as now) to see the videos on the map. Its faster if the location feature of Youtube is used. Otherwise the backend tries to get the locations from the titles of the videos.', {
          position: "bottom-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      } else {
        toast.success('🦄 Channel with the gathered location data is already in the database!', {
          position: "bottom-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      const date: Date = new Date(parseInt(channel_data.last_updated.$date.$numberLong, 10));
      channel_data.last_updated = date;
      let video_with_location_count = 0;
      for (const video of channel_data.channel_videos) {
        if (!isNaN(Number(video.video_location.longitude)) && !isNaN(Number(video.video_location.latitude))) {
          video_with_location_count = video_with_location_count + 1;
        }
      }
      channel_data.videos_with_locations_count = video_with_location_count;
      setChannel(channel_data)
    }
    getChannelData()
  }, [])

  return <Layout channel={channel} title={channel !== undefined ? "Youtube Map: " + channel.channel_name : "Loading"}>
    <MapComponent className="h-full rounded" mapboxKey={mapboxKey} channel={channel} />

  </Layout>
}

export default ChannelsPage

export async function getServerSideProps(content) {
  return { props: { channel_id: content.query.channel_id } }
}