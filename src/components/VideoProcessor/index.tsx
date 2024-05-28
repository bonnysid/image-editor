import React, { useRef, useState } from 'react';
import axios from 'axios';

const VideoProcessor: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setVideoUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const processVideo = async (processType: string) => {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('video', file);
            formData.append('processType', processType);

            const response = await axios.post('http://localhost:5000/process', formData);

            const videoUrl = response.data.video_url;
            setVideoUrl(videoUrl);
        }
    };

    return (
        <div>
            <input type="file" ref={fileInputRef} onChange={handleVideoUpload} />
            {videoUrl && (
                <a href={videoUrl} download>
                    <button>Download Processed Video</button>
                </a>
            )}
            <button onClick={() => processVideo('background_subtraction')}>Background Subtraction</button>
            <button onClick={() => processVideo('blur_moving_objects')}>Blur Moving Objects</button>
        </div>
    );
};

export default VideoProcessor;