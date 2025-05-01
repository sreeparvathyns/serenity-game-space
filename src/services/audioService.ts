
// Simple audio service for meditation sessions
class AudioService {
  private audioElement: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  
  constructor() {
    try {
      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
    } catch (error) {
      console.error("Web Audio API not supported:", error);
    }
  }

  initializeAudio(audioSrc: string): void {
    if (this.audioElement) {
      this.stopAudio();
    }
    
    this.audioElement = new Audio(audioSrc);
    
    if (this.audioContext && this.gainNode) {
      const source = this.audioContext.createMediaElementSource(this.audioElement);
      source.connect(this.gainNode);
    }
  }

  playAudio(): void {
    if (this.audioElement) {
      // Resume AudioContext if it was suspended (browser policy)
      if (this.audioContext?.state === 'suspended') {
        this.audioContext.resume();
      }
      
      this.audioElement.play()
        .catch(error => console.error("Error playing audio:", error));
    }
  }

  pauseAudio(): void {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  stopAudio(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }

  setVolume(volumeLevel: number): void {
    const volume = volumeLevel / 100; // Convert from 0-100 to 0-1
    
    if (this.gainNode) {
      this.gainNode.gain.value = volume;
    } else if (this.audioElement) {
      this.audioElement.volume = volume;
    }
  }

  setMuted(muted: boolean): void {
    if (this.audioElement) {
      this.audioElement.muted = muted;
    }
  }

  getCurrentTime(): number {
    return this.audioElement?.currentTime || 0;
  }
}

// Singleton instance
export const audioService = new AudioService();
