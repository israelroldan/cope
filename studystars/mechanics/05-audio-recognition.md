# Audio Recognition (Listen and Identify)

> Audio plays. User selects correct identification from options.

## Core Mechanic

A prompt appears at the top of the screen (e.g., "Which instrument is playing?"). Below it is a large play button with a speaker icon. The learner taps the play button, and audio plays through the device's speaker or headphones. They listen actively and attempt to identify what they hear. Once the audio finishes (typically 3-10 seconds), answer options appear vertically below. The learner taps the option they believe matches the audio. Upon tapping, immediate feedback confirms correctness. A replay button is usually available, allowing the learner to listen again before answering (replay count may be limited for older learners to encourage careful listening).

The mechanic combines listening practice with identification. It's ideal for language learning (pronunciation, accent, word identification), music education (instrument identification, genre), and audio-focused content (animal sounds, environmental audio).

## Why It Works

Audio recognition engages auditory processing and listening discrimination—skills critical for language acquisition and music appreciation. The delay between hearing and answering forces working memory engagement: learners must hold the audio information in mind, process it, and match it to semantic categories. This processing depth supports stronger memory encoding than passive listening.

For language learners, audio recognition is particularly valuable because native speech is rapid and variable. By practicing identification from authentic audio, learners develop bottom-up processing skills (recognizing phonemes and words from sound) rather than relying solely on top-down processing (anticipating words from context).

The optional replay mechanic supports metacognitive awareness: learners who request replays signal uncertainty and engage in effortful listening, which strengthens encoding. Over time, learners can calibrate their confidence and reduce reliance on replays as automaticity increases.

## Content Generation Spec

The AI should generate listening prompts and identify matching audio. For language learning, AI can generate text and have text-to-speech synthesize audio (or source native speaker recordings). For music and sound recognition, AI can identify which audio files to use and design discriminating options.

The AI cannot generate audio directly but can:
1. Generate prompt text and option text
2. Suggest which audio asset (from a library) to use
3. Identify plausible distractors (e.g., if audio is "violin", distractors might be "cello", "viola", "harp")

Content shape:
- **prompt** (string): "What language is being spoken?" or "Which bird is calling?"
- **audioUrl** (string): Path to audio file (e.g., "/audio/bird-call-01.mp3").
- **options** (string[]): 2-4 answer choices, randomized for display.
  - "English", "French", "German", "Spanish"
  - "Mourning Dove", "American Robin", "Northern Cardinal", "Blue Jay"
- **correctIndex** (integer): Position of correct answer before randomization.
- **explanation** (string, optional): "This is a mourning dove's call—a soft, cooing 'coo-coo-coo' sound. It's named for its mournful tone and is common in North America."
- **difficulty** (enum): "easy" for distinct sounds; "hard" for subtle distinctions.

### Example Output

```json
{
  "prompt": "What instrument is playing?",
  "audioUrl": "https://example.com/audio/violin-01.mp3",
  "options": [
    "Violin",
    "Cello",
    "Viola",
    "Harp"
  ],
  "correctIndex": 0,
  "explanation": "This is a violin—a string instrument with a bright, soaring tone played with a bow. The cello is lower-pitched, the viola is between violin and cello, and the harp is a plucked string instrument with a different sound texture.",
  "difficulty": "medium",
  "tags": [
    "music-education",
    "instruments",
    "strings",
    "listening-skills"
  ]
}
```

## UX Considerations

- **Play button**: Large, centered, 64×64px minimum. Use a clear speaker icon or play symbol. Visual feedback (ripple animation) on tap.
- **Audio playback**: Clear audio quality, 128kbps or higher bitrate for clarity. Display waveform or playback progress bar if audio is longer than 5 seconds.
- **Replay mechanism**: Provide a replay button (or "Play Again" button) prominently. For younger learners, unlimited replays. For older learners, limit to 2-3 replays with a counter ("2 replays left").
- **Options layout**: Full-width buttons, stacked vertically, 48×48px minimum. Sufficient spacing between buttons (16px padding).
- **Timing**: Audio prompt before options appear. Options appear once audio finishes or user can skip by tapping "Next". Keep cycle time reasonable (audio + decision time = 15-30s total).
- **Accessibility**: Provide a transcript or transcription of audio for learners with hearing impairments. Offer closed captions or visual cues.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Simple, distinct sounds (e.g., animal calls, common instruments). 2-3 options only. Large 72×72px play button with high-contrast speaker icon. Unlimited replays. Audio 5-10 seconds to allow processing. Options labeled with icons where possible. No time pressure. |
| 11–13 | More varied sounds (e.g., similar instruments, accents in speech). 3 options. Standard 64×64px play button. Limited replays (3-5, with counter visible). Audio 3-7 seconds. Explanation includes distinguishing features. |
| 14–16 | Challenging, subtle distinctions (e.g., native vs. non-native accent, similar languages, musical style nuances). 3-4 options. Timed variant (15-20s per item, countdown visible). Single replay or none. Expert-level explanation. Optional waveform display for audio analysis. |

## Lesson Placement

**Warm-up**: 2-3 audio recognition items to activate listening and auditory memory (2-3 minutes total).

**Post-content**: After teaching pronunciation or introducing audio vocabulary (e.g., animal sounds in a biology class), audio recognition reinforces identification.

**Core practice**: In language and music contexts, audio recognition is often core practice—repeated exposure to native/authentic speech or music strengthens discrimination skills.

## Related Mechanics

- **Multiple Choice** (id: `multiple-choice`): Text-based version. Audio recognition is the auditory parallel.
- **Image Recognition** (id: `image-recognition`): Audio + image variant: learner hears audio prompt and selects from images.
- **Flashcard** (id: `flashcard`): Can include audio on front or back (e.g., pronunciation of a word shown in text).
