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
