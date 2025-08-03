import React, { Component } from "react";
import Card from "./Card";
import { TypeAnimation } from "react-type-animation";
import Spinner from "./Spinner";
import config from "../../config/routes"


export default class Newsbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [
        {
          article_id: "65d7bf243182ae45e85dabedadb17f89",
          title:
            "Trump's One Big Beautiful Bill victory tour hits major bump: Voters hate it | Opinion",
          link: "https://www.usatoday.com/story/opinion/columnist/2025/08/01/medicaid-big-beautiful-bill-national-debt-trump-republicans/85443993007/",
          keywords: [
            "access:metered",
            "tag:ted cruz",
            "tag:usat content sharing - opinion",
            "tag:legislative branch",
            "tag:u.s. congress",
            "tag:donald trump",
            "tag:politically center left",
            "tag:opinion collection",
            "tag:columnists' opinions",
            "tag:joe biden",
            "tag:budget deficit",
            "ssts:opinion:columnist",
            "tag:u.s. immigration and customs enforcement",
            "tag:opinion content",
            "tag:executive branch",
            "tag:republican party",
            "tag:republicans",
            "tag:government",
            "sstsn:columnists",
            "tag:congress",
            "tag:politics",
            "type:story",
            "tag:medicaid",
            "tag:one big beautiful bill act",
          ],
          creator: ["USA TODAY"],
          description:
            "I get the feeling Republicans in Congress want to increase funding either for a time machine to undo their vote or a device to make voters forget.",
          content:
            "Republicans in Congress have a shady tradition, last seen before and after former President Joe Biden 's $1 trillion infrastructure bill became law in 2021 , of scorning government spending as socialism while also seeking credit with constituents for any benefit from that funding. That's called \" Vote no and take the dough .\" But many of those same Republicans in Congress are now openly fretting about President Donald Trump 's signature One Big Beautiful Bill Act, which he signed into law on July 4 . Some worry that it slashes Medicaid funding for the working poor. Some think it doesn't cut enough federal funding. And it adds $4 trillion to the national debt over the next decade. Call this \" Vote yes and second-guess .\" That's not exactly the vibe Trump was looking for from his political party for what he had hoped would be a summer victory tour to celebrate this and other early accomplishments in his second term. But here, Trump – and his party in next year's midterm elections – have a serious problem. Americans don't like his massive budget bill , which swaps short-term tax relief for some low-income working people for permanent tax cuts for America's wealthiest people. That's only going to get worse as Americans see what programs Trump and his Republican allies have defunded and where they are boosting federal spending. Trump is dumping money into immigration policies Americans don't like Consider immigration, a signature issue for Trump , which previously won him significant support among American voters in 2016 and 2024. He's seen a reversal of fortunes here. That's probably because so many of us are watching masked Immigration and Customs Enforcement agents indiscriminately grabbing people off the street to be deported with little or no due process under the law. What Trump touted as an effort to deport violent criminals who entered this country illegally has devolved into an oppressive spectacle as ICE agents snatch people who hold green cards or appear at immigration hearings . Trump's new budget bill includes $170 billion for more of that over the next four years, with $76.5 billion going to ICE to detain people snatched off our streets and to add 10,000 new agents to a force that already has 20,000. How is that going to play across America? Gallup offered us a clue with a mid-July survey that showed a sizable shift in how Americans view immigration. In 2024, 55% of Americans told Gallup they thought immigration should be decreased. That dropped to 30% this year, after they saw Trump's approach on the issue. And a record high – 79% – of U.S. adults told Gallup that immigration is good for this country. That same survey found that 62% of Americans disapprove of Trump's immigration policies. And he's about to drive this country deep into debt to ramp up an approach Americans don't like. Now Republicans want you to believe they're saving Medicaid Then there is the Republican regret. You get the feeling Republicans in Congress want to increase funding either for a time machine to undo their vote or a device to make voters forget how those senators and representatives supported Trump's big, beautiful bill. This game of both sides is as desperate as it is hypocritical. U.S. Sen. Josh Hawley of Missouri wrote an essay for The New York Times in May expressing concerns about how the bill will slash Medicaid for the working poor. Then he voted for Trump's budget. Now he says he's trying to undo some of the harm he supported with new legislation. U.S. Sen. Lisa Murkowski of Alaska expressed concerns before folding to support Trump's budget . Murkowski's shameless bid to spread the blame, by urging Republicans in the U.S. House not to endorse the bill she had just endorsed, of course, fell on its face. U.S. Rep. Lauren Boebert of Colorado touted her vote for Trump's budget in May. By late July, she was denouncing the government for not reducing the national debt . U.S. Rep. Ted Cruz of Texas is among the legislators now calling to roll back the provision in Trump's budget that changes tax deductions for gamblers . Cruz's explanation for backtracking, according to NBC News : \"Most Republicans didn't even know this was in the bill when they voted to pass it.\" Republicans are still spending our tax dollars recklessly Trump has assumed control of the Republican Party in Congress, where legislative leaders are careful to never act as an independent and coequal branch of government . They sing a song about making America great by cracking down on federal spending, while piling up the nation's debt. They're not spending less of your tax dollars. They're just making sure the super rich in America don't have to pay at the same rates as middle-class people. They're spending much, much more, just as Americans discover they like Trump's policies less and less every day. There's a cure for all this. It's called the 2026 midterm elections. Republicans in Congress are afraid of Trump. They really should be afraid of voters tossing them out of office for backing his budget. Follow USA TODAY columnist Chris Brennan on X, formerly known as Twitter: @ByChrisBrennan . Sign up for his weekly newsletter, Translating Politics, here .",
          pubDate: "2025-08-01 08:30:59",
          pubDateTZ: "UTC",
          image_url:
            "https://www.usatoday.com/gcdn/authoring/authoring-images/2025/07/03/USAT/84466144007-getty-images-2222312159.jpg?auto=webp&crop=4649%2C2617%2Cx7%2Cy486&format=pjpg&height=1802&width=3200",
          video_url: null,
          source_id: "usatoday",
          source_name: "Usa Today",
          source_priority: 418,
          source_url: "https://www.usatoday.com",
          source_icon: "https://n.bytvi.com/usatoday.jpg",
          language: "english",
          country: ["united states of america"],
          category: ["politics"],
          sentiment: "negative",
          sentiment_stats: {
            positive: 0.41,
            neutral: 0.2,
            negative: 99.39,
          },
          ai_tag: ["politics"],
          ai_region: null,
          ai_org: null,
          ai_summary:
            "President Trump's celebration of the One Big Beautiful Bill faced backlash during his victory tour, as voters expressed discontent with its provisions. The legislation, aimed at reducing taxes for high earners through increased deficits, sparked concerns over reduced Medicaid funds for the working class and substantial growth in the national debt. Additionally, Trump's aggressive stance on immigration led to public outcry against perceived abuses by Immigration and Customs Enforcement (ICE). The administration's push for expanded detention facilities further fueled criticism amidst reports of arbitrary arrests and deportations.",
          ai_content:
            "In a stark contrast to expectations, President Donald Trump's celebratory Victory Tour following the enactment of the One Big Beautiful Bill encountered considerable resistance from the electorate. Signed into law on Independence Day, the bill promised immediate tax benefits for middle-class families alongside long-term advantages for wealthy individuals; however, these promises came at the cost of increasing the nation's deficit by $4 trillion within ten years. Critics argue that the bill disproportionately favors affluent citizens while undermining essential services such as Medicaid—a lifeline for lower-income workers—thereby exacerbating social inequality.\nAmidst growing dissatisfaction, Trump's approach to immigration reform emerged as another contentious point. Once hailed as a strong proponent of stringent border control measures targeting illegal immigrants since 2016, Trump's policy direction took a turn towards controversial practices involving Immigration and Customs Enforcement (ICE) officers. Reports surfaced detailing instances of indiscriminate detentions and deportations lacking proper legal procedures, sparking widespread condemnation across various communities. In fact, Trump's proposed budget allocates $170 billion toward bolstering ICE operations over the ensuing four years, including plans to expand the agency's workforce significantly despite existing personnel shortages.\nThe juxtaposition between Trump's initial campaign rhetoric advocating for robust action against undocumented migrants entering America unlawfully and subsequent actions taken by ICE paints a complex picture of shifting priorities. As the nation grapples with these issues, questions arise regarding the true intentions behind legislative decisions and enforcement strategies. With mounting pressure from concerned citizens demanding accountability and transparency, the future trajectory of Trump's presidency remains uncertain amid ongoing debates around fiscal responsibility, healthcare access, and civil liberties.",
          duplicate: false,
        },
        {
          article_id: "4511fd5a46012f4d6e59793462afc3ba",
          title:
            "Trump Blasts Recess-Ready Republicans in All-Caps Rant: 'DO YOUR JOB'",
          link: "https://www.thedailybeast.com/trump-blasts-recess-ready-republicans-in-all-caps-rant-do-your-job/",
          keywords: ["story"],
          creator: ["Cameron Adams"],
          description:
            'Getty ImagesDonald Trump has doubled down on his warning that the Senate must confirm his nominees for government posts before its members can take their traditional month-long summer break.Earlier this month, the president flagged the cancellation of the August recess, due to start Monday, with Republican Senate leader John Thune. After flattering Thune by calling him "very talented," he suggested senators could even work through long weekends to confirm his "incredible" nominees. "We need them badly!!!" he said.The president returned to the idea of dumping the summer recess in a fired-up Truth Social screed on Thursday.Read more at The Daily Beast.',
          content:
            "Donald Trump has doubled down on his warning that the Senate must confirm his nominees for government posts before its members can take their traditional month-long summer break. Earlier this month, the president flagged the cancellation of the August recess, due to start Monday, with Republican Senate leader John Thune. After flattering Thune by calling him \"very talented,\" he suggested senators could even work through long weekends to confirm his \"incredible\" nominees. \"We need them badly!!!\" he said. The president returned to the idea of dumping the summer recess in a fired-up Truth Social screed on Thursday. He wrote: \"The Senate must stay in Session, taking no recess, until the entire Executive Calendar is CLEAR!!! We have to save our Country from the Lunatic Left. \"Republicans, for the health and safety of the USA, DO YOUR JOB, and confirm All Nominees. They should NOT BE FORCED TO WAIT. Thank you for your attention to this matter!\" There are an estimated 1,300 nominees who require confirmation by the Senate for jobs in the executive branch and independent agencies, with more than 160 of those ready for a vote. The backlog Trump wants senators to work through means they would forfeit a break scheduled from Aug. 4 to Sept. 1. Senators can use that month to try and sell Trump's policies to voters in their home states, ahead of midterm elections. The president followed up his 'No recess for you' post with a snide 'How to vote' tip for his party. He posted on Truth Social, \"Republicans, when in doubt, vote the exact opposite of Senator Susan Collins. Generally speaking, you can't go wrong. Thank you for your attention to this matter and, MAKE AMERICA GREAT AGAIN!\" Maine Republican Collins voted against two of Trump's bills this year, including his 'One Big Beautiful Bill Act,' and opposed some of his high-profile Cabinet nominees. Last week, Thune said he had not ruled out keeping Republicans in Washington instead of having summer recess. \"We're thinking about it. We want to get as many [nominations] through the pipeline as we can,\" Thune said of keeping Trump happy. He added, \"Trying to get his team in place is something that we're very committed to and we're going to be looking at all the options in the next few weeks to try and get as many of those across the finish line as we can.\" Thune is no stranger to giving Trump what he wants. He pulled an all-nighter to get enough votes from his party to pass Trump's 'Big Beautiful' budget bill after the president demanded it be ready for his signature by July 4.",
          pubDate: "2025-08-01 08:30:32",
          pubDateTZ: "UTC",
          image_url:
            "https://thedailybeast-thedailybeast-prod.web.arc-cdn.net/resizer/v2/UNLLCIACEFE2ZCVBNPABVC37LE.jpg?auth=a012a4c3b9290744b787e8bafc99b34e27a914388814f0c9a6cc75574b068c67&height=898&smart=true&width=1600",
          video_url: null,
          source_id: "thedailybeast",
          source_name: "The Daily Beast",
          source_priority: 1258,
          source_url: "https://www.thedailybeast.com",
          source_icon: "https://n.bytvi.com/thedailybeast.png",
          language: "english",
          country: ["united states of america"],
          category: ["top"],
          sentiment: "negative",
          sentiment_stats: {
            positive: 0.14,
            neutral: 0.11,
            negative: 99.75,
          },
          ai_tag: ["politics"],
          ai_region: null,
          ai_org: ["senate"],
          ai_summary:
            "President Donald Trump urged the Senate to avoid a recess so it could confirm his nominees, suggesting working through breaks instead. He emphasized the urgency after GOP Sen. John Thune canceled the August recess. Trump's message was delivered via Truth Social, where he also advised Republicans to oppose Sen. Susan Collins' votes as a voting strategy.",
          ai_content:
            "In a stern appeal directed towards fellow Republicans, President Donald Trump insisted that the U.S. Senate prioritize confirming presidential nominees rather than proceeding with their customary month-long summer recess. This demand came following remarks made earlier in the month regarding the postponement of the August recess set to commence on Monday, which had been announced by Republican Senate Majority Leader John Thune.\nTrump's insistence took place amidst discussions about approximately 1,300 nominations awaiting Senate approval for positions within the executive branch and various federal agencies; notably, over 160 such appointments were deemed ready for immediate consideration. By advocating for continuous sessioning throughout September—bypassing the planned hiatus from August 4th to September 1st—the President underscored what he termed 'the lunacy of the left,' framing the confirmation process as critical national service.\nThe President's fervor extended beyond public statements into social media, specifically Truth Social, where he penned a passionate call-to-action urging senators not only to eschew vacation time but to actively engage in legislative duties. In parallel, Trump offered strategic advice aimed at bolstering Republican electoral prospects during upcoming midterm elections—a period traditionally utilized by lawmakers to campaign back home.\nAmid these developments, Trump singled out Senator Susan Collins of Maine, whose recent voting record included opposition to two significant pieces of legislation proposed by the White House. His pointed commentary served dual purposes: reinforcing his stance on nominee confirmations while simultaneously attempting to influence voter sentiment among his political base.",
          duplicate: false,
        },
        {
          article_id: "51759f2710ddc6256b70f931e386880f",
          title:
            "9 ਸਤੰਬਰ ਨੂੰ ਹੋਵੇਗੀ ਉਪ ਰਾਸ਼ਟਰਪਤੀ ਦੀ ਚੋਣ | Vice President | Election #shorts |N18S",
          link: "https://punjab.news18.com/short-videos/trending/vice-president-election-to-be-held-on-september-9-vice-president-election-shorts-n18s-843937.html",
          keywords: ["videos"],
          creator: ["ਨਪਿੰਦਰ ਬਰਾੜ"],
          description:
            "9 ਸਤੰਬਰ ਨੂੰ ਹੋਵੇਗੀ ਉਪ ਰਾਸ਼ਟਰਪਤੀ ਦੀ ਚੋਣ | Vice Presidential | Election |N18S Find Latest News, Top Headlines And breaking news only on News18 Punjab Youtube Channel.For All Live Coverage, Exclusive And Latest News Update, Watch The LIVE TV Of News18 Punjab, Catch The Latest News LIVENews18 Mobile App: https://onelink.to/desc-youtubeNews 18 Punjab is an exclusive news channel on YouTube which streams news related to Punjab, Nation and the World. Along with the news, the channel also has debates on contemporary topics and shows on special series which are interesting and informative.News18 ਪੰਜਾਬ एक क्षेत्रीय न्यूज़ चैनल है जिसपर ਪੰਜਾਬ, हरियाणा, हिमाचल, देश एवं विदेश की खबरें प्रकाशित की जाती हैं | समाचारों क साथ-साथ इस चैनल पर समकालीन विषयों पर वाद-विवाद एवं विशेष सीरीज भी प्रकाशित होती हैं जो की काफी रोचक एवं सूचनापूर्ण हैं | n18oc_ShortsSubscribe to our channel: http://bit.ly/1IMIp73 For Latest news and updates, log on to: https://bit.ly/2Cx91OkFor Latest news and updates, log on to: https://onelink.to/desc-youtubeFollow Us on Twitter:https://twitter.com/News18Punjab Like Us on Facebook:https://www.facebook.com/News18Punjab",
          content: null,
          pubDate: "2025-08-01 08:30:26",
          pubDateTZ: "UTC",
          image_url:
            "https://images.news18.com/punjabi/uploads/2025/08/1754037912_4eb42a4a-bc18-40d2-a97a-0d63fc86539a-3x2.jpeg",
          video_url: null,
          source_id: "punjab_news18",
          source_name: "News18 Punjabi News",
          source_priority: 3892,
          source_url: "https://punjab.news18.com",
          source_icon: "https://n.bytvi.com/punjab_news18.jpg",
          language: "punjabi",
          country: ["india"],
          category: ["top"],
          sentiment: "neutral",
          sentiment_stats: {
            positive: 0.12,
            neutral: 99.73,
            negative: 0.15,
          },
          ai_tag: ["awards and recognitions"],
          ai_region: null,
          ai_org: null,
          ai_summary: null,
          ai_content: null,
          duplicate: false,
        },
      ],
      loading: false,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    
    // Use the API key from config file
    const apiKey = config.NEWS_API_KEY;
    
    console.log("API Key loaded from config:", apiKey ? "Success" : "Failed");
    
    if (!apiKey) {
      console.error("API key not found in config file.");
      this.setState({ loading: false });
      return;
    }
    
    let url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en&q=technology OR 'computer science' OR 'artificial intelligence' OR 'robotics' OR cybersecurity&category=technology`;
    
    try {
      let data = await fetch(url);
      let parsedata = await data.json();
      console.log(parsedata);
      if (parsedata && parsedata.results && Array.isArray(parsedata.results)) {
        this.setState({
          articles: parsedata.results,
          loading: false,
          totalResults: parsedata.totalResults
        });
      } else {
        console.error("invalid data");
        this.setState({
          loading: false,
        });
      }
    } catch (error) {
      console.error("fetch error", error);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 8s ease-in-out infinite reverse",
            zIndex: 0,
          }}
        />

        {/* Header section */}
        <div
          style={{
            textAlign: "center",
            paddingTop: "3rem",
            paddingBottom: "2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              // WebkitTextFillColor: "transparent",
              fontSize: "2.5rem",
              fontWeight: "800",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
              color: "whitesmoke",
            }}
          >
            <TypeAnimation
              sequence={[
                "Tech Times - Your Daily Bite of Tech & Trends",
                3000,
                "",
              ]}
              speed={10}
              repeat={Infinity}
            />
          </div>

          {/* Subtitle */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "1.1rem",
              fontWeight: "400",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
              letterSpacing: "0.025em",
            }}
          >
            Stay ahead with the latest in technology, innovation, and digital
            transformation
          </p>

          {/* Decorative line */}
          <div
            style={{
              width: "100px",
              height: "3px",
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              margin: "2rem auto",
              borderRadius: "2px",
              boxShadow: "0 2px 10px rgba(102, 126, 234, 0.3)",
            }}
          />
        </div>

        {/* Loading spinner */}
        {this.state.loading && (
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            minHeight: "400px",
            position: "relative",
            zIndex: 1
          }}>
            <Spinner />
          </div>
        )}

        {/* Articles grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            padding: "2rem 3rem",
            maxWidth: "1400px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {this.state.articles.map((element, index) => {
            return (
              <div
                key={element.article_id}
                style={{
                  animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {console.log(element)}
                <Card
                  title={element.title}
                  description={element.description}
                  image_url={element.image_url}
                  link={element.link}
                  date={element.pubDate}
                  category={element.category ? element.category[0] : null}
                />
              </div>
            );
          })}
        </div>

        {/* Footer section */}
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem 2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            marginTop: "4rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "0.9rem",
              fontWeight: "400",
            }}
          >
            © 2025 Tech Times. Powered by cutting-edge news aggregation
            technology.
          </p>
        </div>

        {/* CSS animations */}
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            
            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
      </div>
    );
  }
}