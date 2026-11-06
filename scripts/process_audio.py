import subprocess
import os

SRC_MP3 = r"C:\Users\shrir\.gemini\antigravity\brain\a47817ad-990e-4c19-9ce6-81a8da8220bd\scratch\birthday_song_full.mp3"
OUT_DIR = r"C:\Users\shrir\.gemini\antigravity\scratch\mummas-little-universe\public\audio"

os.makedirs(OUT_DIR, exist_ok=True)

# 1. Crisp Mukhda & Emotional Blessing Hook (00:27.5 -> 01:34.0, ~66.5 seconds)
# "Happy Birthday to you... Dolyatun he aasu phulave, aayushya aamche labho tula he..."
out_mukhda = os.path.join(OUT_DIR, "marathi_birthday_mukhda.mp3")
cmd_mukhda = [
    "ffmpeg", "-y",
    "-ss", "27.5", "-t", "66.5",
    "-i", SRC_MP3,
    "-af", "afade=t=in:ss=0:d=0.6,afade=t=out:st=64.0:d=2.5",
    "-b:a", "192k",
    out_mukhda
]
print("Generating Mukhda clip...")
subprocess.run(cmd_mukhda, check=True)

# 2. Crisp Celebration Climax & Festive Trumpets (03:54.5 -> 04:39.5, ~45.0 seconds)
# High energy chorus & applause
out_climax = os.path.join(OUT_DIR, "marathi_birthday_climax.mp3")
cmd_climax = [
    "ffmpeg", "-y",
    "-ss", "234.5", "-t", "45.0",
    "-i", SRC_MP3,
    "-af", "afade=t=in:ss=0:d=0.5,afade=t=out:st=42.5:d=2.5",
    "-b:a", "192k",
    out_climax
]
print("Generating Climax clip...")
subprocess.run(cmd_climax, check=True)

# 3. Full Song (Complete 5-minute Marathi Classic from Rangat Sangat)
out_full = os.path.join(OUT_DIR, "marathi_birthday_full.mp3")
cmd_full = [
    "ffmpeg", "-y",
    "-to", "303.5",
    "-i", SRC_MP3,
    "-af", "afade=t=out:st=300.0:d=3.5",
    "-b:a", "192k",
    out_full
]
print("Generating Full song...")
subprocess.run(cmd_full, check=True)

print("All audio files successfully generated in public/audio!")
for f in os.listdir(OUT_DIR):
    p = os.path.join(OUT_DIR, f)
    print(f" - {f}: {os.path.getsize(p) / 1024:.1f} KB")
