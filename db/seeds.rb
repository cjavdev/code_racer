cj = User.first
cj.authored_tracks.where(
  title: "Peter",
  content: "The way Mr. Darling won her was this: the many gentlemen who had been boys when she was a girl discovered simultaneously that they loved her, and they all ran to her house to propose to her except Mr. Darling, who took a cab and nipped in first, and so he got her. He got all of her, except the innermost box and the kiss. He never knew about the box, and in time he gave up trying for the kiss. Wendy thought Napoleon could have got it, but I can picture him trying, and then going off in a passion, slamming the door.",
  about: "Exerpt from The Adventures of Peter Pan by James M. Berrie"
).first_or_create!

cj.authored_tracks.where(
  title: "Peter 2",
  content: "Mrs. Darling first heard of Peter when she was tidying up her children's minds. It is the nightly custom of every good mother after her children are asleep to rummage in their minds and put things straight for next morning, repacking into their proper places the many articles that have wandered during the day. If you could keep awake (but of course you can't) you would see your own mother doing this, and you would find it very interesting to watch her. It is quite like tidying up drawers. You would see her on her knees, I expect, lingering humorously over some of your contents, wondering where on earth you had picked this thing up, making discoveries sweet and not so sweet, pressing this to her cheek as if it were as nice as a kitten, and hurriedly stowing that out of sight. When you wake in the morning, the naughtiness and evil passions with which you went to bed have been folded up small and placed at the bottom of your mind and on the top, beautifully aired, are spread out your prettier thoughts, ready for you to put on.",
  about: "Exerpt from The Adventures of Peter Pan by James M. Berrie"
).first_or_create!

cj.authored_tracks.where(
  title: "Robin Hood",
  content: "The fond mother sighed when she saw the boy's face light up at these woodland tales. She was of gentle birth, and had hoped to see her son famous at court or abbey. She taught him to read and to write, to doff his cap without awkwardness and to answer directly and truthfully both lord and peasant. But the boy, although he took kindly to these lessons of breeding, was yet happiest when he had his beloved bow in hand and strolled at will, listening to the murmur of the trees.",
  about: "Excerpt from Robin Hood by J. Walker McSpadden"
).first_or_create!

cj.authored_tracks.where(
  title: "Robin Hood 2",
  content: "In the morning the company was early astir and on their way to Nottingham. It was a goodly cavalcade. First rode King Richard of the Lion Heart, with his tall figure set forth by the black armor and waving plume in his helm. Then came Sir Richard of the Lea with fourscore knights and men-at-arms. And after them came Robin Hood and Maid Marian riding upon milk-white steeds. Allan-a-Dale also escorted Mistress Dale on horseback, for she was to be matron-of-honor at the wedding. These were followed by sevenscore archers clad in their bravest Lincoln green, and with their new bows unstrung in token of peace.",
  about: "Excerpt from Robin Hood by J. Walker McSpadden"
).first_or_create!
