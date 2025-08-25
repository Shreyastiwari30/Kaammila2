import React, { useMemo } from 'react';
import { checkheading, replaceheading } from '../utils/helper';

const Answers = ({ ans }) => {
  const { isHeading, processed } = useMemo(() => {
    if (typeof ans !== "string") return { isHeading: false, processed: "" };

    if (checkheading(ans)) {
      return { isHeading: true, processed: replaceheading(ans) };
    }
    return { isHeading: false, processed: ans };
  }, [ans]);

  if (typeof ans === "string" && ans.startsWith("•")) {
    return (
      <li className=" ml-6 list-disc text-base leading-relaxed text-black">
        {ans.slice(1).trim()}
      </li>
    );
  }

  if (isHeading || (typeof ans === "string" && ans.endsWith(":"))) {
    return (
      <h3 className="pt-4 font-bold text-lg text-white">
        {processed}
      </h3>
    );
  }

  return (
    <p className="pl-5 text-base text-white leading-relaxed">
      {processed}
    </p>
  );
};

export default Answers;
