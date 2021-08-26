import BenefitCard from '../BenefitCard/BenefitCard';

const Benefits = () => {
  return (
    <section>
      <h2>Learning new skills has never been this easy</h2>
      <div id="benefits">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Benefits;

const benefits = [
  {
    icon: 'science',
    title: 'Scientifically proven',
    description:
      'Spaced repetition has been proven to be an effective way of learning by many studies.',
  },
  {
    icon: 'schedule',
    title: 'Efficient',
    description:
      "You'll be able to focus on what you need to review the most. No more time wasted!",
  },
  {
    icon: 'people',
    title: 'Community driven',
    description:
      'You can create your own decks or you can use any of the premade decks by our community.',
  },
  {
    icon: 'dashboard_customize',
    title: 'Highly customizable',
    description:
      'You can add your own audio, pictures or notes to make learning even easier.',
  },
  {
    icon: 'desktop_windows',
    title: 'Minimalist design',
    description:
      "To ensure you're focused during learning sessions, you're shown the essential... and nothing else.",
  },
  {
    icon: 'cloud_download',
    title: 'Backup options',
    description:
      "Other sites make it hard to export your data. We don't do that here.",
  },
];
