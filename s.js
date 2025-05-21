const stories = {
  english: [
    { title: "The Brave Rabbit", text: `Once upon a time, in a forest full of wild animals...
One brave rabbit stood up to a lion.
He challenged the lion's dominance.
The lion was amused but accepted the challenge.
The rabbit led the lion to a deep well.
He tricked the lion into thinking his reflection was a rival lion.
In anger, the lion jumped into the well.
The rabbit became a hero in the forest.
All animals celebrated his bravery.
They made the rabbit their new leader.
The forest became peaceful once again.
The rabbit taught others about courage.
He said, "Wisdom is more powerful than strength."
The animals listened and learned.
The rabbit lived a long, happy life.
The forest remained safe forever.` },
    // Add 9 more English stories like this...
  

  ],
  hindi: [
    { title: "चतुर खरगोश", text: `एक जंगल में बहुत सारे जानवर रहते थे...
वहाँ एक शेर सबको डराता था।
एक चतुर खरगोश ने उसे सबक सिखाने की ठानी।
वह शेर के पास गया और बोला, "एक और शेर आया है।"
शेर को गुस्सा आया और बोला, "मुझे दिखाओ।"
खरगोश उसे एक कुएँ के पास ले गया।
शेर ने अपनी परछाई देखी और सोचा दुश्मन है।
वह गुस्से में कुएँ में कूद पड़ा।
सभी जानवर खुश हो गए।
खरगोश की बहुत तारीफ हुई।
उसने सबको सिखाया कि बुद्धि ताकत से बड़ी होती है।
अब जंगल में शांति थी।
खरगोश को सबने नेता बना दिया।
सभी ने मिलकर त्योहार मनाया।
खरगोश ने कहा, "हमेशा सोच-समझकर काम करो।"
जंगल फिर कभी डरावना नहीं रहा।` },
    // Add 9 more Hindi stories like this...
  ]
};

function showCategory(language) {
  const listDiv = document.getElementById('story-list');
  const contentDiv = document.getElementById('story-content');
  const title = document.getElementById('story-title');
  const text = document.getElementById('story-text');

  listDiv.innerHTML = '';
  contentDiv.style.display = 'none';

  stories[language].forEach((story, index) => {
    const btn = document.createElement('button');
    btn.innerText = `${index + 1}. ${story.title}`;
    btn.onclick = () => {
      title.innerText = story.title;
      text.innerText = story.text;
      contentDiv.style.display = 'block';
    };
    listDiv.appendChild(btn);
  });
}
