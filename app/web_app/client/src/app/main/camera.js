import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const COLORS = {
  softpurple: '#A285E1',
  lightWhite: '#F5F5F5',
  mainpurple:"#774967"

};

const VideoStreamDisplay = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const handleStart = () => {
    const newSocket = io('http://192.168.43.225:3002');
    setSocket(newSocket);
    setIsStreaming(true);

    newSocket.on('connect', () => {
      console.log('Socket.IO connection established');
    });

    newSocket.on('video_frame', (data) => {
      setImageSrc(`data:image/jpeg;base64,${data.data}`);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });
  };

  const handleStop = () => {
    if (socket) {
      socket.disconnect();
      setIsStreaming(false);
    }
  };

  return (
    <div style={styles.container}>
      {imageSrc && (
        <div style={styles.imageContainer}>
          <img src={imageSrc} style={styles.image} alt="Stream" />
        </div>
      )}
      {!imageSrc && <p>No stream available</p>}
      <div style={styles.buttons}>
        {!isStreaming && (
          <button style={styles.startStopBtn} onClick={handleStart}>
            Başla
          </button>
        )}
        {isStreaming && (
          <button style={styles.startStopBtn} onClick={handleStop}>
            Durdur
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  imageContainer: {
    position: 'relative',
    width: 640,
    height: 480,
    marginTop: 10,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  startStopBtn: {
    width: 100,
    backgroundColor: COLORS.mainpurple,
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    margin: '0 10px',
    color: COLORS.lightWhite,
    fontSize: 17,
    border: 'none',
    cursor: 'pointer',
  }
};

export default VideoStreamDisplay;
