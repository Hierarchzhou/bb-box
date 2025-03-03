'use client'; // 声明这是一个客户端组件

import { useState, useEffect, useRef } from 'react'; // 导入React钩子
import { Howl } from 'howler'; // 导入Howler音频库

/**
 * 音乐播放器组件
 * 提供背景音乐播放功能，具有黑客帝国风格的UI
 */
const MusicPlayer = () => {
  // 状态管理
  const [isPlaying, setIsPlaying] = useState(false); // 播放状态
  const [volume, setVolume] = useState(0.5); // 音量，默认50%
  const [audioError, setAudioError] = useState(false); // 音频加载错误状态
  
  // 使用useRef保存Howl实例，避免重复创建
  const soundRef = useRef<Howl | null>(null);
  
  // 初始化音频
  useEffect(() => {
    try {
      // 创建Howl实例
      soundRef.current = new Howl({
        src: ['/music/matrix-theme.mp3'], // 音乐文件路径，需要在public/music目录下放置
        loop: true, // 循环播放
        volume: volume, // 设置音量
        html5: true, // 使用HTML5 Audio
        onloaderror: () => {
          console.error('音频文件加载失败');
          setAudioError(true);
        }
      });
    } catch (error) {
      console.error('初始化音频播放器失败:', error);
      setAudioError(true);
    }
    
    // 组件卸载时停止播放
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
    };
  }, []); // 空依赖数组，只在组件挂载时执行一次
  
  // 监听音量变化
  useEffect(() => {
    if (soundRef.current && !audioError) {
      soundRef.current.volume(volume);
    }
  }, [volume, audioError]);
  
  // 切换播放/暂停
  const togglePlay = () => {
    if (!soundRef.current || audioError) return;
    
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // 调整音量
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  
  // 如果音频加载失败，显示错误信息
  if (audioError) {
    return (
      <div className="fixed bottom-4 right-4 z-50 matrix-card p-3">
        <p className="text-sm text-matrix-green">
          背景音乐无法加载。请确保音乐文件存在于 public/music 目录中。
        </p>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 matrix-card p-3 flex flex-col items-center">
      <h3 className="text-matrix-green mb-2 flicker">背景音乐</h3>
      
      <div className="flex items-center space-x-2">
        {/* 播放/暂停按钮 */}
        <button 
          onClick={togglePlay}
          className="matrix-button w-20"
        >
          {isPlaying ? '暂停' : '播放'}
        </button>
        
        {/* 音量控制 */}
        <div className="flex items-center">
          <span className="mr-2 text-sm">音量</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-matrix-green"
          />
        </div>
      </div>
      
      {/* 播放状态指示器 */}
      {isPlaying && (
        <div className="mt-2 flex space-x-1">
          <div className="w-1 h-3 bg-matrix-green animate-pulse"></div>
          <div className="w-1 h-3 bg-matrix-green animate-pulse delay-75"></div>
          <div className="w-1 h-3 bg-matrix-green animate-pulse delay-150"></div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer; // 导出组件 