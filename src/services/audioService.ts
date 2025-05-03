
// Simple audio service for meditation sessions
class AudioService {
  private audioElement: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private audioSource: MediaElementAudioSourceNode | null = null;
  
  constructor() {
    try {
      // We'll initialize AudioContext on demand to avoid autoplay policy issues
      this.audioContext = null;
      this.gainNode = null;
    } catch (error) {
      console.error("Web Audio API not supported:", error);
    }
  }

  initializeAudio(audioSrc: string): void {
    console.log("Initializing audio with source:", audioSrc);
    
    // Clean up any existing audio
    if (this.audioElement) {
      this.stopAudio();
      this.disconnectAudio();
    }
    
    try {
      // Create new audio element
      this.audioElement = new Audio(audioSrc);
      this.audioElement.preload = "auto"; // Preload audio
      this.audioElement.crossOrigin = "anonymous"; // Enable CORS for cross-origin requests
      
      // Create AudioContext on first initialization
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Create gain node if needed
      if (!this.gainNode && this.audioContext) {
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
      }
      
      // Connect audio element to Web Audio API
      if (this.audioContext && this.gainNode && this.audioElement) {
        this.audioSource = this.audioContext.createMediaElementSource(this.audioElement);
        this.audioSource.connect(this.gainNode);
        
        // Add error handling
        this.audioElement.onerror = (e) => {
          console.error("Audio element error:", e);
        };
      }
    } catch (error) {
      console.error("Error initializing audio:", error);
    }
  }

  disconnectAudio(): void {
    if (this.audioSource) {
      try {
        this.audioSource.disconnect();
        this.audioSource = null;
      } catch (error) {
        console.error("Error disconnecting audio source:", error);
      }
    }
  }

  playAudio(): void {
    if (!this.audioElement) {
      console.error("Cannot play: Audio element not initialized");
      return;
    }
    
    try {
      // Resume AudioContext if it was suspended (browser policy)
      if (this.audioContext?.state === 'suspended') {
        this.audioContext.resume();
      }
      
      // Play audio with catch for browser autoplay policy
      const playPromise = this.audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing audio (likely autoplay policy):", error);
          // We could show a UI message to the user here
        });
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }

  pauseAudio(): void {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
      } catch (error) {
        console.error("Error pausing audio:", error);
      }
    }
  }

  stopAudio(): void {
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch (error) {
        console.error("Error stopping audio:", error);
      }
    }
  }

  setVolume(volumeLevel: number): void {
    const volume = volumeLevel / 100; // Convert from 0-100 to 0-1
    
    try {
      if (this.gainNode) {
        this.gainNode.gain.value = volume;
      } else if (this.audioElement) {
        this.audioElement.volume = volume;
      }
    } catch (error) {
      console.error("Error setting volume:", error);
    }
  }

  setMuted(muted: boolean): void {
    if (this.audioElement) {
      try {
        this.audioElement.muted = muted;
      } catch (error) {
        console.error("Error setting muted state:", error);
      }
    }
  }

  getCurrentTime(): number {
    return this.audioElement?.currentTime || 0;
  }
}

// Singleton instance
export const audioService = new AudioService();
