import Chart from 'react-apexcharts';
import { getSeenCards } from 'utils/utils';

const DistributionChart = ({ deck }) => {
  const options = {
    labels: ['Mastered', 'Studied', 'New'],
    colors: ['#167d47', '#25ac64', '#000'],
    title: {
      text: 'Card distribution graph',
      style: {
        fontSize: '16px',
        fontFamily: 'Open Sans',
        color: '#263238',
      },
    },
  };

  const getSeries = () => {
    const mastered = deck.mastered;
    const studied = getSeenCards(deck.cards) - mastered;
    const newCards = deck.cards.length - mastered - studied;
    return [mastered, studied, newCards];
  };

  return (
    <div id="card-distribution">
      <Chart
        options={options}
        series={getSeries()}
        type="pie"
        width="100%"
        height={200}
      />
    </div>
  );
};

export default DistributionChart;
