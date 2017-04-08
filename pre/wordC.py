import re
from collections import Counter

with open('file.txt') as f:
    passage = f.read()

words = re.findall(r'\w+', passage)
#stopwords = ['UND', 'DIE', 'IN', 'SICH', 'HAT', 'DURCH', 'DER']

with open('stopwords.txt') as stoppi:
    stopwords = stoppi.readlines()
stopwords = [x.strip().upper() for x in stopwords]
        
cap_words = [word.upper() for word in words if word.upper() not in stopwords]


word_counts = Counter(cap_words)


print(word_counts.most_common(10))
