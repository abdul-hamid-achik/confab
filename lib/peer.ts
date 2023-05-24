import { EventEmitter } from 'events';
import { RTCIceCandidate, RTCPeerConnection } from 'werift';

/**
 * The `Peer` class represents a WebRTC peer.
 * It wraps the `RTCPeerConnection` API and provides a simpler, event-based API for managing a WebRTC connection.
 */
class Peer extends EventEmitter {
  private pc: RTCPeerConnection;

  /**
   * Creates a new `Peer` instance.
   */
  constructor() {
    super();

    // Create a new RTCPeerConnection instance
    this.pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // When we get an ICE candidate, emit a 'signal' event
    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.emit('signal', { type: 'candidate', candidate: event.candidate });
      }
    };

    // When we get a new RTCSessionDescription, emit a 'signal' event
    this.pc.onnegotiationneeded = async () => {
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);
      this.emit('signal', { type: 'sdp', sdp: this.pc.localDescription });
    };
  }

  /**
   * Signal the peer with the given data.
   * @param {Object} data - The signal data.
   * @param {string} data.type - The type of the signal data ('candidate' or 'sdp').
   * @param {RTCIceCandidateInit | RTCSessionDescriptionInit} data.candidate - The ICE candidate data (only for 'candidate' type).
   * @param {RTCSessionDescriptionInit} data.sdp - The session description data (only for 'sdp' type).
   */
  async signal(data: { type: string, candidate?: RTCIceCandidateInit, sdp?: RTCSessionDescriptionInit }) {
    if (data.type === 'candidate') {
      this.pc.addIceCandidate(new RTCIceCandidate(data.candidate as RTCIceCandidate));
    } else if (data.type === 'sdp') {
      if (data.sdp) {
        const sdp = data.sdp.sdp as string; // Extract the sdp string from the RTCSessionDescriptionInit object
        await this.pc.setRemoteDescription({ type: 'offer', sdp });
      }
    }
  }

}

export { Peer };
