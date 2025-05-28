import React from 'react'
import { FaPaintBrush } from 'react-icons/fa';
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import StatCard from "../../../components/Admin/StatCard.jsx";

const ArtworkInsights = ({data}) => {

    if (!data) {
        return <ErrorMessage />;
      }

    return (
        <div className="mb-8">
        <StatCard
          title="Total Artworks"
          value={data?.length || 0}
          icon={<FaPaintBrush className="text-yellow-500" />}
        />
      </div>
    )
}

export default ArtworkInsights
