// Testimonials from the "Skills for the 21st Century Lady" impact book: a
// three-day seminar run with Mentors International in Yola. Quotes are the
// participants' own words; photos are cropped and cleaned from the book.

export const SKILLS_FOR_LADIES_EVENT = {
  name: "Skills for the 21st Century Lady",
  partner: "Mentors International",
  highlights: [
    { value: "23", label: "Young women trained over three days" },
    { value: "91.5%", label: "Said the training inspired them" },
    { value: "9", label: "Of the 23 (about 40%) selected for a 6-month web training with Mentors International" },
  ],
  featuredQuote: {
    name: "Deborah",
    content:
      "With this newly discovered skill, I have not only been earning but have evolved into a financially smart and independent lady.",
  },
};

export type EventTestimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl: string;
};

const ROLE = `Participant, ${SKILLS_FOR_LADIES_EVENT.name}`;
const photo = (slug: string) => `/images/testimonials/${slug}.jpg`;

export const EVENT_TESTIMONIALS: EventTestimonial[] = [
  {
    id: "kadwama-deborah-lazarus",
    name: "Kadwama Deborah Lazarus",
    role: ROLE,
    imageUrl: photo("kadwama-deborah-lazarus"),
    content:
      "The training has been a wonderful experience. I learned so much about graphic design, blogging, video editing, photography, and web design in just three days. The training environment was amiable, comfortable, and convenient, and the instructors were friendly and patient with us. They accommodated all our amateurish questions and answered them all. I had the opportunity to meet beautiful ladies, and I made new friends.\n\nIt has made a very positive and remarkable impact on me. I now know which of the IT skills to specialize in and take it to the next level. Also, I'm now very conscious of my spending and have it in mind that the stars do not have to be aligned to pay myself, save for myself, invest wisely or seize up an opportunity. In a nutshell, I'm a money-smart lady now with efficient IT skills who can cause a remarkable change in my country's economy.\n\nGWDYF's mission is to impact the youth, which is about 60% of the country's population and change the economy's face and erase the bad reputation Nigeria has earned. Indeed, GWDYF is making waves and impacting youths in so many ways, and I am one of them. Because apart from the IT skills I've learned, I've also known how to be a money-smart lady.\n\nLastly, I'm so much grateful for the opportunity to learn and thrive. Thank you, GWDYF.",
  },
  {
    id: "shekinah-pardon",
    name: "Shekinah Pardon",
    role: ROLE,
    imageUrl: photo("shekinah-pardon"),
    content:
      "The seminar was courteous, impactful, educative, informative and entertaining. This has changed my mind set. GWDYF has an excellent vision and mission that if achieved would reduce the level of dependence of women/ladies leading to improved standard of living in the homes of this generation and generations to come.",
  },
  {
    id: "maxwell-sharom",
    name: "Maxwell Sharom",
    role: ROLE,
    imageUrl: photo("maxwell-sharom"),
    content:
      "It was fun; I met new people with the zeal to learn new skills like me. I've become more interested in technological courses treated during the event, and also the passion to work and earn from them later on has been stirred up in me. GWDYF Is doing a great job, they have been amazing all throughout helping ladies develop technological skills, and exposing them to such skills that have been tagged the \"men work\". Thank you so much for the opportunity, I'll be forever be grateful ❤",
  },
  {
    id: "onomiwu-damaris-chiemerie",
    name: "Onomiwu Damaris Chiemerie",
    role: ROLE,
    imageUrl: photo("onomiwu-damaris-chiemerie"),
    content:
      "The experience was awesome. The seminar on the skill of web and graphic design was well delivered. GWDYF is quite a good and creative organisation. They have been able to make it known to 21st century youth that a lot of money can be made by just sitting in your room, instead of wasting data on social media; you can make money from it.",
  },
  {
    id: "chiagoziem-ede",
    name: "Chiagoziem Ede",
    role: ROLE,
    imageUrl: photo("chiagoziem-ede"),
    content:
      "It was exceptional. Initially, I wondered how I could achieve these fantastic skills in 3 days. However, I was stunned eventually because I learned something in every session. It increased my hunger for excellence. I liked that it wasn't just focused on making money but also managing the money you made. GWD made me reaffirm that learning truly never ends... Every session was an eye-opener. GWDYF has this vision to enlighten and create the right attitude towards money among the youths in Nigeria to reduce the poverty gap. So far, I can say that they're walking in line with their vision because programs such as these are eye-openers to youths, especially females. I want to thank God who gave the founder of this initiative this idea. Also, I want to thank Mrs. Nnenna Mosugu and her beautiful team. God bless you all immensely.",
  },
  {
    id: "chinyere-chukwuma",
    name: "Chinyere Chukwuma",
    role: ROLE,
    imageUrl: photo("chinyere-chukwuma"),
    content:
      "It was a beautiful and life changing experience for me. I have learnt how to improve on myself and to put a stop to procrastination and start acting now. GWDYF shines a light at the end of the tunnel for all youth who are lost and trying to find their way and place in the world. Keep up the good work and continue soaring higher. Thank you",
  },
  {
    id: "olawoye-tosin",
    name: "Olawoye Tosin",
    role: ROLE,
    imageUrl: photo("olawoye-tosin"),
    content:
      "Far beyond the impact I was expecting; the program gave me a positive answer to the question that we don't have the right or wrong answer; either of the two is the answer. And I also learned that as females, we have the greatest asset to impact the world positively and that there is no work a lady can't do; it is based on your determination and focus. I was privileged to learn about photography, blogging, web design, graphic design, and video editing. GWDYF positively impacted me within just three days of the training. I strongly believe this organization is going places and will raise youth that will continue to cause a positive change in the world. I am privilege and blessed to make it known that I am a smart woman, and I am financially balanced when I use my skill and remain open and be in peace and harmony with my neighbors and colleagues.",
  },
  {
    id: "rita-sochima-okpaluba",
    name: "Rita Sochima Okpaluba",
    role: ROLE,
    imageUrl: photo("rita-sochima-okpaluba"),
    content:
      "I had a wonderful experience from meeting new people to the trainings, I never knew I would know what I know now in just three days. It has impacted positively on me, my mindset towards so many things have changed. Thank you GWDYF\n\nFrom what I've gathered GWDYF has a great vision for the youths and Nigeria at large and I know by the grace of God it'll be fulfilled. Thank you for being awesome.",
  },
  {
    id: "gideon-jemimah-balami",
    name: "Gideon Jemimah Balami",
    role: ROLE,
    imageUrl: photo("gideon-jemimah-balami"),
    content:
      "It was overwhelming. I really enjoyed myself and learned alot. Infact I wished it wouldn't end so soon. It made me be a better thinker, to be a money smart lady, be confident and bold wherever u find myself. It is a really good organization that should continue because it is very educating and inspiring. It will really encourage a lot of young ladies out there. Am just grateful and happy to be a participant and I bless God for the opportunity and thank the sponsors too. I feel like traditional meals, and learning new meals can help improve a lot of ladies.",
  },
  {
    id: "olufunke-olwoseni",
    name: "Olufunke Olwoseni",
    role: ROLE,
    imageUrl: photo("olufunke-olwoseni"),
    content:
      "The training has helped me change my thinking in terms of finance and peace and also helped me improve my skills. I see GWDYF is going places. I hope that you keep up with the good work and help in improving ladies lives especially in the northern part of Nigeria where females are majorly with low self- esteem and aren't really important in the society.",
  },
  {
    id: "yetunde-ibikunle",
    name: "Yetunde Ibikunle",
    role: ROLE,
    imageUrl: photo("yetunde-ibikunle"),
    content:
      "The training was awesome and impactful. My ideology changed, and I could face my fear: I could do graphic design. It was encouraging, that as a lady I can make money and manage it in short period of time and without stress. I could start business without capital. Yea, they have done well. But still they should not give up no matter what because they are rising nations knowingly or unknowingly. God bless.",
  },
  {
    id: "cecilia-cletus",
    name: "Cecilia Cletus",
    role: ROLE,
    imageUrl: photo("cecilia-cletus"),
    content:
      "It was an inspirational one to behold. It widens individuals' mind expressions and communication for future purposes by displaying acquired skills like a money-smart kind of lady.\n\nIt embraces me to my choice of dreams (photography, websites/designs, and blogging). It makes me want to explore more from within(mind and skills). It has taught me how to be financially literate by investing better. Wealth should not be a barrier to making more money and spending less. I learned more about graphical designs (Vincent Obi), blogging (Simon), Video editing, photography (Jennifer Iloku), and websites/designs (Sir Ayo). I am having my world of creativity and cause always to know when to act.\n\nGWDYF enlightens ladies on how to have the power of passive income by being creative. They impact ladies with skills for a positive demonstration and presentations to the society for better growth and development. With such excellent skill acquisition efforts and hospitalities without a penny, isn't it unfair to reciprocate the kind gestures and human kindness? It was indeed a perfect opportunity for me to participate in the skills for the 21st Century lady.\n\nThe organizers are just the best, and I would not advise any youth (ladies) to miss opportunities like this because anything worth doing is worth doing well.",
  },
  {
    id: "okote-chukwugbanwe-assumpta",
    name: "Okote Chukwugbanwe Assumpta",
    role: ROLE,
    imageUrl: photo("okote-chukwugbanwe-assumpta"),
    content:
      "It was a great experience. I learned a lot in just three days, and not just that, I also get to meet new people, made new friends, and had fun as well. It was indeed awesome!\n\nI am someone who derives pleasure in helping people, no matter how little. It drains me when I see a person in need and couldn't help due to one thing or the other. Before now, I have always had many ideas, things to do that will always help me take care of myself and others, but I keep having lots of challenges. At the end of the seminar, I got inspired more, and I am already working on one of my ideas, and I believe soon I can be among those making a difference out there.\n\nGWDYF, you're fantastic! I would say your vision and mission are great ones. It's more of what we need in our society today. You didn't just teach the youth how to make money alone but how to manage it, is the joy here. I see a lot of lives changing through you. Keep up the excellent job!",
  },
];
