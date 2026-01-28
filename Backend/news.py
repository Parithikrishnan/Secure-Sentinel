from flask import Flask, jsonify

app = Flask(__name__)

news_data = [
    {
        "id": 1,
        "title": "Data Resilience and Trust Key to Safe AI Use",
        "content": "Business and technology leaders around the world are emphasizing the importance of data resilience and trust as central to the safe adoption of artificial intelligence. Organizations are reevaluating their strategies to ensure that personal and corporate data are protected while AI systems are deployed. Trusted and secure data is increasingly seen not just as a regulatory requirement but as a strategic asset that underpins both compliance and innovation in AI-driven services."
    },
    {
        "id": 2,
        "title": "International Data Privacy Day 2026 Emphasizes Digital Trust",
        "content": "The 2026 Data Privacy Day brought global attention to the growing need for digital trust and responsible data practices. Governments, businesses, and individual users were encouraged to implement stronger measures to protect personal information online. The event highlighted practical steps organizations can take to ensure transparency in data handling, reinforce user privacy, and foster a culture of trust in digital interactions."
    },
    {
        "id": 3,
        "title": "AI Reshapes Data Privacy and Governance Strategies",
        "content": "As artificial intelligence becomes more integrated into business operations, companies are fundamentally rethinking how they approach data privacy and governance. AI technologies are creating new risks, and organizations are adopting frameworks that balance innovation with stringent privacy safeguards. Executives report that these governance strategies are not merely compliance-driven, but also key to maintaining customer trust and credibility in a rapidly changing digital environment."
    },
    {
        "id": 4,
        "title": "Age Verification Sparks Privacy vs Safety Debate",
        "content": "Stricter age verification requirements on social media and other online platforms have sparked debates over the trade-off between safety and privacy. While governments aim to protect minors from harmful content, experts warn that such systems can inadvertently expose personal information and introduce privacy risks. This discussion underscores the broader challenge of ensuring user safety without compromising fundamental data protection principles."
    },
    {
        "id": 5,
        "title": "Consumer Trust Varies in Digital Identity Systems",
        "content": "Digital identity systems are becoming increasingly common as a means of simplifying online access and transactions, but consumer trust varies widely. Surveys indicate that users’ confidence depends heavily on who provides the service and how securely personal information is managed. Building a trustworthy digital identity ecosystem requires transparency, robust security measures, and clear communication about data usage to gain broader adoption."
    },
    {
        "id": 6,
        "title": "New AI Regulations Aim to Protect User Data",
        "content": "Governments and regulatory bodies are introducing new legislation to ensure that AI systems respect user privacy and promote digital trust. These regulations focus on accountability, transparency, and ethical handling of personal information. Organizations deploying AI are being urged to conduct thorough risk assessments and implement safeguards to prevent misuse of sensitive data while maintaining user confidence."
    },
    {
        "id": 7,
        "title": "Cybersecurity Experts Warn About Rising Phishing Attacks",
        "content": "Cybersecurity professionals have reported a notable increase in sophisticated phishing attacks targeting personal and financial information. These attacks exploit users’ trust and often use advanced social engineering techniques to deceive victims. Experts recommend that individuals and organizations adopt multi-layered security measures, stay informed about common phishing tactics, and remain vigilant in protecting sensitive data."
    },
    {
        "id": 8,
        "title": "End-to-End Encryption Expands to More Apps",
        "content": "Messaging and collaboration applications are increasingly implementing end-to-end encryption to protect user communications. This security measure ensures that only the intended recipients can read messages, significantly enhancing digital safety and privacy. As threats to online communications grow, more companies are recognizing that strong encryption is essential to maintain user trust and safeguard sensitive information."
    },
    {
        "id": 9,
        "title": "Browsers Enhance Privacy With Tracking Prevention",
        "content": "Modern web browsers are rolling out features that block third-party tracking cookies and limit the ability of advertisers to collect personal data. These updates aim to give users more control over their online privacy and reduce intrusive tracking practices. Privacy advocates view these changes as a critical step in protecting individuals’ digital footprint and promoting greater transparency in the online advertising ecosystem."
    },
    {
        "id": 10,
        "title": "Surveys Show Users Demand More Transparency From Tech Firms",
        "content": "Recent studies indicate that users are increasingly demanding transparency from technology companies regarding how their personal data is collected, stored, and utilized. Users are more likely to trust platforms that clearly communicate privacy policies and data handling practices. Companies that fail to provide clarity risk losing consumer confidence, highlighting the growing importance of transparency in digital trust strategies."
    }
]


@app.route('/news')
def get_news():
    return jsonify(news_data)

if __name__ == '__main__':
    app.run(debug=True)
