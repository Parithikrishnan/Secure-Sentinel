from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer

text = """

Promoting safety, integrity and security on and across the Meta Products: The Meta Products are designed to research and help ensure the safety, integrity and security of those services and those people who enjoy them, on and off Meta Products. We process the information that we have associated with you and apply automated processing techniques and, in some instances, conduct manual (human) review to:
Verify accounts and activity,
Find and address violations of our terms or policies. In some cases, the decisions we make about violations are reviewed by the ,
Investigate suspicious activity,
Detect, prevent and combat harmful or unlawful behaviour, such as to review and, in some cases, remove content reported to us,
Identify and combat disparities and racial bias against historically marginalised communities,
Protect the life, physical or mental health, well-being or integrity of our users or others,
Detect and prevent spam, other security matters and other bad experiences,
Detect and stop threats to our personnel and property, and
Maintain the integrity of our Products.
For more information on safety, integrity and security generally on Meta Products, visit the  and .


"""

parser = PlaintextParser.from_string(text, Tokenizer("english"))
summarizer = TextRankSummarizer()
summary = summarizer(parser.document, 10) 

for sent in summary:
    print(sent)
