const phonemesData = {
  vowels: [
    {
      id: "vowel-01",
      symbol: "iː",
      name: "长元音 /iː/",
      subcategory: "long",
      examples: [
        { word: "see", ipa: "/siː/" },
        { word: "tea", ipa: "/tiː/" },
        { word: "green", ipa: "/griːn/" }
      ],
      tips: "微笑口型，舌尖抵下齿，类似于汉字「衣」的延长音。嘴唇向两侧微微拉伸。"
    },
    {
      id: "vowel-02",
      symbol: "ɪ",
      name: "短元音 /ɪ/",
      subcategory: "short",
      examples: [
        { word: "sit", ipa: "/sɪt/" },
        { word: "bit", ipa: "/bɪt/" },
        { word: "fish", ipa: "/fɪʃ/" }
      ],
      tips: "嘴巴微张，舌位比/iː/稍低稍后，声音短促轻快。类似于汉字「一」的短促音。"
    },
    {
      id: "vowel-03",
      symbol: "e",
      name: "短元音 /e/",
      subcategory: "short",
      examples: [
        { word: "bed", ipa: "/bed/" },
        { word: "ten", ipa: "/ten/" },
        { word: "red", ipa: "/red/" }
      ],
      tips: "嘴巴张开约一半，舌尖抵下齿，嘴角微微向两侧拉伸。类似于汉字「哎」的发音。"
    },
    {
      id: "vowel-04",
      symbol: "æ",
      name: "短元音 /æ/",
      subcategory: "short",
      examples: [
        { word: "cat", ipa: "/kæt/" },
        { word: "bag", ipa: "/bæɡ/" },
        { word: "hat", ipa: "/hæt/" }
      ],
      tips: "嘴巴张大，舌尖抵下齿，嘴角向两侧拉伸，类似于「啊」和「哎」之间的音。"
    },
    {
      id: "vowel-05",
      symbol: "ɑː",
      name: "长元音 /ɑː/",
      subcategory: "long",
      examples: [
        { word: "car", ipa: "/kɑː/" },
        { word: "father", ipa: "/ˈfɑːðə/" },
        { word: "park", ipa: "/pɑːk/" }
      ],
      tips: "嘴巴张大，舌头放平后缩，发音时声音拉长。类似于汉字「啊」但声音更长。"
    },
    {
      id: "vowel-06",
      symbol: "ɒ",
      name: "短元音 /ɒ/",
      subcategory: "short",
      examples: [
        { word: "hot", ipa: "/hɒt/" },
        { word: "dog", ipa: "/dɒɡ/" },
        { word: "box", ipa: "/bɒks/" }
      ],
      tips: "嘴巴张大呈圆形，舌头后缩，声音短促。英式发音特有，美式英语通常用/ɑː/代替。"
    },
    {
      id: "vowel-07",
      symbol: "ɔː",
      name: "长元音 /ɔː/",
      subcategory: "long",
      examples: [
        { word: "door", ipa: "/dɔː/" },
        { word: "thought", ipa: "/θɔːt/" },
        { word: "law", ipa: "/lɔː/" }
      ],
      tips: "嘴巴收圆呈小o形，舌头后缩抬起，声音拉长。类似于汉字「哦」但嘴型更圆。"
    },
    {
      id: "vowel-08",
      symbol: "ʊ",
      name: "短元音 /ʊ/",
      subcategory: "short",
      examples: [
        { word: "put", ipa: "/pʊt/" },
        { word: "book", ipa: "/bʊk/" },
        { word: "good", ipa: "/ɡʊd/" }
      ],
      tips: "嘴唇收圆微微前突，舌头后缩，声音短促。类似于汉字「乌」的短促音。"
    },
    {
      id: "vowel-09",
      symbol: "uː",
      name: "长元音 /uː/",
      subcategory: "long",
      examples: [
        { word: "food", ipa: "/fuːd/" },
        { word: "school", ipa: "/skuːl/" },
        { word: "blue", ipa: "/bluː/" }
      ],
      tips: "嘴唇收圆向前突出，舌头后缩抬起，声音拉长。类似于汉字「乌」的延长音。"
    },
    {
      id: "vowel-10",
      symbol: "ʌ",
      name: "短元音 /ʌ/",
      subcategory: "short",
      examples: [
        { word: "cup", ipa: "/kʌp/" },
        { word: "but", ipa: "/bʌt/" },
        { word: "love", ipa: "/lʌv/" }
      ],
      tips: "嘴巴微张，舌头中部轻轻抬起，声音短促。类似于汉字「啊」的短促音。"
    },
    {
      id: "vowel-11",
      symbol: "ə",
      name: "中性元音 /ə/",
      subcategory: "schwa",
      examples: [
        { word: "about", ipa: "/əˈbaʊt/" },
        { word: "teacher", ipa: "/ˈtiːtʃə/" },
        { word: " banana", ipa: "/bəˈnɑːnə/" }
      ],
      tips: "舌头自然放松，嘴巴半开，发音轻柔模糊。这是英语中最常见的元音，也叫「非重读元音」。"
    },
    {
      id: "vowel-12",
      symbol: "ɜː",
      name: "长元音 /ɜː/",
      subcategory: "long",
      examples: [
        { word: "bird", ipa: "/bɜːd/" },
        { word: "her", ipa: "/hɜː/" },
        { word: "nurse", ipa: "/nɜːs/" }
      ],
      tips: "嘴巴微张，舌头中部抬起，嘴唇自然放松，声音拉长。卷舌音在美式英语中常见。"
    },
    {
      id: "vowel-13",
      symbol: "eɪ",
      name: "双元音 /eɪ/",
      subcategory: "diphthong",
      examples: [
        { word: "day", ipa: "/deɪ/" },
        { word: "make", ipa: "/meɪk/" },
        { word: "say", ipa: "/seɪ/" }
      ],
      tips: "从/e/滑向/ɪ/，嘴型从半张到微收。注意不要发成单一的「诶」音。"
    },
    {
      id: "vowel-14",
      symbol: "aɪ",
      name: "双元音 /aɪ/",
      subcategory: "diphthong",
      examples: [
        { word: "my", ipa: "/maɪ/" },
        { word: "like", ipa: "/laɪk/" },
        { word: "time", ipa: "/taɪm/" }
      ],
      tips: "从/ɑː/滑向/ɪ/，嘴型从张大到微收。这是英语中很常见的双元音。"
    },
    {
      id: "vowel-15",
      symbol: "ɔɪ",
      name: "双元音 /ɔɪ/",
      subcategory: "diphthong",
      examples: [
        { word: "boy", ipa: "/bɔɪ/" },
        { word: "joy", ipa: "/dʒɔɪ/" },
        { word: "noise", ipa: "/nɔɪz/" }
      ],
      tips: "从/ɔː/滑向/ɪ/，嘴型从圆唇到扁唇。注意与单元音区分。"
    },
    {
      id: "vowel-16",
      symbol: "aʊ",
      name: "双元音 /aʊ/",
      subcategory: "diphthong",
      examples: [
        { word: "how", ipa: "/haʊ/" },
        { word: "now", ipa: "/naʊ/" },
        { word: "out", ipa: "/aʊt/" }
      ],
      tips: "从/ɑː/滑向/ʊ/，嘴型从张大到收圆。类似于汉字「啊乌」的连读。"
    },
    {
      id: "vowel-17",
      symbol: "əʊ",
      name: "双元音 /əʊ/",
      subcategory: "diphthong",
      examples: [
        { word: "go", ipa: "/ɡəʊ/" },
        { word: "no", ipa: "/nəʊ/" },
        { word: "home", ipa: "/həʊm/" }
      ],
      tips: "从/ə/滑向/ʊ/，嘴型从半开到收圆。美式英语中发/oʊ/。"
    },
    {
      id: "vowel-18",
      symbol: "ɪə",
      name: "双元音 /ɪə/",
      subcategory: "diphthong",
      examples: [
        { word: "hear", ipa: "/hɪə/" },
        { word: "here", ipa: "/hɪə/" },
        { word: "near", ipa: "/nɪə/" }
      ],
      tips: "从/ɪ/滑向/ə/，发音自然流畅。美式英语中常发/iːr/。"
    },
    {
      id: "vowel-19",
      symbol: "eə",
      name: "双元音 /eə/",
      subcategory: "diphthong",
      examples: [
        { word: "hair", ipa: "/heə/" },
        { word: "there", ipa: "/ðeə/" },
        { word: "care", ipa: "/keə/" }
      ],
      tips: "从/e/滑向/ə/，发音轻柔。美式英语中常发/ɛr/。"
    },
    {
      id: "vowel-20",
      symbol: "ʊə",
      name: "双元音 /ʊə/",
      subcategory: "diphthong",
      examples: [
        { word: "tour", ipa: "/tʊə/" },
        { word: "pure", ipa: "/pjʊə/" },
        { word: "sure", ipa: "/ʃʊə/" }
      ],
      tips: "从/ʊ/滑向/ə/，发音时嘴唇从圆到自然放松。美式英语中常发/ʊr/。"
    }
  ],
  consonants: [
    {
      id: "consonant-01",
      symbol: "p",
      name: "清辅音 /p/",
      subcategory: "plosive",
      examples: [
        { word: "pen", ipa: "/pen/" },
        { word: "paper", ipa: "/ˈpeɪpə/" },
        { word: "stop", ipa: "/stɒp/" }
      ],
      tips: "双唇紧闭形成阻塞，突然放开气流。声带不振动送气。类似于汉字「普」的辅音部分。"
    },
    {
      id: "consonant-02",
      symbol: "b",
      name: "浊辅音 /b/",
      subcategory: "plosive",
      examples: [
        { word: "book", ipa: "/bʊk/" },
        { word: "big", ipa: "/bɪɡ/" },
        { word: "baby", ipa: "/ˈbeɪbi/" }
      ],
      tips: "双唇紧闭形成阻塞，突然放开气流。声带振动。类似于汉字「波」的辅音部分。"
    },
    {
      id: "consonant-03",
      symbol: "t",
      name: "清辅音 /t/",
      subcategory: "plosive",
      examples: [
        { word: "tea", ipa: "/tiː/" },
        { word: "city", ipa: "/ˈsɪti/" },
        { word: "cat", ipa: "/kæt/" }
      ],
      tips: "舌尖抵上齿龈形成阻塞，突然放开气流。声带不振动。类似于汉字「特」的辅音部分。"
    },
    {
      id: "consonant-04",
      symbol: "d",
      name: "浊辅音 /d/",
      subcategory: "plosive",
      examples: [
        { word: "day", ipa: "/deɪ/" },
        { word: "did", ipa: "/dɪd/" },
        { word: "red", ipa: "/red/" }
      ],
      tips: "舌尖抵上齿龈形成阻塞，突然放开气流。声带振动。类似于汉字「得」的辅音部分。"
    },
    {
      id: "consonant-05",
      symbol: "k",
      name: "清辅音 /k/",
      subcategory: "plosive",
      examples: [
        { word: "key", ipa: "/kiː/" },
        { word: "car", ipa: "/kɑː/" },
        { word: "back", ipa: "/bæk/" }
      ],
      tips: "舌根抵软腭形成阻塞，突然放开气流。声带不振动。类似于汉字「科」的辅音部分。"
    },
    {
      id: "consonant-06",
      symbol: "ɡ",
      name: "浊辅音 /ɡ/",
      subcategory: "plosive",
      examples: [
        { word: "go", ipa: "/ɡəʊ/" },
        { word: "big", ipa: "/bɪɡ/" },
        { word: "dog", ipa: "/dɒɡ/" }
      ],
      tips: "舌根抵软腭形成阻塞，突然放开气流。声带振动。类似于汉字「哥」的辅音部分。"
    },
    {
      id: "consonant-07",
      symbol: "f",
      name: "清辅音 /f/",
      subcategory: "fricative",
      examples: [
        { word: "fish", ipa: "/fɪʃ/" },
        { word: "five", ipa: "/faɪv/" },
        { word: "off", ipa: "/ɒf/" }
      ],
      tips: "上齿轻触下唇，气流从缝隙摩擦而出。声带不振动。类似于汉字「夫」的辅音部分。"
    },
    {
      id: "consonant-08",
      symbol: "v",
      name: "浊辅音 /v/",
      subcategory: "fricative",
      examples: [
        { word: "very", ipa: "/ˈveri/" },
        { word: "love", ipa: "/lʌv/" },
        { word: "give", ipa: "/ɡɪv/" }
      ],
      tips: "上齿轻触下唇，气流从缝隙摩擦而出。声带振动。类似于汉字「乌」的上齿咬下唇。"
    },
    {
      id: "consonant-09",
      symbol: "θ",
      name: "清辅音 /θ/",
      subcategory: "fricative",
      examples: [
        { word: "think", ipa: "/θɪŋk/" },
        { word: "three", ipa: "/θriː/" },
        { word: "bath", ipa: "/bɑːθ/" }
      ],
      tips: "舌尖轻触上齿，气流从缝隙摩擦而出。声带不振动。这是英语特有的音，舌头要伸出牙齿。"
    },
    {
      id: "consonant-10",
      symbol: "ð",
      name: "浊辅音 /ð/",
      subcategory: "fricative",
      examples: [
        { word: "this", ipa: "/ðɪs/" },
        { word: "that", ipa: "/ðæt/" },
        { word: "the", ipa: "/ðə/" }
      ],
      tips: "舌尖轻触上齿，气流从缝隙摩擦而出。声带振动。这是英语特有的音。"
    },
    {
      id: "consonant-11",
      symbol: "s",
      name: "清辅音 /s/",
      subcategory: "fricative",
      examples: [
        { word: "see", ipa: "/siː/" },
        { word: "sun", ipa: "/sʌn/" },
        { word: "nice", ipa: "/naɪs/" }
      ],
      tips: "舌尖接近上齿龈，气流从缝隙摩擦而出。声带不振动。类似于汉字「丝」的音。"
    },
    {
      id: "consonant-12",
      symbol: "z",
      name: "浊辅音 /z/",
      subcategory: "fricative",
      examples: [
        { word: "zoo", ipa: "/zuː/" },
        { word: "zebra", ipa: "/ˈzebrə/" },
        { word: "his", ipa: "/hɪz/" }
      ],
      tips: "舌尖接近上齿龈，气流从缝隙摩擦而出。声带振动。类似于汉字「资」的音。"
    },
    {
      id: "consonant-13",
      symbol: "ʃ",
      name: "清辅音 /ʃ/",
      subcategory: "fricative",
      examples: [
        { word: "she", ipa: "/ʃiː/" },
        { word: "fish", ipa: "/fɪʃ/" },
        { word: "special", ipa: "/ˈspeʃəl/" }
      ],
      tips: "舌尖接近上齿龈，舌身抬起，气流从缝隙摩擦而出。声带不振动。类似于汉字「诗」的音。"
    },
    {
      id: "consonant-14",
      symbol: "ʒ",
      name: "浊辅音 /ʒ/",
      subcategory: "fricative",
      examples: [
        { word: "measure", ipa: "/ˈmeʒə/" },
        { word: "vision", ipa: "/ˈvɪʒən/" },
        { word: "usually", ipa: "/ˈjuːʒuəli/" }
      ],
      tips: "舌尖接近上齿龈，舌身抬起，气流从缝隙摩擦而出。声带振动。这个音在英语中较少见。"
    },
    {
      id: "consonant-15",
      symbol: "h",
      name: "清辅音 /h/",
      subcategory: "fricative",
      examples: [
        { word: "hello", ipa: "/həˈləʊ/" },
        { word: "home", ipa: "/həʊm/" },
        { word: "who", ipa: "/huː/" }
      ],
      tips: "气流从喉部呼出，嘴型随即过渡到元音。声带不振动。类似于汉字「喝」的轻辅音。"
    },
    {
      id: "consonant-16",
      symbol: "r",
      name: "浊辅音 /r/",
      subcategory: "approximant",
      examples: [
        { word: "red", ipa: "/red/" },
        { word: "right", ipa: "/raɪt/" },
        { word: "rain", ipa: "/reɪn/" }
      ],
      tips: "舌尖卷起接近上齿龈，但不接触。声带振动。英式英语中舌头不卷，美式英语中舌尖卷起。"
    },
    {
      id: "consonant-17",
      symbol: "tʃ",
      name: "清辅音 /tʃ/",
      subcategory: "affricate",
      examples: [
        { word: "chat", ipa: "/tʃæt/" },
        { word: "church", ipa: "/tʃɜːtʃ/" },
        { word: "teach", ipa: "/tiːtʃ/" }
      ],
      tips: "舌尖抵上齿龈形成阻塞，然后气流摩擦而出。声带不振动。是/t/和/ʃ/的组合。"
    },
    {
      id: "consonant-18",
      symbol: "dʒ",
      name: "浊辅音 /dʒ/",
      subcategory: "affricate",
      examples: [
        { word: "job", ipa: "/dʒɒb/" },
        { word: "judge", ipa: "/dʒʌdʒ/" },
        { word: "age", ipa: "/eɪdʒ/" }
      ],
      tips: "舌尖抵上齿龈形成阻塞，然后气流摩擦而出。声带振动。是/d/和/ʒ/的组合。"
    },
    {
      id: "consonant-19",
      symbol: "tr",
      name: "清辅音 /tr/",
      subcategory: "affricate",
      examples: [
        { word: "tree", ipa: "/triː/" },
        { word: "try", ipa: "/traɪ/" },
        { word: "train", ipa: "/treɪn/" }
      ],
      tips: "舌尖抵上齿龈形成阻塞，然后气流摩擦而出。声带不振动。是/t/和/r/的组合。"
    },
    {
      id: "consonant-20",
      symbol: "dr",
      name: "浊辅音 /dr/",
      subcategory: "affricate",
      examples: [
        { word: "drink", ipa: "/drɪŋk/" },
        { word: "dream", ipa: "/driːm/" },
        { word: "dry", ipa: "/draɪ/" }
      ],
      tips: "舌尖抵上齿龈形成阻塞，然后气流摩擦而出。声带振动。是/d/和/r/的组合。"
    },
    {
      id: "consonant-21",
      symbol: "ts",
      name: "清辅音 /ts/",
      subcategory: "affricate",
      examples: [
        { word: "cats", ipa: "/kæts/" },
        { word: "bats", ipa: "/bæts/" },
        { word: "students", ipa: "/ˈstjuːdənts/" }
      ],
      tips: "舌尖抵上齿龈形成阻塞，然后气流摩擦而出。声带不振动。主要出现在词尾。"
    },
    {
      id: "consonant-22",
      symbol: "dz",
      name: "浊辅音 /dz/",
      subcategory: "affricate",
      examples: [
        { word: "beds", ipa: "/bedz/" },
        { word: "friends", ipa: "/frendz/" },
        { word: "cards", ipa: "/kɑːdz/" }
      ],
      tips: "舌尖抵上齿龈形成阻塞，然后气流摩擦而出。声带振动。主要出现在词尾。"
    },
    {
      id: "consonant-23",
      symbol: "m",
      name: "浊辅音 /m/",
      subcategory: "nasal",
      examples: [
        { word: "man", ipa: "/mæn/" },
        { word: "summer", ipa: "/ˈsʌmə/" },
        { word: "time", ipa: "/taɪm/" }
      ],
      tips: "双唇紧闭，气流从鼻腔流出。声带振动。有三种发音位置：词首、词中、词尾。"
    },
    {
      id: "consonant-24",
      symbol: "n",
      name: "浊辅音 /n/",
      subcategory: "nasal",
      examples: [
        { word: "no", ipa: "/nəʊ/" },
        { word: "sunny", ipa: "/ˈsʌni/" },
        { word: "ten", ipa: "/ten/" }
      ],
      tips: "舌尖抵上齿龈，气流从鼻腔流出。声带振动。词尾时注意不要省略。"
    },
    {
      id: "consonant-25",
      symbol: "ŋ",
      name: "浊辅音 /ŋ/",
      subcategory: "nasal",
      examples: [
        { word: "sing", ipa: "/sɪŋ/" },
        { word: "ring", ipa: "/rɪŋ/" },
        { word: "morning", ipa: "/ˈmɔːnɪŋ/" }
      ],
      tips: "舌根抵软腭，气流从鼻腔流出。声带振动。只出现在词尾，不会出现在词首。"
    },
    {
      id: "consonant-26",
      symbol: "l",
      name: "浊辅音 /l/",
      subcategory: "lateral",
      examples: [
        { word: "let", ipa: "/let/" },
        { word: "well", ipa: "/wel/" },
        { word: "like", ipa: "/laɪk/" }
      ],
      tips: "舌尖抵上齿龈，气流从舌头两侧流出。声带振动。词尾时舌头要抵住。"
    },
    {
      id: "consonant-27",
      symbol: "w",
      name: "浊辅音 /w/",
      subcategory: "approximant",
      examples: [
        { word: "we", ipa: "/wiː/" },
        { word: "water", ipa: "/ˈwɔːtə/" },
        { word: "sweet", ipa: "/swiːt/" }
      ],
      tips: "双唇收圆前突，舌身后缩接近软腭。声带振动。类似于汉字「乌」的辅音部分。"
    },
    {
      id: "consonant-28",
      symbol: "j",
      name: "浊辅音 /j/",
      subcategory: "approximant",
      examples: [
        { word: "yes", ipa: "/jes/" },
        { word: "year", ipa: "/jɪə/" },
        { word: "blue", ipa: "/bluː/" }
      ],
      tips: "舌身前部接近硬腭。声带振动。类似于汉字「呀」的辅音部分。"
    }
  ]
};

