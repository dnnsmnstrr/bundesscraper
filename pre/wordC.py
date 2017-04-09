import re
import sys
from collections import Counter

with open(sys.argv[1]) as f:
    passage = f.read()

words = re.findall(r'\w+', passage)

with open('stopwords.txt') as stoppi:
    stopwords = stoppi.readlines()
stopwords = [x.strip().upper() for x in stopwords]

cap_words = [word.upper() for word in words if word.upper() not in stopwords]

word_counts = Counter(cap_words)

print(sys.argv[1])
print(word_counts.most_common(25))
print()
