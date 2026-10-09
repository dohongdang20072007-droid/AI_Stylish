const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, '..', 'assets', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

function generateToneWav(frequency, durationSec) {
  const sampleRate = 22050;
  const numSamples = Math.floor(sampleRate * durationSec);
  const blockAlign = 2;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34);

  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const wave = Math.sin(2 * Math.PI * frequency * t) * 0.5 +
                 Math.sin(2 * Math.PI * (frequency * 1.5) * t) * 0.25;
    const edge = 0.05 * sampleRate;
    let env = 1.0;
    if (i < edge) env = i / edge;
    else if (i > numSamples - edge) env = (numSamples - i) / edge;

    const sample = Math.max(-1, Math.min(1, wave * env * 0.45));
    buffer.writeInt16LE(Math.floor(sample * 32767), 44 + i * 2);
  }

  return buffer;
}

fs.writeFileSync(path.join(audioDir, 'audio_cungdinh.mp3'), generateToneWav(432, 2.5));
fs.writeFileSync(path.join(audioDir, 'audio_dangian.mp3'), generateToneWav(360, 3.0));
fs.writeFileSync(path.join(audioDir, 'audio_cyberpunk.mp3'), generateToneWav(110, 2.0));

console.log('Audio files created in assets/audio/');
