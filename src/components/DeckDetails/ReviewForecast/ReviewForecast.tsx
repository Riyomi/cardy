import Chart from 'react-apexcharts';
import { deck } from 'types/Deck';
import { getSeenCards } from 'utils/utils';

interface Props {
  deck: deck;
}

type dictionary = {
  [key: string]: number;
};

type xAxisType = 'category' | 'datetime' | 'numeric' | undefined;

const type: xAxisType = 'datetime';

const ReviewForecast = ({ deck }: Props) => {
  const options = {
    title: {
      text: 'Review forecast',
      style: {
        fontSize: '16px',
        fontFamily: 'Open Sans',
        color: '#263238',
      },
    },
    fill: {
      colors: ['#25ac64'],
    },
    xaxis: {
      type,
      labels: {
        datetimeUTC: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => val.toFixed(0),
      },
    },
  };

  const getData = () => {
    const today = new Date(Number(Date.now())).setHours(0, 0, 0, 0);
    const count: dictionary = {};
    const data = [];
    const DAY = 1000 * 60 * 60 * 24;

    for (const date of deck.cards) {
      if (!date.nextReview) continue;

      const converted = new Date(Number(date.nextReview)).setHours(0, 0, 0, 0);

      if (converted - today < 0) {
        if (count[today]) {
          count[today]++;
        } else count[today] = 1;
      } else if (count[converted]) {
        count[converted]++;
      } else {
        count[converted] = 1;
      }
    }

    for (let i = 0; i < 30; i++) {
      data.push([today + i * DAY, count[today + i * DAY] || 0]);
    }

    return data;
  };

  const series = [
    {
      name: 'Cards to review',
      data: getData(),
    },
  ];

  return (
    <div className="chart">
      {getSeenCards(deck.cards) ? (
        <Chart
          options={options}
          series={series}
          type="bar"
          width="100%"
          height={200}
        />
      ) : (
        <div>
          <h3>Review forecast</h3>
          <p>You haven't started learning this deck yet</p>
        </div>
      )}
    </div>
  );
};

export default ReviewForecast;
