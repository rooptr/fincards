param(
  [ValidateRange(1, 51)] [int]$StartLesson = 1,
  [ValidateRange(1, 51)] [int]$EndLesson = 51,
  [switch]$SkipEpisodes,
  [switch]$SkipLessons
)

$ErrorActionPreference = 'Stop'
if ($EndLesson -lt $StartLesson) { throw 'EndLesson must be greater than or equal to StartLesson.' }

$scriptPack = 'scratch/securitisation_masterclass_audio_scripts_v7.json'
$episodePack = 'scratch/securitisation_masterclass_multivoice_episode_scripts_v4.json'
$episodes = 1..13
$allLessons = (Get-Content -Raw $scriptPack | ConvertFrom-Json).lessons
$lessons = @($allLessons | Select-Object -Skip ($StartLesson - 1) -First ($EndLesson - $StartLesson + 1))
$env:DEEP_DIVE_SCRIPT_PACK_FILE = $scriptPack
$env:DEEP_DIVE_CHUNK_SIZE = '3000'
$env:AZURE_SPEECH_VOICE = 'en-IN-Diya:DragonHDLatestNeural'

if (-not $SkipLessons) {
  foreach ($lesson in $lessons) {
    $lessonNumber = [array]::IndexOf($allLessons, $lesson) + 1
    $env:DEEP_DIVE_LESSON_ID = $lesson.lessonId
    $env:DEEP_DIVE_SCRIPT_LESSON_ID = $lesson.lessonId
    $env:DEEP_DIVE_CHAPTER_ID = "lesson-$($lessonNumber.ToString('00'))-human"
    Write-Output "Rendering lesson $lessonNumber/51: $($lesson.lessonId)"
    node --env-file=.env.local scripts/generate-deep-dive-audio-azure.mjs
    if ($LASTEXITCODE -ne 0) { throw "Lesson $lessonNumber failed with exit code $LASTEXITCODE." }
  }
}

if ($SkipEpisodes) {
  Write-Output 'Selected lesson range completed successfully.'
  exit 0
}

Remove-Item Env:DEEP_DIVE_SCRIPT_PACK_FILE, Env:DEEP_DIVE_SCRIPT_LESSON_ID, Env:DEEP_DIVE_LESSON_ID, Env:DEEP_DIVE_CHAPTER_ID -ErrorAction SilentlyContinue
$env:MULTIVOICE_CHUNK_SIZE = '8000'
$env:MULTIVOICE_MAX_TURNS_PER_CHUNK = '40'
$env:MULTIVOICE_SCRIPT_FILE = $episodePack

foreach ($episode in $episodes) {
  $env:SECURITISATION_EPISODE = [string]$episode
  Write-Output "Rendering episode $episode/13"
  node --env-file=.env.local scripts/generate-securitisation-multivoice-audio-azure.mjs
  if ($LASTEXITCODE -ne 0) { throw "Episode $episode failed with exit code $LASTEXITCODE." }
}

Write-Output 'Securitisation audio batch completed successfully.'
