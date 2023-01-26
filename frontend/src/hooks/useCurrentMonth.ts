import { useCallback } from "react";
import { DatesSetArg } from "@fullcalendar/core";

export const useCurrentMonth = () => {
  const getCurrentMonth = useCallback((arg: DatesSetArg) => {
    if (
      (arg.start.toString().match("Mar") && arg.end.toString().match("May")) ||
      (arg.start.toString().match("Apr") && arg.end.toString().match("Apr")) ||
      (arg.start.toString().match("Apr") && arg.end.toString().match("May"))
    )
      return "4";

    if (
      (arg.start.toString().match("Apr") && arg.end.toString().match("Jun")) ||
      (arg.start.toString().match("May") && arg.end.toString().match("May")) ||
      (arg.start.toString().match("May") && arg.end.toString().match("Jun"))
    )
      return "5";

    if (
      (arg.start.toString().match("May") && arg.end.toString().match("Jul")) ||
      (arg.start.toString().match("Jun") && arg.end.toString().match("Jun")) ||
      (arg.start.toString().match("Jun") && arg.end.toString().match("Jul"))
    )
      return "6";

    if (
      (arg.start.toString().match("Jun") && arg.end.toString().match("Aug")) ||
      (arg.start.toString().match("Jul") && arg.end.toString().match("Jul")) ||
      (arg.start.toString().match("Jul") && arg.end.toString().match("Aug"))
    )
      return "7";

    if (
      (arg.start.toString().match("Jul") && arg.end.toString().match("Sep")) ||
      (arg.start.toString().match("Aug") && arg.end.toString().match("Aug")) ||
      (arg.start.toString().match("Aug") && arg.end.toString().match("Sep"))
    )
      return "8";

    if (
      (arg.start.toString().match("Aug") && arg.end.toString().match("Oct")) ||
      (arg.start.toString().match("Sep") && arg.end.toString().match("Sep")) ||
      (arg.start.toString().match("Sep") && arg.end.toString().match("Oct"))
    )
      return "9";

    if (
      (arg.start.toString().match("Sep") && arg.end.toString().match("Nov")) ||
      (arg.start.toString().match("Oct") && arg.end.toString().match("Oct")) ||
      (arg.start.toString().match("Oct") && arg.end.toString().match("Nov"))
    )
      return "10";

    if (
      (arg.start.toString().match("Oct") && arg.end.toString().match("Dec")) ||
      (arg.start.toString().match("Nov") && arg.end.toString().match("Nov")) ||
      (arg.start.toString().match("Nov") && arg.end.toString().match("Dec"))
    )
      return "11";

    if (
      (arg.start.toString().match("Nov") && arg.end.toString().match("Jan")) ||
      (arg.start.toString().match("Dec") && arg.end.toString().match("Dec")) ||
      (arg.start.toString().match("Dec") && arg.end.toString().match("Jan"))
    )
      return "12";

    if (
      (arg.start.toString().match("Dec") && arg.end.toString().match("Feb")) ||
      (arg.start.toString().match("Jan") && arg.end.toString().match("Jan")) ||
      (arg.start.toString().match("Jan") && arg.end.toString().match("Feb"))
    )
      return "1";

    if (
      (arg.start.toString().match("Jan") && arg.end.toString().match("Mar")) ||
      (arg.start.toString().match("Feb") && arg.end.toString().match("Feb")) ||
      (arg.start.toString().match("Feb") && arg.end.toString().match("Mar"))
    )
      return "2";

    if (
      (arg.start.toString().match("Feb") && arg.end.toString().match("Apr")) ||
      (arg.start.toString().match("Mar") && arg.end.toString().match("Mar")) ||
      (arg.start.toString().match("Mar") && arg.end.toString().match("Apr"))
    )
      return "3";

    return "1";
  }, []);

  return { getCurrentMonth };
};
