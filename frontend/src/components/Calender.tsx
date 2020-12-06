import { h } from "preact";
import { useMemo } from "preact/hooks";
import cn from "src/utils/cn";
import {
  months,
  daysInMonth,
  weekendDaysOfMonth,
  getCurrentQuarter,
} from "src/utils/date";
import Card from "./core/Card";

interface Props {
  className?: string;
}

const Calender = ({ className }: Props) => {
  const now = useMemo(() => new Date(), []);

  const currentDay = useMemo(() => now.getDate(), []);
  const currentMonth = useMemo(() => now.getMonth(), []);
  const currentQuarter = useMemo(() => getCurrentQuarter(now), []);

  return (
    <Card
      className={` ${css["calender"]} ${cn({
        [className]: !!className,
      })}`}
    >
      {currentQuarter.map((month) => {
        const weekendDays = weekendDaysOfMonth(month, 2020);

        return (
          <div>
            <p className={css["title"]}> {months[month]} </p>
            <div className={css["month"]}>
              {new Array(daysInMonth(2020, month))
                .fill(0, 0, 32)
                .map((_, i) => (
                  <div className={css["day"]}>
                    <p
                      className={cn({
                        [css["weekend"]]: weekendDays.includes(i + 1),
                        [css["today"]]:
                          month === currentMonth && i + 1 === currentDay,
                      })}
                    >
                      {i + 1}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default Calender;

css`
  .calender {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: min-content;
    padding: 1rem;
    .title {
      text-align: center;
      margin-top: 0;
    }
    .month {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(7, 1fr);
      border: 2px solid;
      .day {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2rem;
        width: 3rem;
        box-sizing: border-box;
        p {
          margin: 0;
          cursor: default;
          &.weekend {
            color: var(--fermin-error-medium);
          }
          &.today {
            background-color: white;
          }
        }
      }
    }
  }
`;
