cj = User.first
cj.authored_tracks.where(
  title: "Track 1",
  content: "The quick brown fox jumped over the lazy dog.",
  about: "The first track"
).first_or_create!
cj.authored_tracks.where(
  title: "Track 2",
  content: "Let it go! Let it go...",
  about: "The second track"
).first_or_create!

