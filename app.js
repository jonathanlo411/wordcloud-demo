
// Self Launch
loadWordCloud('202104_ComposableSystems-webinar.json', [])

async function loadWordCloud(transcriptID, additionalStopwords) {
    const target = document.querySelector('#word-cloud-target');
    const error = document.querySelector('#error');

    if (!WordCloud.isSupported) {
        target.style.display = 'none';
        error.style.display = 'block';
    } else {
        // Load data
        const rawTranscript = await fetch('./transcript.json');
        const rawStopwords = await fetch('./ignore.txt');
        console.log(rawTranscript)
        const transcript = await rawTranscript.json();
        const stopwords = (await rawStopwords.text()).split(',');

        console.log(transcript)
        // Data Processing
        let corpus = transcript.map((d) => d.text.split(' ')).flat(1);
        corpus = corpus.filter(value => !stopwords.includes(value))
        const sortedCorpus = Object.entries(countUniqueWords(corpus)).sort((a, b) => b[1] - a[1]);
        console.log(corpus)

        // Loading Word Cloud
        const options = {
            list: sortedCorpus,
            fontFamily: 'Poppins'
        }
        WordCloud(target, options)
    }
}

function countUniqueWords(wordsList) {
    const wordCountMap = wordsList.reduce((acc, word) => {
        const cleanedWord = word.trim().toLowerCase();

        if (acc.hasOwnProperty(cleanedWord)) {
            acc[cleanedWord]++;
        } else {
            acc[cleanedWord] = 1;
        }

        return acc;
    }, {});
  
    return wordCountMap;
}
  
