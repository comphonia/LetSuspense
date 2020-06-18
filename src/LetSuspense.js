import React, { Fragment, useEffect, useState } from "react";

export default function LetSuspense({
  condition,
  placeholder: Placeholder,
  multiplier,
  initialDelay,
  checkOnce,
  children,
}) {
  const [component, setComponent] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (checkOnce && isChecked) {
      setComponent([children]);
      return;
    }

    let delay = initialDelay || 0;
    let delayedTimeout = null;
    if (condition) {
      if (initialDelay) {
        delayedTimeout = setTimeout(() => {
          setComponent([children]);
        }, delay);
      } else {
        setComponent([children]);
      }
      setIsChecked(true);
    } else {
      let tempComponent = [];
      let mx = multiplier || 1
      for (let i = 0; i < mx; i++) {
        tempComponent.push(<Placeholder key={i} />);
      }
      setComponent(tempComponent);
    }
    return () => {
      if (delayedTimeout) {
        clearTimeout(delayedTimeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, children]);
  return (
    <Fragment>
      {component.map((component, index) => (
        <Fragment key={index}>{component} </Fragment>
      ))}
    </Fragment>
  );
}
