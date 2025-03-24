import React from 'react'
import Card from '../components/Card'
import Error from '@/components/Error';
import { FaPaintBrush } from 'react-icons/fa';

const ArtworkInsights = ({data}) => {

    if (!data) {
        return <Error />;
      }

    return (
        <div className="mb-8">
        <Card
          title="Total Artworks"
          value={data?.length || 0}
          icon={<FaPaintBrush className="text-yellow-500" />}
        />
      </div>
    )
}

export default ArtworkInsights