const commonMistakes = [
  { phoneme: "/θ/", mistake: "发成/s/", correct: "舌尖要伸出上下齿之间" },
  { phoneme: "/ð/", mistake: "发成/z/", correct: "舌尖要伸出上下齿之间" },
  { phoneme: "/ŋ/", mistake: "发成/n/", correct: "舌根要抵住软腭，不是舌尖抵上齿龈" },
  { phoneme: "/l/", mistake: "词尾省略", correct: "词尾舌头也要抵住上齿龈" },
  { phoneme: "/r/", mistake: "发成中文「日」", correct: "舌头不要卷，只是接近上齿龈后方" },
  { phoneme: "/v/", mistake: "下唇不咬上齿", correct: "上齿必须咬住下唇内侧" },
  { phoneme: "/w/", mistake: "发成「乌」", correct: "双唇要收圆前突快速过渡到元音" },
  { phoneme: "/æ/", mistake: "发成「啊」", correct: "嘴角要向两侧拉伸，发音位置更靠前" }
];

const britishAmericanDifferences = [
  { word: "car", british: "/kɑː/", american: "/kɑːr/" },
  { word: "better", british: "/ˈbetə/", american: "/ˈbeɾər/" },
  { word: "water", british: "/ˈwɔːtə/", american: "/ˈwɔːɾər/" },
  { word: "butter", british: "/ˈbʌtə/", american: "/ˈbʌɾər/" },
  { word: "bird", british: "/bɜːd/", american: "/bɜːrd/" },
  { word: "girl", british: "/ɡɜːl/", american: "/ɡɜːrl/" },
  { word: "class", british: "/klɑːs/", american: "/klæs/" },
  { word: "dance", british: "/dɑːns/", american: "/dæns/" },
  { word: "can't", british: "/kɑːnt/", american: "/kænt/" },
  { word: "tomato", british: "/təˈmɑːtəʊ/", american: "/təˈmeɪtoʊ/" },
  { word: "privacy", british: "/ˈprɪvəsi/", american: "/ˈpraɪvəsi/" },
  { word: "vitamin", british: "/ˈvɪtəmɪn/", american: "/ˈvaɪtəmɪn/" }
];

window.phonemesData = phonemesData;
window.commonMistakes = commonMistakes;
window.britishAmericanDifferences = britishAmericanDifferences;
