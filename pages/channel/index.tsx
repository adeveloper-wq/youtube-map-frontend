import Layout from '../../components/Layout'
import MapComponent from '../../components/Map'
import axios from 'axios'
import { Channel } from '../../interfaces';
import React, { useState, useEffect } from 'react';

const ChannelsIndexPage = () => {
  const [channels, setChannels] = useState<Array<Channel>>(undefined);

  let mapboxKey = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN;


  useEffect(() => {
    async function getChannels() {
      axios.get<Channel[]>('http://localhost:4000/channel')
        .then(response => {
          setChannels(response.data);
        });
    }
    getChannels();
  }, [])

  return <Layout title="Home | Next.js + TypeScript Example">
    <MapComponent className="h-full rounded" mapboxKey={mapboxKey} channels={channels} />
  </Layout>
}

export default ChannelsIndexPage
