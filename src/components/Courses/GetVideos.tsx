'use client'

import React from 'react'

type videosUri = {
    videoUri: string
}

const GetVideos = ({ videoUri }: videosUri) => {
    return (
        <video width="50%" height="auto" style={{ marginBottom: 30 }} controls>
            <source src={videoUri} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

export default GetVideos