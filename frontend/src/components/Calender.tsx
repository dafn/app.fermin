import { Fragment, h } from "preact";
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
      {currentQuarter.map((month, index) => {
        const weekendDays = weekendDaysOfMonth(month, 2020);

        return (
          <Fragment>
            <div>
              <p className={css["title"]}> {months[month]} </p>
              <div className={css["month"]}>
                {new Array(daysInMonth(2020, month))
                  .fill(0, 0, 32)
                  .map((_, i) => (
                    <div className={css["day"]}>
                      {month === currentMonth && i + 1 === currentDay && (
                        <span className={css["today-marker"]} />
                      )}
                      <p
                        className={cn({
                          [css["weekend"]]: weekendDays.includes(i + 1),
                        })}
                      >
                        {i + 1}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            {index < currentQuarter.length - 1 && (
              <span className={css["divider"]} />
            )}
          </Fragment>
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
      .day {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2rem;
        width: 3rem;
        box-sizing: border-box;
        .today-marker {
          position: absolute;
          border: 1px solid var(--fermin-surface-contrast);
          height: 1.6rem;
          width: 1.6rem;
          border-radius: 50%;
        }
        p {
          margin: 0;
          cursor: default;
          z-index: 1;
          &.weekend {
            color: var(--fermin-error-medium);
          }
        }
      }
    }
    .divider {
      height: 6rem;
      align-self: center;
      width: 1px;
      background: var(--fermin-surface-contrast);
      opacity: .5;
    }
  }
`;
